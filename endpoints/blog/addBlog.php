<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$uploadDirectory = 'manager/uploads/blog/';
$fileName = '';
$time = time();
$errors = [];
$fileExtensionsAllowed = ['jpeg','jpeg','png','webp'];

if(!empty($_FILES['file']) && $_FILES['file']['size'] > 0){
    $fileName = $_FILES['file']['name'];
    $fileSize = $_FILES['file']['size'];
    $fileTmpName = $_FILES['file']['tmp_name'];
    $fileType = $_FILES['file']['type'];

    $img_components = explode('.',$fileName);
    $fileExtension = strtolower(array_pop($img_components));
    $uploadPath = $_SERVER['DOCUMENT_ROOT'].'/'.$uploadDirectory.$time.basename($fileName);

    if(!in_array($fileExtension,$fileExtensionsAllowed)){
        $errors[] = 'File extension not allowed. Upload a jpeg or png image';
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
            $result['message'] = 'Unable to Upload Image';
        }
    }
    else {
        $result['code'] = 400;
        $result['message'] = implode('\n',$errors);
    }
}
    if (empty($errors)) {
        $blog = new Blog();
        $blog->file = $fileName;
        $blog->title = $_POST['title'];
        $blog->summary = $_POST['summary'];
        $blog->content = $_POST['content'];
        $blog->author = $_POST['author'];
        $blog->blog_type = $_POST['blog_type'];
        if ($blog->save()){
            $result['code'] = 200;
            $result['message'] = 'Blog saved successfully';
            $result['data'] = $blog->to_array();
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Failed to save Blog';
            $result['data'] = array();
        }
    }


header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);