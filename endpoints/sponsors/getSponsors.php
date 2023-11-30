<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$sponsor = Sponsors::find('all');
$sponsor = array_map(function($res){
    return $res->to_array();
},$sponsor);

if(!empty($sponsor)){
    $result['code'] = 200;
    $result['message'] = 'Sponsors Found';
    $result['data'] = $sponsor;
}
else {
    $result['code'] = 400;
    $result['message'] = 'No Sponsors Found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);