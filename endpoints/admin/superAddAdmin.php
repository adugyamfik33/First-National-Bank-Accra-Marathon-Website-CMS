<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$uploadDirectory = 'manager/uploads/profile/';
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
        $user = Admin::find_by_username($_POST['username']);
        if(!empty($user)){
            $result['code'] = 400;
            $result['message'] = 'Username is taken, use a different username';
        }
        else{
            $blog = new Admin();
            $blog->email = $_POST['email'];
            $blog->username = $_POST['username'];
            $blog->password = '12345';
            $blog->fullname = $_POST['fullname'];
            $blog->access_granted = 1;
            $blog->default_password_set = 1;
            if(empty($_FILES['file']) || $_FILES['file']['size'] <= 0){
                $blog->profile = 'manager/assets/img/avatars/default-profile.png';
            }
            else{
                $blog->profile = $fileName;
            }
            if ($blog->save()){
                $result['code'] = 200;
                $result['message'] = 'Admin added successfully';
                $result['data'] = $blog->to_array();
            }
            else{
                $result['code'] = 400;
                $result['message'] = 'Failed to add Admin';
                $result['data'] = array();
            }
        }

    }


header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);