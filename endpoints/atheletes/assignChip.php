<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_POST['id'];
$athelete = Athelete::find_by_id($id);
$last_added_race_dates = Race_Date::find_by_sql("SELECT * FROM race_date ORDER BY id DESC LIMIT 1");
$last_added_race_date = $last_added_race_dates[0];
//$last_added_race_date->id
if(!empty($athelete)){
    $athelete_exists = Athelete::find_by_chip_number_and_race_date_id($_POST['chip_number'],$last_added_race_date->id);
    if($athelete_exists){
        $result['code'] = 400;
        $result['message'] = 'Chip with this serial number has already been associated with an athelete';
    }
    else{
        $athelete->chip_number = $_POST['chip_number'];
    
        if($athelete->save()){
            $result['code'] = 200;
            $result['message'] = 'Chip assignment successful';
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Chip assignment failed';
        }
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'Athelete does not exist';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);