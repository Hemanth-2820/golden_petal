<?php
// db_connect.php
// CORS headers for allowing the React frontend to communicate with this API
header("Access-Control-Allow-Origin: *"); // Change * to your React app URL in production
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$host = 'localhost';
$dbname = 'nsgsowg8_golden_db'; // Your cPanel database name
$username = 'nsgsowg8_golden'; // Note: Replace with exact Database Username if different
$password = 'goldenpetal@2026';     // Your Database password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Set default fetch mode to associative array
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    die(json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . $e->getMessage()
    ]));
}
?>
