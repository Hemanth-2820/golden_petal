<?php
// admin_get_all_bookings.php
require_once 'db_connect.php';

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// In production, verify JWT or secure token here. We use user_id for simplicity.
$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Admin user_id is required"]);
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

    // 2. Fetch all bookings
    $stmt = $pdo->prepare("
        SELECT 
            b.id AS booking_id, 
            b.booking_date, 
            b.duration_hours, 
            b.total_price, 
            b.status, 
            b.created_at,
            s.name AS service_name, 
            u.name AS customer_name,
            u.email AS customer_email
        FROM bookings b
        JOIN services s ON b.service_id = s.id
        JOIN users u ON b.user_id = u.id
        ORDER BY b.booking_date DESC
    ");
    $stmt->execute();
    $bookings = $stmt->fetchAll();

    echo json_encode([
        "status" => "success",
        "data" => $bookings
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to fetch bookings: " . $e->getMessage()]);
}
?>
