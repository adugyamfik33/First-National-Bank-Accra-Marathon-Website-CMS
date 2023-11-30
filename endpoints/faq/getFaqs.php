<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$faq = Faq::find('all');

$faq = array_map(function($res){
    return $res->to_array();
},$faq);

if(!empty($faq)){
    $result['code'] = 200;
    $result['message'] = 'Found';
    $result['data'] = $faq;
}
else{
    $result['code'] = 400;
    $result['message'] = 'Failed to Find';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);