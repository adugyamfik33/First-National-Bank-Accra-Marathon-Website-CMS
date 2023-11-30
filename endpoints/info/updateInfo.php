<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_GET['id'];
$info = Info::find_by_id($id);

if(!empty($info)){
    $info->email = $_POST['email'];
    $info->phone = $_POST['phone'];
    $info->facebook_url = $_POST['facebook_url'];
    $info->instagram_url = $_POST['instagram_url'];
    $info->twitter_url = $_POST['twitter_url'];
    $info->youtube_url = $_POST['youtube_url'];
    $info->location = $_POST['location'];
    if($info->save()){
        $result['code'] = 200;
        $result['message'] = 'Updated Successfully';
        $result['data'] = $info->to_array();
    }
    else{
        $result['code'] = 400;
        $result['message'] = 'Update Failed';
        $result['data'] = array();
    }
}
else{
    $result['code'] = 400;
    $result['message'] = 'Info not Found';
    $result['data'] = array();
}






header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);