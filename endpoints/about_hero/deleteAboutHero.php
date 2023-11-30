<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$about_hero = About_Hero::find_by_id($id);

if(file_exists($_SERVER['DOCUMENT_ROOT'].'/'.$about_hero->file)){
    unlink($_SERVER['DOCUMENT_ROOT'].'/'.$about_hero->file);
}
if(!empty($about_hero)){
    if ($about_hero->delete()) {
        $result['code'] = 200;
        $result['message'] = 'Deleted Successfully';
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Failed to delete';
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'Hero not found';
}


header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);