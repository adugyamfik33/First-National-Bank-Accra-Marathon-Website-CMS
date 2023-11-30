<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];

$video = Video::find_by_id($id);

if(!empty($video)){
    if($_POST['video_url'] != ''){
        $video->video_url = $_POST['video_url'];
    }
    if($_POST['title'] != ''){
        $video->title = $_POST['title'];
    }
    if($_POST['subtitle'] != ''){
        $video->subtitle = $_POST['subtitle'];
    }
    if($video->save()){
        $result['code'] = 200;
        $result['message'] = 'Video Updated Successfully';
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Failed to Update video';
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'Video not Found';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);