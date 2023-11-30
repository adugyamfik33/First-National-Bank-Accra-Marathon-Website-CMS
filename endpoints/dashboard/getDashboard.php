<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$last_added_race_dates = Race_Date::find_by_sql("SELECT * FROM race_date ORDER BY id DESC LIMIT 1");
$last_added_race_date = $last_added_race_dates[0];

$atheletes = Athelete::find_all_by_race_date_id($last_added_race_date->id);
$atheletes = array_map(function($res){
    return $res->to_array(array('include' => array('race_category')));
},$atheletes);

if($atheletes){
    $result['code'] = 200;
    $result['message'] = 'Dashboard Found successfully';
    $result['data'] = $atheletes;
}
else{
    $result['code'] = 400;
    $result['message'] = 'Dashboard not found';
    $result['data'] = array();
}
header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);