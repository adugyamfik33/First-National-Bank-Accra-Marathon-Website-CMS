<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_POST['id'];
$race_date = Race_Date::find_by_id($id);
if(!empty($race_date)){
    $datetimestring = $_POST['date'];
    $datetime = new DateTime($datetimestring);
    $date = $datetime->format('M d,Y h:i:s');
    $race_date->date = $date;
    if($race_date->save()){
        $result['code'] = 200;
        $result['message'] = 'Updated Successfully';
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Failed to Update';
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'Race not faound';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);