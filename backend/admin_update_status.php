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

    // Send confirmation email to customer if status is confirmed
    if ($new_status === 'confirmed') {
        $detailStmt = $pdo->prepare("
            SELECT b.*, u.email, u.name as customer_name, s.name as service_name 
            FROM bookings b
            JOIN users u ON b.user_id = u.id
            JOIN services s ON b.service_id = s.id
            WHERE b.id = ?
        ");
        $detailStmt->execute([$booking_id]);
        $b = $detailStmt->fetch();

        if ($b && !empty($b['email'])) {
            $customerEmail = $b['email'];
            $customerName = $b['customer_name'];
            $serviceName = $b['service_name'];
            $dateObj = new DateTime($b['booking_date']);
            $prettyDate = $dateObj->format('F j, Y \a\t g:i A');

            $subject = "Booking Confirmed! - Golden Petal";
            $html = "
            <div style='font-family: sans-serif; color: #000; max-width: 600px; margin: 0 auto; border: 4px solid #D4AF37;'>
                <div style='background-color: #000; padding: 20px; text-align: center;'>
                    <h1 style='color: #D4AF37; margin: 0;'>GOLDEN PETAL</h1>
                </div>
                <div style='padding: 20px;'>
                    <h2 style='color: #000;'>Payment Verified & Booking Confirmed!</h2>
                    <p>Hi " . htmlspecialchars($customerName) . ",</p>
                    <p>Great news! We have successfully received and verified your payment. Your booking is now officially <strong>CONFIRMED</strong>.</p>
                    <hr style='border: 1px solid #D4AF37; margin: 20px 0;' />
                    <p><strong>Service:</strong> $serviceName</p>
                    <p><strong>Date & Time:</strong> $prettyDate</p>
                    <p><strong>Duration:</strong> {$b['duration_hours']} Hour(s)</p>
                    <p><strong>Guests:</strong> {$b['guests']}</p>
                    <hr style='border: 1px solid #D4AF37; margin: 20px 0;' />
                    <p style='font-size: 16px; font-weight: bold;'>We can't wait to host your celebration!</p>
                </div>
            </div>";
            
            require_once 'mailer.php';
            sendEmail($customerEmail, $subject, $html);
        }
    }

    echo json_encode([
        "status" => "success",
        "message" => "Booking status updated to " . htmlspecialchars($new_status)
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to update status: " . $e->getMessage()]);
}
?>
