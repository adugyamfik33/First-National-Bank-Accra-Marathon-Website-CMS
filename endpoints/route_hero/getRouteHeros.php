<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$route_hero = Route_Hero::find('all');

$route_hero = array_map(function($res){
    return $res->to_array();
},$route_hero);

if(!empty($route_hero)){
    $result['code'] = 200;
    $result['message'] = 'Hero found Successfully';
    $result['data'] = $route_hero;
}
else {
    $result['code'] = 400;
    $result['message'] = 'Hero not Found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);