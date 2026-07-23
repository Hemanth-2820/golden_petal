<?php
// forgot_password.php
require_once 'db_connect.php';
require_once 'mailer.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
$email = $input['email'] ?? '';

if (empty($email)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Email is required"]);
    exit;
}

try {
    // Check if user exists
    $stmt = $pdo->prepare("SELECT id, name FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        // Generate a secure token
        $token = bin2hex(random_bytes(32));
        
        // Save token to DB
        $insertStmt = $pdo->prepare("INSERT INTO password_resets (email, token) VALUES (?, ?)");
        $insertStmt->execute([$email, $token]);

        // Send Email
        // IMPORTANT: Change this URL to your actual React frontend URL on BigRock
        $resetLink = "http://localhost:5173/reset-password?token=" . $token;
        
        $subject = "Password Reset Request - Golden Petal";
        $htmlMessage = "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #000; padding: 20px;'>
            <h2 style='color: #D4AF37; text-transform: uppercase;'>Golden Petal</h2>
            <h3>Password Reset Request</h3>
            <p>Hi " . htmlspecialchars($user['name']) . ",</p>
            <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
            <p>To reset your password, click the button below:</p>
            <a href='" . $resetLink . "' style='display: inline-block; padding: 12px 24px; background-color: #000; color: #FFF; text-decoration: none; font-weight: bold; margin: 20px 0;'>RESET PASSWORD</a>
            <p>Or copy this link into your browser: <br/>" . $resetLink . "</p>
        </div>";

        sendEmail($email, $subject, $htmlMessage);
    }

    // We always return success to prevent email enumeration attacks
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "If that email exists, a reset link has been sent."]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server error: " . $e->getMessage()]);
}
?>
