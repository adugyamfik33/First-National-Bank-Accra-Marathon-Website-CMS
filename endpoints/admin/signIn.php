<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$username = $_POST['username'];
$password = $_POST['password'];

$admin_username_exists = Admin::find_by_username($username);

if($admin_username_exists){
    if($admin_username_exists->password == $password){
        if($admin_username_exists->access_granted == '1'){
            $result['code'] = 200;
            $result['message'] = 'Sign In Successful';
            $result['data'] = $admin_username_exists->to_array();
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Access Denied, you need to be granted access by the admin';
            $result['data'] = array();
        }
    }
    else{
        $result['code'] = 404;
        $result['message'] = 'incorrect password,try again!';
        $result['data'] = array();
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'User does not exist';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);