<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$info = Info::find('all');

$info = array_map(function($res){
    return $res->to_array();
},$info);

if(!empty($info)){
    $result['code'] = 200;
    $result['message'] = 'Found';
    $result['data'] = $info;
}
else{
    $result['code'] = 400;
    $result['message'] = 'Failed to Find';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);