<?php
/**
 * Template Name: Custom Register
 *
 * @package OceanWP WordPress theme
 */

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

<!doctype html>
    <html lang="en">

        <head>
            <meta charset="UTF-8">
            <title>Login Page</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Quicksand', sans-serif;
                }

                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: #000;
                }

                section {
                    position: absolute;
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 2px;
                    flex-wrap: wrap;
                    overflow: hidden;
                }

                section::before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(#000, #0f0, #000);
                    animation: animate 5s linear infinite;
                }

                @keyframes animate {
                    0% {
                        transform: translateY(-100%);
                    }

                    100% {
                        transform: translateY(100%);
                    }
                }

                section span {
                    position: relative;
                    display: block;
                    width: calc(6.25vw - 2px);
                    height: calc(6.25vw - 2px);
                    background: #181818;
                    z-index: 2;
                    transition: 1.5s;
                }

                section span:hover {
                    background: #0f0;
                    transition: 0s;
                }

                section .signin {
                    position: absolute;
                    width: 400px;
                    background: #222;
                    z-index: 1000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px;
                    border-radius: 4px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 9);
                }

                section .signin .content {
                    position: relative;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    gap: 40px;
                }

                section .signin .content h2 {
                    font-size: 2em;
                    color: #0f0;
                    text-transform: uppercase;
                }

                section .signin .content .form {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                }

                section .signin .content .form .inputBox {
                    position: relative;
                    width: 100%;
                }

                section .signin .content .form .inputBox input {
                    position: relative;
                    width: 100%;
                    background: #333;
                    border: none;
                    outline: none;
                    padding: 25px 10px 7.5px;
                    border-radius: 4px;
                    color: #fff;
                    font-weight: 500;
                    font-size: 1em;
                }

                section .signin .content .form .inputBox i {
                    position: absolute;
                    left: 0;
                    padding: 15px 10px;
                    font-style: normal;
                    color: #aaa;
                    transition: 0.5s;
                    pointer-events: none;
                }

                .signin .content .form .inputBox input:focus~i,
                .signin .content .form .inputBox input:valid~i {
                    transform: translateY(-7.5px);
                    font-size: 0.8em;
                    color: #fff;
                }

                .signin .content .form .links {
                    position: relative;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }

                .signin .content .form .links a {
                    color: #fff;
                    text-decoration: none;
                }

                .signin .content .form .links a:nth-child(2) {
                    color: #0f0;
                    font-weight: 600;
                }

                .signin .content .form .inputBox input[type="submit"] {
                    padding: 10px;
                    background: #0f0;
                    color: #000;
                    font-weight: 600;
                    font-size: 1.35em;
                    letter-spacing: 0.05em;
                    cursor: pointer;
                }

                input[type="submit"]:active {
                    opacity: 0.6;
                }

                @media (max-width: 900px) {
                    section span {
                        width: calc(10vw - 2px);
                        height: calc(10vw - 2px);
                    }
                }

                @media (max-width: 600px) {
                    section span {
                        width: calc(20vw - 2px);
                        height: calc(20vw - 2px);
                    }
                }
            </style>

        </head>

        <body> 

            <section> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>

                <div class="signin">

                    <div class="content">

                        <h2>Sign In</h2>
                        <!-- Display a message if verification is required -->
                        <?php if (isset($_GET['verification']) && $_GET['verification'] == 1): ?>
                            <div class="verification-message">Please check your email to verify your account.</div>
                        <?php endif; ?>

                        <form method="post" class="form">
                            <?php wp_nonce_field('login_action', 'login_nonce'); ?>

                            <!-- Username Input -->
                            <div class="inputBox">
                                <input type="text" name="username" value="<?php echo isset($username) ? esc_attr($username) : ''; ?>">
                                <i>Username/Email</i>
                                <?php if (!empty($error['username_empty'])): ?>
                                    <div class="error-message" style="color: red;"><?php echo esc_html($error['username_empty']); ?></div>
                                <?php endif; ?>
                            </div>

                            <!-- Password Input -->
                            <div class="inputBox">
                                <input type="password" name="password">
                                <i>Password</i>
                                <?php if (!empty($error['password_empty'])): ?>
                                    <div class="error-message" style="color: red;"><?php echo esc_html($error['password_empty']); ?></div>
                                <?php endif; ?>
                            </div>

                            <!-- Error message for invalid credentials -->
                            <?php if (!empty($error['invalid_credentials'])): ?>
                                <div class="error-message" style="color: red;"><?php echo esc_html($error['invalid_credentials']); ?></div>
                            <?php endif; ?>

                            <!-- Error message for unverified account -->
                            <?php if (!empty($error['not_verified'])): ?>
                                <div class="error-message" style="color: red;"><?php echo esc_html($error['not_verified']); ?></div>
                            <?php endif; ?>

                            <!-- Submit Button -->
                            <div class="inputBox">
                                <input type="submit" value="Sign In">
                            </div>

                            <div class="links">
                                <a href="<?php echo site_url('/forgot-password/'); ?>">Forgot Password?</a>
                                <!-- <a href="<?php echo site_url('/forgot-password/'); ?>">Forgot Password?</a> -->

                                <a href="<?php echo site_url('/registration'); ?>">Register</a>
                            </div>
                        </form>
                    </div>

                </div>

            </section> <!-- partial -->

        </body>

    </html>