<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$route_hero = Route_Hero::find_by_id($id);
$uploadDirectory = 'manager/uploads/route_hero/';
$datetime = gmdate('M d,y h:i:s');
$time = time();

$errors = [];
$fileName = '';

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
        $errors[] = 'This file extension is not alllowed. Upload a JPEG or PNG file';
    }
    if($fileSize > 4000000){
        $errors[] = 'File exceeds Maximum Size (4MB)';
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
    else {
        $result['code'] = 400;
        $result['message'] = implode('\n',$errors);
    }
    if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/' . $route_hero->file)){
        unlink($_SERVER['DOCUMENT_ROOT'].'/'.$route_hero->file);
        $route_hero->file = $fileName;
    }
}
    if(empty($errors)){
        if($_POST['title'] != ''){
            $route_hero->title = $_POST['title'];
        }
        if($_POST['description'] != ''){
            $route_hero->description = $_POST['description'];
        }
        if($_POST['paragraph'] != ''){
            $route_hero->paragraph = $_POST['paragraph'];
        }


        
       
        if ($route_hero->save()){
            $result['code'] = 200;
            $result['message'] = 'Hero Updated Successfully';
        }
        else {
            $result['code'] = 400;
            $result['message'] = 'Unable to Update Hero';
        }

    }
    else{
        $result['code'] = 400;
        $result['message'] = implode('\n',$errors); 
    }


header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);