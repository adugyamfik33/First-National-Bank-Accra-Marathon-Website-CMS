<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$athelete = Athelete::find('all');

$athelete = array_map(function($res){
    return $res->to_array(array('include' => array('race','race_category')));
},$athelete);

if(!empty($athelete)){
    $result['code'] = 200;
    $result['message'] = 'Found';
    $result['data'] = $athelete;
}
else{
    $result['code'] = 400;
    $result['message'] = 'Failed to Find';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);