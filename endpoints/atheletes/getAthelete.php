<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$athelete = Athelete::find_by_id($id);

if(!empty($athelete)){
    $athelete = $athelete->to_array(array('include' => array('race','race_category')));
    $result['code'] = 200;
    $result['message'] = 'Athelete Found Successfully';
    $result['data'] = $athelete;
}
else{
    $result['code'] = 400;
    $result['message'] = 'Athelete not Found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);