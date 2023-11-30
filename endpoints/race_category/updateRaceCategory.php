<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_POST['id'];
$race_category = Race_Category::find_by_id($id);

if(!empty($race_category)){
    if($_POST['name'] != ''){
        $race_category->name = $_POST['name'];
    }
    if($_POST['price'] != ''){
        $race_category->price = $_POST['price'];
    }
    if($race_category->save()){
        $result['code'] = 200;
        $result['message'] = 'Race Category Updated Successfully';
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Failed to update record';
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'Record not found';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);