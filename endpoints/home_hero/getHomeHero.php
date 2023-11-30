<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$home_hero = Home_Hero::find_by_id($id);

if(!empty($home_hero)){
    $home_hero = $home_hero->to_array();
    $result['code'] = 200;
    $result['message'] = 'Hero found Successfully';
    $result['data'] = $home_hero;
}
else {
    $result['code'] = 400;
    $result['message'] = 'Hero not Found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);