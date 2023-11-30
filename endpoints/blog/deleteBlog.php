<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$blog = Blog::find_by_id($id);

if(file_exists($_SERVER['DOCUMENT_ROOT'].'/'$blog->file)){
    unlink($_SERVER['DOCUMENT_ROOT'].'/'$blog->file);
}

if(!empty($blog)){
    if($blog->delete()){
        $result['code'] = 200;
        $result['message'] = 'Deleted Successfully';
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Unable to delete';
    }
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);