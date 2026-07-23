<?php
// get_availability.php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

$service_id = $_GET['service_id'] ?? null;
$date = $_GET['date'] ?? null; // Format: YYYY-MM-DD
$duration_hours = (int)($_GET['duration_hours'] ?? 1);

if (!$service_id || !$date) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "service_id and date are required"]);
    exit;
}

// Business hours: 10 AM to 7 PM
$startHour = 10;
$endHour = 19; // 7 PM

// The latest a booking can start is (EndHour - duration_hours)
$lastPossibleStartHour = $endHour - $duration_hours;

$available_slots = [];

// Prepare the overlap check statement
// Returns true if there is an overlap
$overlapStmt = $pdo->prepare("
    SELECT id FROM bookings 
    WHERE service_id = ? 
    AND status != 'cancelled'
    AND booking_date < DATE_ADD(?, INTERVAL ? HOUR)
    AND DATE_ADD(booking_date, INTERVAL duration_hours HOUR) > ?
");

for ($h = $startHour; $h <= $lastPossibleStartHour; $h++) {
    // Format the time as HH:00:00
    $timeString = sprintf("%02d:00:00", $h);
    $slotDateTime = $date . ' ' . $timeString;

    // Check for overlaps for this specific start time and duration
    $overlapStmt->execute([$service_id, $slotDateTime, $duration_hours, $slotDateTime]);
    
    if (!$overlapStmt->fetch()) {
        // No overlap found, this slot is available
        $available_slots[] = [
            "time" => $timeString,
            "display" => date("h:i A", strtotime($slotDateTime)) . " - " . date("h:i A", strtotime($slotDateTime) + ($duration_hours * 3600)),
            "datetime" => $slotDateTime
        ];
    }
}

echo json_encode([
    "status" => "success",
    "data" => $available_slots
]);
?>
