<?php

/**
 * The template for displaying custom Register Page.
 *
 * @package OceanWP WordPress theme
 */

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $contact = filter_input(INPUT_POST, 'contact', FILTER_SANITIZE_STRING);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validate the inputs
    $errors = [];

    if (!$name) {
        $errors[] = "Name is required.";
    }

    if (!$email) {
        $errors[] = "Valid email is required.";
    }

    if (!$contact) {
        $errors[] = "Contact number is required.";
    }

    if (!$password || !$confirm_password) {
        $errors[] = "Both password fields are required.";
    } elseif ($password !== $confirm_password) {
        $errors[] = "Passwords do not match.";
    }

    if (empty($errors)) {
        // Normally, you would hash the password and store this data in a database
        echo "Registration successful!<br>";
        echo "Name: " . htmlspecialchars($name) . "<br>";
        echo "Email: " . htmlspecialchars($email) . "<br>";
        echo "Contact Number: " . htmlspecialchars($contact) . "<br>";
        // Note: Never display the password in a real application.
    } else {
        // Display errors
        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }
    }
} else {
    echo "Invalid request method.";
}
?>
