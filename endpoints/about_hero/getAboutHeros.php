<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$about_hero = About_Hero::find('all');

$about_hero = array_map(function($res){
    return $res->to_array();
},$about_hero);

if(!empty($about_hero)){
    $result['code'] = 200;
    $result['message'] = 'Hero found Successfully';
    $result['data'] = $about_hero;
}
else {
    $result['code'] = 400;
    $result['message'] = 'Hero not Found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);