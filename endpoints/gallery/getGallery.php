<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];

$gallery = Gallery::find_by_id($id);

if(!empty($gallery)){
    $gallery = $gallery->to_array();
    $result['code'] = 200;
    $result['message'] = 'Image found successfully';
    $result['data'] = $gallery;
}
else{
    $result['code'] = 400;
    $result['message'] = 'Image not Found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);