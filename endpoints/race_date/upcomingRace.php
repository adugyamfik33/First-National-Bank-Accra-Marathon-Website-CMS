<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$race_dates = Race_Date::find_by_sql("SELECT * FROM race_date ORDER BY id DESC LIMIT 1");

if (!empty($race_dates)) {
    $race_date = $race_dates[0]; // Access the first element of the array
    $result['code'] = 200;
    $result['message'] = 'Race found Successfully';
    $result['data'] = $race_date->to_array(array('include' => array('atheletes')));
} else {
    $result['code'] = 400;
    $result['message'] = 'Race not found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);
