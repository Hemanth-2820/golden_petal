<?php
// create_booking.php
require_once 'db_connect.php';
require_once 'mailer.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// Get the raw POST data
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

// In a real application, you would verify the session/token here
// For this tutorial version, we are expecting the user_id in the payload
$user_id = $input['user_id'] ?? null;
$service_id = $input['service_id'] ?? null;
$booking_date = $input['booking_date'] ?? ''; // Expected format: 'YYYY-MM-DD HH:MM:SS'
$duration_hours = (int)($input['duration_hours'] ?? 1);

// Basic validation
if (empty($user_id) || empty($service_id) || empty($booking_date)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "user_id, service_id, and booking_date are required"]);
    exit;
}

// Check if the service exists and fetch price
$stmt = $pdo->prepare("SELECT id, price, name FROM services WHERE id = ?");
$stmt->execute([$service_id]);
$service = $stmt->fetch();
if (!$service) {
    http_response_code(404);
    echo json_encode(["status" => "error", "message" => "Service not found"]);
    exit;
}

$total_price = $service['price'] * $duration_hours;

// Check for overlapping bookings (if existing start < new end AND existing end > new start)
$overlapStmt = $pdo->prepare("
    SELECT id FROM bookings 
    WHERE service_id = ? 
    AND status != 'cancelled'
    AND booking_date < DATE_ADD(?, INTERVAL ? HOUR)
    AND DATE_ADD(booking_date, INTERVAL duration_hours HOUR) > ?
");
$overlapStmt->execute([$service_id, $booking_date, $duration_hours, $booking_date]);

if ($overlapStmt->fetch()) {
    http_response_code(409); // Conflict
    echo json_encode(["status" => "error", "message" => "One or more hours in this time slot are already booked."]);
    exit;
}

// Insert booking into database
try {
    $insertStmt = $pdo->prepare("INSERT INTO bookings (user_id, service_id, booking_date, duration_hours, total_price, status) VALUES (?, ?, ?, ?, ?, 'confirmed')");
    $insertStmt->execute([$user_id, $service_id, $booking_date, $duration_hours, $total_price]);
    
    $bookingId = $pdo->lastInsertId();
    
    // --- EMAIL INTEGRATION ---
    // Fetch User and Service details for the email
    $detailsStmt = $pdo->prepare("
        SELECT u.name AS user_name, u.email AS user_email, s.name AS service_name
        FROM users u 
        JOIN services s ON s.id = ? 
        WHERE u.id = ?
    ");
    $detailsStmt->execute([$service_id, $user_id]);
    $details = $detailsStmt->fetch();

    if ($details) {
        $customerEmail = $details['user_email'];
        $customerName = htmlspecialchars($details['user_name']);
        $serviceName = htmlspecialchars($details['service_name']);
        $prettyDate = date("F j, Y, g:i a", strtotime($booking_date));

        // 1. Email to Customer
        $customerSubject = "Booking Confirmed - Golden Petal";
        $customerHtml = "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #FFF; border: 4px solid #D4AF37; padding: 30px; text-align: center;'>
            <img src='https://golden-petal.in/logo.png' alt='Golden Petal Logo' style='max-width: 150px; margin-bottom: 20px;' />
            <h2 style='color: #D4AF37; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;'>Booking Confirmed!</h2>
            <div style='background-color: #FFF; color: #000; padding: 20px; margin-top: 20px; text-align: left; border: 2px solid #D4AF37;'>
                <p style='font-size: 16px;'>Hi <strong>$customerName</strong>,</p>
                <p style='font-size: 16px;'>Your booking for <strong>$serviceName</strong> has been confirmed.</p>
                <hr style='border: 1px solid #D4AF37; margin: 20px 0;' />
                <p><strong>Date & Time:</strong> $prettyDate</p>
                <p><strong>Duration:</strong> $duration_hours Hour(s)</p>
                <p><strong>Total Price:</strong> $" . number_format($total_price, 2) . "</p>
                <hr style='border: 1px solid #D4AF37; margin: 20px 0;' />
                <p style='font-size: 16px;'>We look forward to seeing you!</p>
            </div>
            <p style='color: #D4AF37; margin-top: 30px; font-weight: bold;'>Golden Petal - House of Celebration</p>
        </div>";
        sendEmail($customerEmail, $customerSubject, $customerHtml);

        // 2. Email to Admin
        // IMPORTANT: Change this to the Admin's real email address
        $adminEmail = "goldencelebration2026@gmail.com";
        $adminSubject = "NEW BOOKING: $serviceName";
        $adminHtml = "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F8F8F8; color: #000; border: 4px solid #000; padding: 30px;'>
            <div style='text-align: center;'>
                <img src='https://golden-petal.in/logo.png' alt='Golden Petal Logo' style='max-width: 150px; margin-bottom: 20px;' />
                <h2 style='color: #000; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;'>New Booking Alert</h2>
            </div>
            <div style='background-color: #FFF; padding: 20px; margin-top: 20px; border: 1px solid #CCC;'>
                <p><strong>Customer:</strong> $customerName ($customerEmail)</p>
                <p><strong>Service:</strong> $serviceName</p>
                <p><strong>Date & Time:</strong> $prettyDate</p>
                <p><strong>Duration:</strong> $duration_hours Hour(s)</p>
                <p><strong>Total Price:</strong> $" . number_format($total_price, 2) . "</p>
            </div>
        </div>";
        sendEmail($adminEmail, $adminSubject, $adminHtml);
    }
    // -------------------------

    http_response_code(201); // Created
    echo json_encode([
        "status" => "success", 
        "message" => "Booking created successfully",
        "booking_id" => $bookingId
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to create booking: " . $e->getMessage()]);
}
?>
