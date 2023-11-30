<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$blog = Blog::find_by_id($id);

if(!empty($blog)){
    $blog =$blog->to_array();
    $result['code'] = 200;
    $result['message'] = 'Blog Post found';
    $result['data'] = $blog;
}
else{
    $result['code'] = 200;
    $result['message'] = 'Blog Post not Found';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);