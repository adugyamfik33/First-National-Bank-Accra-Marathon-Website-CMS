<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_POST['id'];
$faq = Faq::find_by_id($id);

if(!empty($faq)){
    $faq->question = $_POST['question'];
    $faq->answer = $_POST['answer'];

    if($faq->save()){
        $result['code'] = 200;
        $result['message'] = 'Updated Successfully';
        $result['data'] = $faq->to_array();
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Update Failed';
        $result['data'] = array();
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'Faq not Found';
    $result['data'] = array();
}






header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);