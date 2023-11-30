<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$race_category = Race_Category::find_by_id($id);
if(!empty($race_category)){
    $race_category = $race_category->to_array();
    $result['code'] = 200;
    $result['message'] = 'Race Category found Successfully';
    $result['data'] = $race_category;
}
else{
    $result['code'] = 400;
    $result['message'] = 'Race Category not found';
    $result['data'] = array();
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);