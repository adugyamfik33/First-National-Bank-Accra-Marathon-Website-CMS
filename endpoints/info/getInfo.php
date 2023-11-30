<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$info = Info::find_by_id($id);

if(!empty($info)){
    $info = $info->to_array();
    $result['code'] = 200;
    $result['message'] = 'Info Found Successfully';
    $result['data'] = $info;
}
else{
    $result['code'] = 400;
    $result['message'] = 'Info not Found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);