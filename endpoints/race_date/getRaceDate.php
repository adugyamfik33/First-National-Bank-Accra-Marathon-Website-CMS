<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$race_date = Race_Date::find_by_id($id);
if(!empty($race_date)){
    $race_date = $race_date->to_array(array('include'=>array('atheletes')));
    $result['code'] = 200;
    $result['message'] = 'Race found Successfully';
    $result['data'] = $race_date;
}
else{
    $result['code'] = 400;
    $result['message'] = 'Race not found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);