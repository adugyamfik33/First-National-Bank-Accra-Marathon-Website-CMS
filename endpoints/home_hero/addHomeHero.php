<?php
header('Access-Control-Allow-Origin:*');
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$uploadDirectory = 'manager/uploads/home_hero/';
$datetime = gmdate('M d,y h:i:s');
$time = time();
$errors = [];
$fileExtensionsAllowed = ['jpeg', 'jpg', 'png', 'webp'];

// Define an array to hold the uploaded file names
$uploadedFileNames = [];

for ($i = 1; $i <= 3; $i++) {
    $inputFieldName = "slide{$i}_image";

    if (!empty($_FILES[$inputFieldName]) && $_FILES[$inputFieldName]['size'] > 0) {
        $fileName = $_FILES[$inputFieldName]['name'];
        $fileSize = $_FILES[$inputFieldName]['size'];
        $fileTmpName = $_FILES[$inputFieldName]['tmp_name'];
        $fileType = $_FILES[$inputFieldName]['type'];

        $img_components = explode('.', $fileName);
        $fileExtension = strtolower(array_pop($img_components));
        $uploadPath = $_SERVER['DOCUMENT_ROOT'] . '/' . $uploadDirectory . $time . basename($fileName);

        if (!in_array($fileExtension, $fileExtensionsAllowed)) {
            $errors[] = "File {$i}: This file extension is not allowed. Please upload a JPEG or PNG file";
        }
        if ($fileSize > 4000000) {
            $errors[] = "File {$i}: File exceeds maximum size (4MB)";
        }
        if (empty($errors)) {
            $uploadedFile = move_uploaded_file($fileTmpName, $uploadPath);
            if ($uploadedFile) {
                $uploadedFileNames[] = $uploadDirectory . $time . basename($fileName);
            } else {
                $errors[] = "File {$i}: Unable to upload image";
            }
        }
    }
}

if (empty($errors)) {
    $home_hero = new Home_Hero();
    $home_hero->background_color = $_POST['background_color'];
    $home_hero->slide1_text_right = $_POST['slide1_text_right'];
    $home_hero->slide1_text_left = $_POST['slide1_text_left'];
    $home_hero->slide2_text_right = $_POST['slide2_text_right'];
    $home_hero->slide2_text_left = $_POST['slide2_text_left'];
    $home_hero->slide3_text_right = $_POST['slide3_text_right'];
    $home_hero->slide3_text_left = $_POST['slide3_text_left'];

    // Assign the uploaded file names to the respective fields
    if (count($uploadedFileNames) >= 3) {
        $home_hero->slide1_image = $uploadedFileNames[0];
        $home_hero->slide2_image = $uploadedFileNames[1];
        $home_hero->slide3_image = $uploadedFileNames[2];
    }

    if ($home_hero->save()) {
        $result['code'] = 200;
        $result['message'] = 'Hero saved Successfully';
        $result['data'] = $home_hero->attributes();
    } else {
        $result['code'] = 400;
        $result['message'] = 'Hero failed to save';
        $result['data'] = [];
    }
} else {
    $result['code'] = 400;
    $result['message'] = implode('\n', $errors);
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);
?>
