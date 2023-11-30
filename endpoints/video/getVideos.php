<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$video = Video::find('all');
$video = array_map(function($res){
    return $res->to_array();
},$video);

if(!empty($video)){
    $result['code'] = 200;
    $result['message'] = 'Videos Found Successfully';
    $result['data'] = $video;
}
else{
    $result['code'] = 400;
    $result['message'] = 'Videos not Found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);