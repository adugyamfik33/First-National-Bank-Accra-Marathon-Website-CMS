<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$datetime = gmdate('y-m-d h:i:s');
$athelete = new Athelete();
$last_added_race_date = Race_Date::find_by_sql("SELECT * FROM race_date ORDER BY id DESC LIMIT 1");

$athelete->firstname = $_POST['firstname'];
$athelete->lastname = $_POST['lastname'];
$athelete->gender = $_POST['gender'];
$athelete->phone = $_POST['phone'];
$athelete->email = $_POST['email'];
$athelete->nationality = $_POST['nationality'];
$athelete->date_of_birth = $_POST['date_of_birth'];
$athelete->emergency_contact_name = $_POST['emergency_contact_name'];
$athelete->emergency_contact_number = $_POST['emergency_contact_number'];
$athelete->race_category_id = $_POST['race_category_id'];
$athelete->any_medical_condition = $_POST['any_medical_condition'];
if ($athelete->any_medical_condition == 'true') {
    $athelete->medical_info = $_POST['medical_info'];
}
$athelete->expected_finish_time = $_POST['expected_finish_time'];
$athelete->heard_about_race = $_POST['heard_about_race'];
$athelete->first_marathon = $_POST['first_marathon'];
$athelete->yearly_race_count = $_POST['yearly_race_count'];
$athelete->date = $datetime;
//$athelete->racers_id = $_POST['racers_id'];
$athelete->race_date_id = $last_added_race_date[0]->id;
if($athelete->save()){
    $result['code'] = 200;
    $result['message'] = 'You have been registered successfully 🥳';
    $result['data'] = $athelete->to_array();
}
else{
    $result['code'] = 400;
    $result['message'] = 'Unable to register, Try again ☹️';
    $result['data'] = array();
}

header('Content-Type: application/json;  charset = utf-8');
echo json_encode($result);