<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$blog = Admin::find('all');
$blog = array_map(function($res){
    return $res->to_array();
},$blog);

if(!empty($blog)){
    $result['code'] = 200;
    $result['message'] = 'Admins Found';
    $result['data'] = $blog;
}
else {
    $result['code'] = 400;
    $result['message'] = 'Admins not Found';
    $results['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);