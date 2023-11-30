<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$blog = Blog::find('all');
$blog = arra_map(function($res){
    return $res->to_array();
},$blog);

if(!empty($blog)){
    $result['code'] = 200;
    $result['message'] = 'Blog Posts Found';
    $result['data'] = $blog;
}
else {
    $result['code'] = 400;
    $result['message'] = 'Blog Posts not Found';
    $results['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);