<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$recently_added_race_date = Race_Date::find('all');
$recently_added_race_date = array_map(function($res){
    return $res->to_array();
},$recently_added_race_date);

$race_date = new Race_Date();
$datetimestring = $_POST['date'];
$datetime = new DateTime($datetimestring);
$date = $datetime->format('M d,Y h:i:s');
$race_date->date = $date;
$last_elem = array_pop($recently_added_race_date);
if($last_elem['done'] == 0){
    $result['code'] = 400;
    $result['message'] = 'Date has already been set, a New date can\'t be set until the upcoming race is completed';
    $result['data'] = $last_elem;
}
else{
    if ($race_date->save()){
        $result['code'] = 200;
        $result['message'] = 'Race Added Successfully';
        $result['data'] = $race_date->to_array();
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Failed to Add Race';
    }
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);