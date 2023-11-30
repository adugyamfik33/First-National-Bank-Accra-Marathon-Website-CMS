<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$race_category = Race_Category::find('all');
$race_category = array_map(function($res){
    return $res->to_array(array('include'=>array('atheletes')));
},$race_category);

if(!empty($race_category)){
    $result['code'] = 200;
    $result['message'] = 'Found Successfully';
    $result['data'] = $race_category;
}
else{
    $result['code'] = 400;
    $result['message'] = 'No Race Categories Found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);