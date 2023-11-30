<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$race_date = Race_Date::find_by_id($id);

if(!empty($race_date)){
    $race_date->delete();
    $result['code'] = 200;
    $result['message'] = 'Deleted Successfully';
}
else{
    $result['code'] = 400;
    $result['message'] = 'Race not Found';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);