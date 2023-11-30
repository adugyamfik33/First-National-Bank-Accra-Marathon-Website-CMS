<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];

$sponsor = Sponsors::find_by_id($id);

if(!empty($sponsor)){
    $sponsor = $sponsor->to_array();
    $result['code'] = 200;
    $result['message'] = 'Sponsor found';
    $result['data'] = $sponsor;
}
else {
    $result['code'] = 400;
    $result['message'] = 'Sponsor not found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);