<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];

$uploadDirectory ='manager/uploads/gallery/';
$time = time();
$errors = [];
$fileExtensionsAllowed = ['jpeg','jpg','png','webp'];
$fileName = '';

if(!empty($_FILES['file']) && $_FILES['file']['size'] > 0){
    $fileName = $_FILES['file']['name'];
    $fileSize = $_FILES['file']['size'];
    $fileTmpName = $_FILES['file']['tmp_name'];
    $fileType = $_FILES['file']['type'];

    $img_components = explode('.',$fileName);
    $fileExtension = strtolower(array_pop($img_components));
    $uploadPath = $_SERVER['DOCUMENT_ROOT'].'/'.$uploadDirectory.$time.basename($fileName);

    if(!in_array($fileExtension,$fileExtensionsAllowed)){
        $errors[] = 'File extension not allowed. Upload a JPEG or PNG file';
    }
    if($fileSize > 4000000){
        $errors[] = 'File exceeds maximum size(4MB)';
    }
    if(empty($errors)){
        $uploadedFile = move_uploaded_file($fileTmpName,$uploadPath);
        if($uploadedFile){
            $fileName = $uploadDirectory.$time.basename($fileName);
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Failed to Upload Image';
        }
    }
    else{
        $result['code'] = 400;
        $result['message'] = implode('\n',$errors);
    }
}
if(empty($errors)){
    $gallery = Gallery::find_by_id($id);
    if(!empty($_FILES['file']) && $_FILES['file']['size'] > 0){
        if(file_exists($_SERVER['DOCUMENT_ROOT'].'/'.$gallery->file)){
            unlink($_SERVER['DOCUMENT_ROOT'].'/'.$gallery->file);
        }
        $gallery->file = $fileName;
    }
    if($_POST['caption'] != ''){
        $gallery->caption = $_POST['caption'];
    }
    if($gallery->save()){
        $result['code'] = 200;
        $result['message'] = 'Image save successfully';
        $result['data'] = $gallery->to_array();
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Failed to save Image';
        $result['data'] = array();
    }
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);