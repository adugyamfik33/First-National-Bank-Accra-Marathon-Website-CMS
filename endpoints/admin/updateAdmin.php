<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$id = $_GET['id'];
$uploadDirectory = 'manager/uploads/profile/';
$time = time();
$fileName = '';
$errors = [];
$fileExtensionsAllowed = ['jpeg','jpg','png','webp'];

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
            $result['code'] = 200;
            $result['message'] = 'File Uploaded successfully';
        }
        else{
            $result['code'] = 400;
            $result['message'] = implode('\n',$errors);
        }
    }
}
if(empty($errors)){
    $admin_exists = Admin::find_by_username($_POST['username']);
    if($admin_exists && $admin_exists->id != $id){
        $result['code'] = 400;
        $result['message'] = 'Username is taken';
    }
    else{
        $blog = Admin::find_by_id($id);
        if($_POST['email'] != ''){
            $blog->email = $_POST['email'];
        }
        if($_POST['username'] != ''){
            $blog->username = $_POST['username'];
        }
        if($_POST['fullname'] != ''){
            $blog->fullname = $_POST['fullname'];
        }
        if(!empty($_FILES['file']) && $_FILES['file']['size'] > 0){
            if(file_exists($_SERVER['DOCUMENT_ROOT'].'/'.$blog->profile)){
                unlink($_SERVER['DOCUMENT_ROOT'].'/'.$blog->profile);
            }
            $blog->profile = $fileName;
        }
        if($blog->save()){
            $result['code'] = 200;
            $result['message'] = 'Update Successful';
            $result['data'] = $blog->to_array();
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Failed to Update';
            $result['data'] = array();
        }
    }
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);