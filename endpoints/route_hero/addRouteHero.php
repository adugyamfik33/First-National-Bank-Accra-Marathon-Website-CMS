<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$uploadDirectory = 'manager/uploads/route_hero/';
$datetime = gmdate('M d,y h:i:s');
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
        $errors[] = 'This file extension is not allowed. Please upload a JPEG or PNG file';
    }
    if($fileSize > 4000000){
        $errors[] = 'File exceeds maximum size (4MB)';
    }
    if(empty($errors)){
        $uploadedFile = move_uploaded_file($fileTmpName,$uploadPath);
        if($uploadedFile){
            $fileName = $uploadDirectory.$time.basename($fileName);
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Unable to upload Hero image';
        }
    }
    else{
        $result['code'] = 400;
        $result['message'] = implode('\n',$errors);
    }
}
    if(empty($errors)){
        $route_hero = new Route_Hero();
        $route_hero->title = $_POST['title'];
        $route_hero->description = $_POST['description'];
        $route_hero->paragraph = $_POST['paragraph'];
        $route_hero->file = $fileName;
        if($route_hero->save()){
            $result['code'] = 200;
            $result['message'] = 'Hero saved Successfully';
            $result['data'] = $route_hero->attributes();
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Hero failed to save';
            $result['data'] = array();
        }
    }



header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);