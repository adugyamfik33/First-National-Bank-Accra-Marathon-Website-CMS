<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$race_category = new Race_Category();
$race_category_exists = Race_Category::find_by_name($_POST['name']);

if(!empty($race_category_exists)){
    $result['code'] = 400;
    $result['message'] = 'A category with the same name already exists.';
}
else{
    $race_category->name = $_POST['name'];
    $race_category->price = substr($_POST['price'],5);

    if($race_category->save()){
        $result['code'] = 200;
        $result['message'] = 'Race Category Added Successfully';
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Failed to save record';
    }
}


header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);