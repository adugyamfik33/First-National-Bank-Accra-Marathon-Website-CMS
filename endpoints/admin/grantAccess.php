<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$status = $_GET['status'];
$admin = Admin::find_by_id($id);
if(!empty($admin)){
    if($status == '1'){
        $admin->access_granted = 1;
        if($admin->save()){
            $result['code'] = 200;
            $result['message'] = 'Access Granted Successfully';
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Failed to grant Access';
        }
    }
    elseif ($status == '0') {
        $admin->access_granted = 0;
        if($admin->save()){
            $result['code'] = 200;
            $result['message'] = 'Access Denied Successfully';
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Failed to deny Access';
        }
    }
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);