<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

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
    $sponsor = new Sponsors();
    $sponsor->href = $_POST['href'];
    $sponsor->tag = $_POST['tag'];
    $sponsor->date = $_POST['date'];
    $sponsor->file = $fileName;
    if($sponsor->save()){
        $result['code'] = 200;
        $result['message'] = 'Sponsor Added Successfully';
    }
    else {
        $result['code'] = 400;
        $result['message'] = 'Failed to add Sponsor';
    }
}
else {
    $result['code'] = 400;
    $result['message'] = implode('\n',$errors);
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);