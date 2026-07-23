<?php
// upload_payment.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

if (!isset($_FILES['screenshot']) || $_FILES['screenshot']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No file uploaded or upload error"]);
    exit;
}

$uploadDir = __DIR__ . '/uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$file = $_FILES['screenshot'];
$fileName = time() . '_' . basename($file['name']);
$targetPath = $uploadDir . $fileName;

// Basic validation: only allow images
$fileType = mime_content_type($file['tmp_name']);
if (strpos($fileType, 'image/') !== 0) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Only images are allowed"]);
    exit;
}

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "file_path" => 'backend/uploads/' . $fileName
    ]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to save file"]);
}
?>
