<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$video = new Video();

$video->video_url = $_POST['video_url'];
$video->title = $_POST['title'];
$video->subtitle = $_POST['subtitle'];

if($video->save()){
    $result['code'] = 200;
    $result['message'] = 'Saved Successfully';
}
else{
    $result['code'] = 400;
    $result['message'] = 'Failed to save';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);