<?php
include $_SERVER['DOCUMENT_ROOT'].'/manager/config/conn.php';

$uploadDirectory = 'manager/uploads/gallery/';
$time = time();
$errors = [];
$fileExtensionsAllowed = ['jpeg', 'jpg', 'png', 'webp'];

if (!empty($_FILES['images']['name'][0])) {
    $uploadedFiles = $_FILES['images'];
    
    $result = [];

    foreach ($uploadedFiles['name'] as $key => $fileName) {
        $fileSize = $uploadedFiles['size'][$key];
        $fileTmpName = $uploadedFiles['tmp_name'][$key];

        $img_components = explode('.', $fileName);
        $fileExtension = strtolower(array_pop($img_components));
        $uploadPath = $_SERVER['DOCUMENT_ROOT'] . '/' . $uploadDirectory . $time . basename($fileName);

        if (!in_array($fileExtension, $fileExtensionsAllowed)) {
            $errors[] = 'File extension not allowed for file: ' . $fileName;
        }
        if ($fileSize > 4000000) {
            $errors[] = 'File exceeds maximum size (4MB) for file: ' . $fileName;
        }
        if (empty($errors)) {
            $uploadedFile = move_uploaded_file($fileTmpName, $uploadPath);
            if ($uploadedFile) {
                $gallery = new gallery();
                $gallery->file = $uploadDirectory . $time . basename($fileName);
                $gallery->caption = empty($_POST['caption']) ? '' : $_POST['caption'];
                if ($gallery->save()) {
                    $result['code'] = 200;
                    $result['message'] = 'Image Saved Successfully: ' . $fileName;
                    $result['data'] = $gallery->to_array();
                } else {
                    $errors[] = 'Unable to Save Image: ' . $fileName;
                }
            } else {
                $errors[] = 'Failed to upload file: ' . $fileName;
            }
        }
    }
    
    if (empty($errors)) {
        $result['code'] = 200;
        $result['message'] = 'All Images Saved Successfully';
    } else {
        $result['code'] = 400;
        $result['message'] = implode('\n', $errors);
    }
} else {
    $result['code'] = 400;
    $result['message'] = 'No files were uploaded.';
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);
?>
