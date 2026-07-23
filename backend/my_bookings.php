<?php
// my_bookings.php
require_once 'db_connect.php';

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// In a real application, you would verify the session/token and get the user_id from there
// For this tutorial version, we are expecting the user_id in the query string (e.g. ?user_id=1)
$user_id = $_GET['user_id'] ?? null;

// Basic validation
if (empty($user_id)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "user_id is required"]);
    exit;
}

try {
    // Fetch bookings for this user and JOIN with services to get the service name
    $stmt = $pdo->prepare("
        SELECT b.id AS booking_id, b.booking_date, b.duration_hours, b.total_price, b.status, 
            b.addons,
            s.name AS service_name 
        FROM bookings b
        JOIN services s ON b.service_id = s.id
        WHERE b.user_id = ?
        ORDER BY b.booking_date ASC
    ");
    $stmt->execute([$user_id]);
    $bookings = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "data" => $bookings
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to fetch bookings: " . $e->getMessage()]);
}
?>
