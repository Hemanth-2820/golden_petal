<?php
// update_db.php
require_once 'db_connect.php';

try {
    // 1. Add 'addons' column to bookings table if it doesn't exist
    $columnCheck = $pdo->query("SHOW COLUMNS FROM bookings LIKE 'addons'");
    if ($columnCheck->rowCount() == 0) {
        $pdo->exec("ALTER TABLE bookings ADD COLUMN addons TEXT DEFAULT NULL");
        echo "Successfully added 'addons' column to bookings table.<br>";
    } else {
        echo "'addons' column already exists.<br>";
    }

    // Add customer_phone
    $phoneCheck = $pdo->query("SHOW COLUMNS FROM bookings LIKE 'customer_phone'");
    if ($phoneCheck->rowCount() == 0) {
        $pdo->exec("ALTER TABLE bookings ADD COLUMN customer_phone VARCHAR(50) DEFAULT NULL");
        echo "Successfully added 'customer_phone' column.<br>";
    }

    // Add guests
    $guestsCheck = $pdo->query("SHOW COLUMNS FROM bookings LIKE 'guests'");
    if ($guestsCheck->rowCount() == 0) {
        $pdo->exec("ALTER TABLE bookings ADD COLUMN guests INT DEFAULT 1");
        echo "Successfully added 'guests' column.<br>";
    }

    // Add payment_screenshot
    $screenshotCheck = $pdo->query("SHOW COLUMNS FROM bookings LIKE 'payment_screenshot'");
    if ($screenshotCheck->rowCount() == 0) {
        $pdo->exec("ALTER TABLE bookings ADD COLUMN payment_screenshot VARCHAR(255) DEFAULT NULL");
        echo "Successfully added 'payment_screenshot' column.<br>";
    }

    // 2. Insert default services if the table is empty
    $servicesCheck = $pdo->query("SELECT COUNT(*) FROM services");
    $count = $servicesCheck->fetchColumn();

    if ($count == 0) {
        $services = [
            ['name' => 'BIRTHDAY', 'description' => 'Make every birthday unforgettable.', 'duration_minutes' => 60, 'price' => 999.00],
            ['name' => 'COUPLE SURPRISE', 'description' => 'Romantic setup and candle-lit path.', 'duration_minutes' => 60, 'price' => 999.00],
            ['name' => 'ANNIVERSARY', 'description' => 'Celebrate your journey of love.', 'duration_minutes' => 60, 'price' => 999.00],
            ['name' => 'BABY SHOWER', 'description' => 'A precious moment deserves a beautiful celebration.', 'duration_minutes' => 60, 'price' => 999.00],
            ['name' => 'BRIDE TO BE', 'description' => 'Celebrate your special journey.', 'duration_minutes' => 60, 'price' => 999.00]
        ];

        $stmt = $pdo->prepare("INSERT INTO services (name, description, duration_minutes, price) VALUES (?, ?, ?, ?)");
        
        foreach ($services as $service) {
            $stmt->execute([
                $service['name'],
                $service['description'],
                $service['duration_minutes'],
                $service['price']
            ]);
        }
        echo "Successfully inserted 5 default services.<br>";
    } else {
        echo "Services table already has data. Skipping inserts.<br>";
    }

    echo "<br><h2 style='color:green;'>Database update complete! You can close this tab now.</h2>";

} catch (PDOException $e) {
    echo "<h2 style='color:red;'>Error updating database: " . $e->getMessage() . "</h2>";
}
?>
