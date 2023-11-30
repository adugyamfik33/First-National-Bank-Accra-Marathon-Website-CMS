<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$uploadDirectory = 'manager/uploads/sponsors/';
$time = time();
$fileName = '';
$errors = [];
$fileExtensionsAllowed = ['jpeg'.'jpg','png','webp'];

if(!empty($_FILES['file']) && $_FILES['file']['size'] > 0){
    $fileName = $_FILES['file']['name'];
    $fileSize = $_FILES['file']['size'];
    $fileTmpName = $_FILES['file']['tmp_name'];
    $fileType = $_FILES['file']['type'];

    $img_components = explode('.',$fileName);
    $fielExtension = strtolower(array_pop($img_components));
    $uploadPath =$_SERVER['DOCUMENT_ROOT'].'/'.$uploadDirectory.$time.basename($fileName);

    if(!in_array($fielExtension,$fileExtensionsAllowed)){
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
        else {
            $result['code'] = 400;
            $result['message'] = 'Failed to Upload Sponsor Logo Image';
        }
    }
    else{
        $result['code'] = 400;
        $result['message'] = implode('\n',$errors);
    }
}
if(empty($errors)){
    $sponsor = Sponsors::find_by_id($id);
    if($_POST['href'] != ''){
        $sponsor->href = $_POST['href'];
    }
    if($_POST['tag'] != ''){
        $sponsor->tag = $_POST['tag'];
    }
    // if($_POST['date'] != ''){
    //     $sponsor->date = $_POST['date'];
    // }
    if(!empty($_FILES['file']) && $_FILES['file']['size'] > 0){
        if(file_exists($_SERVER['DOCUMENT_ROOT'].'/'.$sponsor->file)){
            unlink($_SERVER['DOCUMENT_ROOT'].'/'.$sponsor->file);
        }
        $sponsor->file = $fileName;
    }

    if(!empty($sponsor)){
        if($sponsor->save()){
            $result['code'] = 200;
            $result['message'] = 'Sponsor Updated Successfully';
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Sponsor Failed to Update';
        }
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Sponsor was not found';
    }
}
else{
    $result['code'] = 400;
    $result['message'] = implode('\n',$errors);
}


header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);