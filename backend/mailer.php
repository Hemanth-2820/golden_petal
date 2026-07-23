<?php
// mailer.php
// A simple mail wrapper using PHP's native mail() function, which works out of the box on BigRock shared hosting.

function sendEmail($to, $subject, $htmlMessage) {
    // This is the email address the customer sees as the sender.
    $from_email = "info@golden-petal.in";
    $from_name = "Golden Petal";
    
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: " . $from_name . " <" . $from_email . ">\r\n";
    // If a customer hits 'Reply', it goes straight to your Gmail!
    $headers .= "Reply-To: goldencelebration2026@gmail.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // The mail() function returns true if the mail was successfully accepted for delivery
    return mail($to, $subject, $htmlMessage, $headers);
}
?>
