<?php
// reset_password.php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
$token = $input['token'] ?? '';
$new_password = $input['password'] ?? '';

if (empty($token) || empty($new_password)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Token and new password are required"]);
    exit;
}

try {
    // 1. Verify token exists and is valid (e.g. within 24 hours)
    // For simplicity, we just check if it exists
    $stmt = $pdo->prepare("SELECT email FROM password_resets WHERE token = ?");
    $stmt->execute([$token]);
    $resetRequest = $stmt->fetch();

    if (!$resetRequest) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid or expired token"]);
        exit;
    }

    $email = $resetRequest['email'];

    // 2. Hash new password
    $passwordHash = password_hash($new_password, PASSWORD_BCRYPT);

    // 3. Update users table
    $updateStmt = $pdo->prepare("UPDATE users SET password_hash = ? WHERE email = ?");
    $updateStmt->execute([$passwordHash, $email]);

    // 4. Delete the used token
    $deleteStmt = $pdo->prepare("DELETE FROM password_resets WHERE email = ?");
    $deleteStmt->execute([$email]);

    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Password has been reset successfully"]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server error: " . $e->getMessage()]);
}
?>
