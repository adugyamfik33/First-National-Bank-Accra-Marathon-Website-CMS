<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$faq = new Faq();
$faq->question = $_POST['question'];
$faq->answer = $_POST['answer'];

if($faq->save()){
    $result['code'] = 200;
    $result['message'] = 'FAQ saved Successfully';
}
else{
    $result['code'] = 400;
    $result['message'] = 'Failed to save';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);