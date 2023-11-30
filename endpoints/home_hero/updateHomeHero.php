<?php

include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';
$id = $_POST['id'];

$home_hero = Home_Hero::find_by_id($id);

if ($home_hero) {
    if (!empty($_POST['background_color'])) {
        $home_hero->background_color = $_POST['background_color'];
    }
    if (!empty($_POST['slide1_text_right'])) {
        $home_hero->slide1_text_right = $_POST['slide1_text_right'];
    }
    if (!empty($_POST['slide1_text_left'])) {
        $home_hero->slide1_text_left = $_POST['slide1_text_left'];
    }
    if (!empty($_POST['slide2_text_right'])) {
        $home_hero->slide2_text_right = $_POST['slide2_text_right'];
    }
    if (!empty($_POST['slide2_text_left'])) {
        $home_hero->slide2_text_left = $_POST['slide2_text_left'];
    }
    if (!empty($_POST['slide3_text_right'])) {
        $home_hero->slide3_text_right = $_POST['slide3_text_right'];
    }
    if (!empty($_POST['slide3_text_left'])) {
        $home_hero->slide3_text_left = $_POST['slide3_text_left'];
    }

    $uploadDirectory = 'manager/uploads/home_hero/';
    $datetime = gmdate('M d,y h:i:s');
    $time = time();

    $uploadedFileNames = [];

    $fileExtensionsAllowed = ['jpeg', 'jpg', 'png', 'webp'];

    for ($i = 1; $i <= 3; $i++) {
        $inputFieldName = "slide{$i}_image";

        if (!empty($_FILES[$inputFieldName]) && $_FILES[$inputFieldName]['size'] > 0) {
            $fileName = $_FILES[$inputFieldName]['name'];
            $fileSize = $_FILES[$inputFieldName]['size'];
            $fileTmpName = $_FILES[$inputFieldName]['tmp_name'];
            $fileType = $_FILES[$inputFieldName]['type'];

            if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/' . $home_hero->{"slide{$i}_image"})) {
                unlink($_SERVER['DOCUMENT_ROOT'] . '/' . $home_hero->{"slide{$i}_image"});
            }
            
            $img_components = explode('.', $fileName);
            $fileExtension = strtolower(array_pop($img_components));
            $uploadPath = $_SERVER['DOCUMENT_ROOT'] . '/' . $uploadDirectory . $time . basename($fileName);

            if (!in_array($fileExtension, $fileExtensionsAllowed)) {
                $result['code'] = 400;
                $result['message'] = "File {$i}: This file extension is not allowed. Please upload a JPEG or PNG file";
                $result['data'] = [];
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode($result);
                exit; 
            }
            if ($fileSize > 4000000) {
                $result['code'] = 400;
                $result['message'] = "File {$i}: File exceeds maximum size (4MB)";
                $result['data'] = [];
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode($result);
                exit;
            }
            $uploadedFile = move_uploaded_file($fileTmpName, $uploadPath);
            if (!$uploadedFile) {
                $result['code'] = 400;
                $result['message'] = "File {$i}: Unable to upload image";
                $result['data'] = [];
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode($result);
                exit; 
            }

            $uploadedFileNames[] = $uploadDirectory . $time . basename($fileName);
        }
        else{
            $uploadedFileNames[] = '0';
        }
    }

    // Assign the uploaded file names to the respective fields

    if (count($uploadedFileNames) >= 3) {
        $img1 = $home_hero->slide1_image;
        $img2 = $home_hero->slide2_image;
        $img3 = $home_hero->slide3_image;
        $home_hero->slide1_image = ($uploadedFileNames[0] != '0')? $uploadedFileNames[0] : $img1;
        $home_hero->slide2_image = ($uploadedFileNames[1] != '0')? $uploadedFileNames[1] : $img2;
        $home_hero->slide3_image = ($uploadedFileNames[2] != '0')? $uploadedFileNames[2] : $img3;
    }

    // Save the updated Home_Hero record
    if ($home_hero->save()) {
        $result['code'] = 200;
        $result['message'] = 'Hero record updated successfully';
        $result['data'] = $home_hero->attributes();
    } else {
        $result['code'] = 400;
        $result['message'] = 'Failed to update Hero record';
        $result['data'] = [];
    }
} else {
    $result['code'] = 404;
    $result['message'] = 'Hero record not found';
    $result['data'] = [];
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);
?>
