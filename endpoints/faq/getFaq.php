<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$faq = Faq::find_by_id($id);

if(!empty($faq)){
    $faq = $faq->to_array();
    $result['code'] = 200;
    $result['message'] = 'Faq Found Successfully';
    $result['data'] = $faq;
}
else{
    $result['code'] = 400;
    $result['message'] = 'Faq not Found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);