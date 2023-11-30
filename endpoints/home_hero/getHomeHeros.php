<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$home_hero = Home_Hero::find('all');

$home_hero = array_map(function($res){
    return $res->to_array();
},$home_hero);

if(!empty($home_hero)){
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