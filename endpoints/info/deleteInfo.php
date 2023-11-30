<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$info = Info::find_by_id($id);
if(!empty($info)){
    $info->delete();
    $result['code'] = 200;
    $result['message'] = 'Deleted Successfully';
}
else{
    $result['code'] = 400;
    $result['message'] = 'Failed to Delete';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);