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

// Business hours: 10 AM to 10 PM
$startHour = 10;
$endHour = 22; // 10 PM

// Fetch all bookings for this service on this date
$stmt = $pdo->prepare("
    SELECT booking_date, duration_hours 
    FROM bookings 
    WHERE service_id = ? 
    AND status != 'cancelled' 
    AND DATE(booking_date) = ?
");
$stmt->execute([$service_id, $date]);
$existing_bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

$available_slots = [];
$gap_minutes = 30;

// Check every 30 minutes
for ($h = $startHour; $h < $endHour; $h++) {
    foreach ([0, 30] as $m) {
        $slot_start_time = strtotime(sprintf("%s %02d:%02d:00", $date, $h, $m));
        $slot_end_time = $slot_start_time + ($duration_hours * 3600);

        // If the slot ends after business hours, don't allow it
        if ($slot_end_time > strtotime(sprintf("%s %02d:00:00", $date, $endHour))) {
            continue;
        }

        $conflict = false;
        foreach ($existing_bookings as $b) {
            $b_start = strtotime($b['booking_date']);
            $b_end = $b_start + ($b['duration_hours'] * 3600);
            
            // The event blocks time from its start to its end + 30 mins gap
            $b_blocked_start = $b_start;
            $b_blocked_end = $b_end + ($gap_minutes * 60);

            $slot_blocked_start = $slot_start_time;
            $slot_blocked_end = $slot_end_time + ($gap_minutes * 60);

            // Overlap condition: max(start1, start2) < min(end1, end2)
            if (max($slot_blocked_start, $b_blocked_start) < min($slot_blocked_end, $b_blocked_end)) {
                $conflict = true;
                break;
            }
        }

        if (!$conflict) {
            $timeString = sprintf("%02d:%02d:00", $h, $m);
            $available_slots[] = [
                "time" => $timeString,
                "display" => date("h:i A", $slot_start_time) . " - " . date("h:i A", $slot_end_time),
                "datetime" => date("Y-m-d H:i:s", $slot_start_time)
            ];
        }
    }
}

echo json_encode([
    "status" => "success",
    "data" => $available_slots
]);
?>
