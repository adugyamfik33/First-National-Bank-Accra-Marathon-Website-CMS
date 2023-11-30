<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];

$video = Video::find_by_id($id);

if(!empty($video)){
    $video = $video->to_array();
    $result['code'] = 200;
    $result['message'] = 'Found Successfully';
    $result['data'] = $video;
}
else{
    $result['code'] = 400;
    $result['message'] = 'Video Not found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);