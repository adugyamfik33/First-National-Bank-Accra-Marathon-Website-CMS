<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$gallery = Gallery::find('all');
$gallery = array_map(function($res){
    return $res->to_array();
},$gallery);

if(!empty($gallery)){
    $result['code'] = 200;
    $result['message'] = 'Images Found';
    $result['data'] = $gallery;
}
else {
    $result['code'] = 400;
    $result['message'] = 'Images not Found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);