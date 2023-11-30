<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];

$sponsor = Sponsors::find_by_id($id);
if(file_exists($_SERVER['DOCUMENT_ROOT'].'/'.$sponsor->file)){
    unlink($_SERVER['DOCUMENT_ROOT'].'/'.$sponsor->file);
}
if(!empty($sponsor)){
    if($sponsor->delete()){
        $result['code'] = 200;
        $result['message'] = 'Sponsor Deleted Successfully';
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Sponsor Failed to delete';
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'Sponsor not found';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);