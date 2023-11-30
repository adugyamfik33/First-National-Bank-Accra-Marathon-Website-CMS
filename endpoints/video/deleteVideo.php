<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];

$video = Video::find_by_id($id);

if(!empty($video)){
    if($video->delete()){
        $result['code'] = 200;
        $result['message'] = 'Deleted Successfully';
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Failed to save';
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'Video not Found';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);