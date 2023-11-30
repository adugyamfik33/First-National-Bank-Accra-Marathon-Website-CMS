<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$race_date = Race_Date::find('all');
$race_date = array_map(function($res){
    return $res->to_array(array('include'=>array('atheletes')));
},$race_date);

if(!empty($race_date)){
    $result['code'] = 200;
    $result['message'] = 'Found Successfully';
    $result['data'] = $race_date;
}
else{
    $result['code'] = 400;
    $result['message'] = 'No Races Found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);