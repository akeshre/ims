<?php
/**
 * Template Name: Login
 *
 * @package OceanWP WordPress theme
 */

global $user_ID;
$error = array();

if (!$user_ID) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        // Escape and sanitize input
        $username = sanitize_user($_POST['username']);
        $password = sanitize_text_field($_POST['password']);

        // Validate that the email/username is not empty
        if (empty($username)) {
            $error['username_empty'] = "Username/Email is required";
        }

        // Validate that the password is not empty
        if (empty($password)) {
            $error['password_empty'] = "Password is required";
        }

        if (empty($error)) {
            // Authenticate the user
            $user = wp_authenticate($username, $password);

            if (is_wp_error($user)) {
                $error['invalid_credentials'] = $user->get_error_message();
            } else {
                // Check if the user is verified
                $is_verified = get_user_meta($user->ID, 'is_verified', true);
                if ($is_verified != 1) {
                    $error['not_verified'] = 'Your email is not verified. Please check your email to verify your account.';
                } else {
                    // Set current user and authentication cookie
                    wp_set_current_user($user->ID);
                    wp_set_auth_cookie($user->ID);

                    // Get the current user
                    $current_user = wp_get_current_user();
                    $roles = $current_user->roles;

                    // Redirect based on user roles
                    if (in_array('therapist', $roles)) {
                        wp_redirect(home_url('/therapist/'));
                    } elseif (in_array('schoolmassage', $roles)) {
                        wp_redirect(home_url('/school/'));
                    } elseif (in_array('administrator', $roles)) {
                        wp_redirect(admin_url());
                    } else {
                        echo '<div class="error-message">Unexpected role: ' . esc_html(implode(', ', $roles)) . '</div>';
                    }
                    exit;
                }
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

                .verification-message {
                    color:white;
                }

                .error-message{
                    color:white;
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
                                    <div class="error-message"><?php echo esc_html($error['username_empty']); ?></div>
                                <?php endif; ?>
                            </div>

                            <!-- Password Input -->
                            <div class="inputBox">
                                <input type="password" name="password">
                                <i>Password</i>
                                <?php if (!empty($error['password_empty'])): ?>
                                    <div class="error-message"><?php echo esc_html($error['password_empty']); ?></div>
                                <?php endif; ?>
                            </div>

                            <!-- Error message for invalid credentials -->
                            <?php if (!empty($error['invalid_credentials'])): ?>
                                <div class="error-message"><?php echo esc_html($error['invalid_credentials']); ?></div>
                            <?php endif; ?>

                            <!-- Error message for unverified account -->
                            <?php if (!empty($error['not_verified'])): ?>
                                <div class="error-message"><?php echo esc_html($error['not_verified']); ?></div>
                            <?php endif; ?>

                            <!-- Submit Button -->
                            <div class="inputBox">
                                <input type="submit" value="Sign In">
                            </div>

                            <div class="links">
                                <a href="<?php echo site_url('/forgot-password/'); ?>">Forgot Password?</a>

                                <a href="<?php echo site_url('/registration'); ?>">Register</a>
                            </div>
                        </form>
                    </div>

                </div>

            </section> <!-- partial -->

        </body>

    </html>

<?php
} else {
    wp_redirect(home_url()); // Redirect logged-in users to the home page
    exit;
}
?>