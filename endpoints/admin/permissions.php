<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$state = $_GET['status'];
$admin = Admin::find_by_id($id);
if(!empty($admin)){
    if ($state == '1') {
        $admin->super_admin = 1;
        if($admin->save()){
            $result['code'] = 200;
            $result['message'] = 'This Admin has successfully been granted Super Admin Priveledges';
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Failed to make this admin a superAdmin';
        }
    }
    else{
        $admin->super_admin = 0;
        if($admin->save()){
            $result['code'] = 200;
            $result['message'] = 'This Admin no longer has Super Admin Priveledges';
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Failed to remove Super Admin Priveledges';
        }
    }
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);