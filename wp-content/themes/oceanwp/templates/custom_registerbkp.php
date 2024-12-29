<?php
/**
 * Template Name: Custom Registerbkp
 *
 * @package OceanWP WordPress theme
 */

get_header(); // Include the header.php file
define('WP_DEBUG', true);

define('WP_DEBUG_LOG', true);

define('WP_DEBUG_DISPLAY', true);

@ini_set('display_errors', 1);
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $contact = filter_input(INPUT_POST, 'contact', FILTER_SANITIZE_STRING);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $role = $_POST['role'];

    // Validate the inputs
    if (!$name) {
        $errors['name'] = "Name is required.";
    }

    if (!$email) {
        $errors['email'] = "Valid email is required.";
    }

    if (!$contact) {
        $errors['contact'] = "Contact number is required.";
    }

    if (!$password || !$confirm_password) {
        $errors['password'] = "Both password fields are required.";
    } elseif ($password !== $confirm_password) {
        $errors['confirm_password'] = "Passwords do not match.";
    }

    if (!$role) {
        $errors['role'] = "Role selection is required.";
    }

    if (empty($errors)) {
        // Create the user
        if (wp_mail('youremail@example.com', 'Test Email', 'This is a test email.')) {
            echo 'Email sent successfully.';
        } else {
            echo 'Failed to send email.';
        }
        $user_id = wp_create_user($email, $password, $email);
        
        if (is_wp_error($user_id)) {
            $errors['general'] = $user_id->get_error_message();
        } else {
            // Assign role to the user
            $user = new WP_User($user_id);
            $user->set_role($role);

            $activation_code = md5(uniqid(mt_rand(), true));
            update_user_meta($user_id, 'activation_code', $activation_code);
            update_user_meta($user_id, 'user_status', 0); // Set user as inactive initially

            // Send verification email
            $verification_link = add_query_arg(array(
                'key' => $activation_code,
                'email' => $email,
            ), home_url('/verify-email/'));

            $subject = "Verify Your Email Address";
            $message = "Hi $name, \n\n";
            $message .= "Please click the following link to verify your email address: \n\n";
            $message .= $verification_link;
            wp_mail($email, $subject, $message);

            // Redirect after registration with verification message
            wp_redirect(home_url('/login?verification=1'));
            exit; // Ensure no further code is executed after redirect
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register Form</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        form {
            max-width: 400px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        label {
            display: block;
            margin-bottom: 8px;
        }

        input, select {
            width: 100%;
            padding: 10px;
            margin-bottom: 16px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .error {
            color: red;
            margin-bottom: 16px;
        }

        input[type="submit"] {
            background-color: #4caf50;
            color: #fff;
            cursor: pointer;
        }

        input[type="submit"]:hover {
            background-color: #45a049;
        }
    </style>
</head>

<body>

    <form action="<?php echo htmlspecialchars($_SERVER['REQUEST_URI']); ?>" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($_POST['name'] ?? ''); ?>">
        <div class="error"><?php echo $errors['name'] ?? ''; ?></div>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>">
        <div class="error"><?php echo $errors['email'] ?? ''; ?></div>

        <label for="contact">Contact Number:</label>
        <input type="text" id="contact" name="contact" value="<?php echo htmlspecialchars($_POST['contact'] ?? ''); ?>">
        <div class="error"><?php echo $errors['contact'] ?? ''; ?></div>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
        <div class="error"><?php echo $errors['password'] ?? ''; ?></div>

        <label for="confirm_password">Confirm Password:</label>
        <input type="password" id="confirm_password" name="confirm_password">
        <div class="error"><?php echo $errors['confirm_password'] ?? ''; ?></div>

        <label for="role">Select Role:</label>
        <select id="role" name="role">
            <option value="schoolmassage" <?php echo (isset($_POST['role']) && $_POST['role'] === 'schoolmassage') ? 'selected' : ''; ?>>School Massage</option>
            <option value="therapist" <?php echo (isset($_POST['role']) && $_POST['role'] === 'therapist') ? 'selected' : ''; ?>>Therapist</option>
        </select>
        <div class="error"><?php echo $errors['role'] ?? ''; ?></div>

        <input type="submit" value="Register">
    </form>

</body>

</html>

<?php
get_footer();
?>
