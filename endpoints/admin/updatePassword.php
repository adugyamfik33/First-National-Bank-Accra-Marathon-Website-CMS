<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$password = $_POST['password'];
$confirm_password = $_POST['confirm-password'];
$id = $_POST['id'];
$admin = Admin::find_by_id($id);

if($admin){
    if($password != $confirm_password){
        $result['code'] = 404;
        $result['message'] = 'Make sure passwords match';
    }
    else{
        $admin->password = $password;
        $admin->default_password_set = 0;
        if($admin->save()){
            $result['code'] = 200;
            $result['message'] = 'Password Changed Successfully';
            $result['data'] = $admin->to_array();
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Failed to Update Password';
        }
    }

}
else{
    $result['code'] = 400;
    $result['message'] = 'This Admin does not exist';
}


header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);