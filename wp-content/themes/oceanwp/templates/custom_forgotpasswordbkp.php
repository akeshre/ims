<?php
/**
 * Template Name: Forgot Passwordbkp
 *
 * @package OceanWP WordPress theme
 */

$errors = [];
$success = "";

if (isset($_POST['submit'])) {
    $user_email = sanitize_email($_POST['user_email']);
    
    if (empty($user_email)) {
        $errors[] = "Email is required.";
    } elseif (!is_email($user_email) || !email_exists($user_email)) {
        $errors[] = "Invalid or non-existent email.";
    } else {
        // Get the user by email
        $user = get_user_by('email', $user_email);

        if ($user) {
            $random_password = wp_generate_password(12, true); // Generates a 12-character random password

            wp_set_password($random_password, $user->ID);

            // Send the new password via email
            $subject = "Your New Password";
            $message = "Hi " . $user->user_login . ",\n\n";
            $message .= "Your new password is: " . $random_password . "\n\n";
            $message .= "Please log in and change your password immediately for security reasons.\n\n";
            $message .= "Thank you,\nYour Website Team";

            // Send email
            if (wp_mail($user_email, $subject, $message)) {
                // Display success message
                $success = "A new password has been generated and sent to your email address.";
            } else {
                $errors[] = "Failed to send the email. Please try again later.";
            }
        } else {
            $errors[] = "No user found with this email address.";
        }
    }
}
?>

<style>
    /* CSS Styles */
    #site-navigation-wrap {
        display: none;
    }
    #site-header .transparent-header {
        position: relative;
        z-index: 1000000;
        background: black;
    }

    .registration-container {
        max-width: 500px;
        margin: 100px auto 50px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #fff;
        z-index: 1;
        position: relative;
    }

    .submit-button {
        padding: 10px 20px;
        background-color: #0073aa;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .error-message {
        color: red;
        margin-top: 5px;
    }

    .verification-message {
        color: green;
        margin-top: 5px;
    }

    #footer {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>

<?php get_header(); ?>

<div class="container" style="padding: 50px 0;">
    <div class="form-container" style="max-width: 400px; margin: 0 auto; background: #fff; padding: 30px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; margin-bottom: 20px;">Forgot Password</h2>

        <!-- Display errors or success message only after form submission -->
        <?php if (isset($_POST['submit'])): ?>
            <!-- Display errors -->
            <?php if (!empty($errors)) : ?>
                <?php foreach ($errors as $error) : ?>
                    <p class="error-message" style="text-align: center; margin-bottom: 15px;"><?php echo esc_html($error); ?></p>
                <?php endforeach; ?>
            <?php endif; ?>

            <!-- Display success message -->
            <?php if (!empty($success)) : ?>
                <p class="verification-message" style="text-align: center; margin-bottom: 15px;"><?php echo esc_html($success); ?></p>
            <?php endif; ?>
        <?php endif; ?>

        <form method="post">
            <label for="user_email" style="display: block; font-weight: bold; margin-bottom: 5px;">Enter your email address:</label>
            <input type="email" name="user_email" style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px;" required>

            <input type="submit" name="submit" value="Reset Password" style="width: 100%; padding: 10px; background-color: #c4a47b; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        </form>
        <p>Back to login? <a href="<?php echo site_url('/login'); ?>">Login</a></p>
    </div>
</div>

<?php get_footer(); ?>
