<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$info = new Info();
$info->email = $_POST['email'];
$info->phone = $_POST['phone'];
$info->facebook_url = $_POST['facebook_url'];
$info->instagram_url = $_POST['instagram_url'];
$info->twitter_url = $_POST['twitter_url'];
$info->youtube_url = $_POST['youtube_url'];

if($info->save()){
    $result['code'] = 200;
    $result['message'] = 'Info saved Successfully';
}
else{
    $result['code'] = 400;
    $result['message'] = 'Failed to save';
}

header('Content-Type: application/json; charset = utf-8');
echo json_encode($result);