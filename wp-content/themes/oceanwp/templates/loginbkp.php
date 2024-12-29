<?php
/**
 * Template Name: LoginBkp
 *
 * @package OceanWP WordPress theme
 */
get_header();

global $user_ID;

$error = array(); // Initialize an array to store errors

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

                    // Redirect based on user roles
                    $roles = $current_user->roles;

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

    <style>
        #site-navigation-wrap{
            display: none !important;
        }
        .oceanwp-mobile-menu-icon{
            display: none !important;
        }
        #site-header.transparent-header {
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

    <div class="registration-container">
        <h3>Login</h3>

        <?php if (isset($_GET['verification']) && $_GET['verification'] == 1): ?>
            <div class="verification-message">Please check your email to verify your account.</div>
        <?php endif; ?>

        <form method="post" action="">
            <?php wp_nonce_field('login_action', 'login_nonce'); ?>
            
            <p>
                <label for="username"><b>Username/Email*</b></label>
                <input type="text" id="username" name="username" placeholder="Enter Username/Email" value="<?php echo isset($_POST['username']) ? esc_attr($_POST['username']) : ''; ?>" />
                <?php if (isset($error['username_empty'])): ?>
                    <div class="error-message"><?php echo $error['username_empty']; ?></div>
                <?php endif; ?>
            </p>

            <p>
                <label for="password"><b>Password*</b></label>
                <input type="password" id="password" name="password" placeholder="Enter password" />
                <?php if (isset($error['password_empty'])): ?>
                    <div class="error-message"><?php echo $error['password_empty']; ?></div>
                <?php endif; ?>
            </p>

            <?php if (isset($error['invalid_credentials'])): ?>
                <div class="error-message"><?php echo $error['invalid_credentials']; ?></div>
            <?php endif; ?>

            <?php if (isset($error['not_verified'])): ?>
                <div class="error-message"><?php echo $error['not_verified']; ?></div>
            <?php endif; ?>

            <p>
                <button type="submit" name="btn_submit" class="submit-button">Log In</button>
            </p>

            <p>Create an account? <a href="<?php echo site_url('/registration'); ?>">Register</a></p>
        </form>
        <a href="<?php echo site_url('/forgot-password/'); ?>">Forgot Password?</a>
    </div>

<?php
} else {
    $user_info = get_userdata($user_ID);

    if ($user_info) {
        $roles = implode(', ', $user_info->roles);

        if ($roles == 'therapist') {
            wp_redirect(home_url('/therapist/'));
        } elseif ($roles == 'schoolmassage') {
            wp_redirect(home_url('/school/'));
        } elseif ($roles == 'administrator') {
            wp_redirect(admin_url());
        }
    } else {
        echo 'User not found.';
    }
}

get_footer();
?>
