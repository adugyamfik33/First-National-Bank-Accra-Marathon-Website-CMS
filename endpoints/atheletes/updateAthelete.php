<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_POST['id'];
$athelete = Athelete::find_by_id($id);
$last_added_race_dates = Race_Date::find_by_sql("SELECT * FROM race_date ORDER BY id DESC LIMIT 1");
$last_added_race_date = $last_added_race_dates[0];
//$last_added_race_date->id
if(!empty($athelete)){
    $athelete_exists = Athelete::find_by_racers_id_and_race_date_id($_POST['racers_id'],$last_added_race_date->id);
    if($athelete_exists){
        $result['code'] = 400;
        $result['message'] = 'Bib Number Has already been assigned to an athelete';
    }
    else{
        $athelete->racers_id = $_POST['racers_id'];
    
        if($athelete->save()){
            $result['code'] = 200;
            $result['message'] = 'Bib Number assigned successfully';
        }
        else{
            $result['code'] = 400;
            $result['message'] = 'Bib Number assignment failed';
        }
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'Athelete does not exist';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);