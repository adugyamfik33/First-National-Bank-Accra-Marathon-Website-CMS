<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$id = $_GET['id'];
$gallery = Gallery::find_by_id($id);

if(file_exists($_SERVER['DOCUMENT_ROOT'].'/'.$gallery->file)){
    unlink($_SERVER['DOCUMENT_ROOT'].'/'.$gallery->file);
}
if(!empty($gallery)){
    if($gallery->delete()){
        $result['code'] = 200;
        $result['message'] = 'Deleted Successfully';
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Failed to delete Image';
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'Image not Found';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);