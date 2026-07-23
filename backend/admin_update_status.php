<?php
// admin_update_status.php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$user_id = $input['user_id'] ?? null;
$booking_id = $input['booking_id'] ?? null;
$new_status = $input['status'] ?? null;

if (!$user_id || !$booking_id || !$new_status) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "user_id, booking_id, and status are required"]);
    exit;
}

$allowed_statuses = ['pending', 'confirmed', 'cancelled', 'completed']; // Added 'completed' for practical purposes
if (!in_array($new_status, $allowed_statuses)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid status value"]);
    exit;
}

try {
    // 1. Verify user is an admin
    $adminStmt = $pdo->prepare("SELECT role FROM users WHERE id = ?");
    $adminStmt->execute([$user_id]);
    $user = $adminStmt->fetch();

    if (!$user || $user['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(["status" => "error", "message" => "Unauthorized access. Admins only."]);
        exit;
    }

    // 2. Update status
    // If the schema doesn't officially support 'completed', it might throw an error if strict mode is on.
    // Assuming 'completed' isn't explicitly in the enum, we should fall back to 'cancelled' or 'confirmed' if needed,
    // but typically modifying the ENUM in DB is required. For safety, we only use 'pending', 'confirmed', 'cancelled'.
    $safe_statuses = ['pending', 'confirmed', 'cancelled'];
    if (!in_array($new_status, $safe_statuses)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Status must be pending, confirmed, or cancelled"]);
        exit;
    }

    $updateStmt = $pdo->prepare("UPDATE bookings SET status = ? WHERE id = ?");
    $updateStmt->execute([$new_status, $booking_id]);

    echo json_encode([
        "status" => "success",
        "message" => "Booking status updated to " . htmlspecialchars($new_status)
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to update status: " . $e->getMessage()]);
}
?>
