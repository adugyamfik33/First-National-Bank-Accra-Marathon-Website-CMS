<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$race_category = Race_Category::find_by_id($id);

if(!empty($race_category)){
    if($race_category->delete()){
        $result['code'] = 200;
        $result['message'] = 'Race Category Deleted Successfully';
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Failed to delete record';
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'Record not found';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);