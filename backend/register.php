<?php
// register.php
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
$input = json_decode($inputJSON, TRUE); // Convert JSON into array

$name = $input['name'] ?? '';
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

// Basic validation
if (empty($name) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Name, email, and password are required"]);
    exit;
}

// Check if email already exists
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
    http_response_code(409); // Conflict
    echo json_encode(["status" => "error", "message" => "Email already registered"]);
    exit;
}

// Hash the password securely
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

// Insert into database
try {
    $insertStmt = $pdo->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
    $insertStmt->execute([$name, $email, $passwordHash]);
    
    // Send Welcome Email
    $subject = "Welcome to Golden Petal!";
    $htmlMessage = "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #FFF; border: 4px solid #D4AF37; padding: 30px; text-align: center;'>
        <img src='https://golden-petal.in/logo.png' alt='Golden Petal Logo' style='max-width: 150px; margin-bottom: 20px;' />
        <h2 style='color: #D4AF37; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;'>Welcome, " . htmlspecialchars($name) . "!</h2>
        <div style='background-color: #FFF; color: #000; padding: 20px; margin-top: 20px; text-align: left; border: 2px solid #D4AF37;'>
            <p style='font-size: 16px; line-height: 1.5;'>Thank you for creating an account with us. We are excited to help you celebrate your special moments.</p>
            <p style='font-size: 16px; line-height: 1.5;'>You can now log in and book your perfect setup.</p>
        </div>
        <p style='color: #D4AF37; margin-top: 30px; font-weight: bold;'>Golden Petal - House of Celebration</p>
    </div>";
    sendEmail($email, $subject, $htmlMessage);

    http_response_code(201); // Created
    echo json_encode(["status" => "success", "message" => "User registered successfully"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Registration failed: " . $e->getMessage()]);
}
?>
