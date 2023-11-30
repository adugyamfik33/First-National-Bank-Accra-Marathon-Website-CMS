<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$id = $_GET['id'];
$uploadDirectory = 'manager/uploads/blog/';
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
    $blog = Blog::find_by_id($id);
    if($_POST['title'] != ''){
        $blog->title = $_POST['title'];
    }
    if($_POST['summary'] != ''){
        $blog->summary = $_POST['summary'];
    }
    if($_POST['content'] != ''){
        $blog->content = $_POST['content'];
    }
    if($_POST['author'] != ''){
        $blog->author = $_POST['author'];
    }
    if($_POST['blog_type'] != ''){
        $blog->blog_type = $_POST['blog_type'];
    }
    if(!empty($_FILES['file'])){
        if(file_exists($_SERVER['DOCUMENT_ROOT'].'/'.$blog->file)){
            unlink($_SERVER['DOCUMENT_ROOT'].'/'.$blog->file);
        }
    }
    $blog->file = $fileName;
    if($blog->save()){
        $result['code'] = 200;
        $result['message'] = 'Updated Blog Post Successfully';
        $result['data'] = $blog->to_array();
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Failed to save';
        $result['data'] = array();
    }
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);