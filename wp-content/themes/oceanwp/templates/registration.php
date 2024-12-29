<?php
/**
 * Template Name: Registration
 *
 * @package OceanWP WordPress theme
 */

 global $wpdb;

$error = array();

if ($_POST) {
    $username = $wpdb->escape($_POST['txtUsername']);
    $email = $wpdb->escape($_POST['txtEmail']);
    $password = $wpdb->escape($_POST['txtPassword']);
    $confirmpassword = $wpdb->escape($_POST['txtConfirmPassword']);
    $role = $_POST['role'];

    if (strpos($username, ' ') !== FALSE) {
        $error['username_space'] = "Username has a space";
    }

    if (empty($username)) {
        $error['username_empty'] = "Username is required";
    }

    if (username_exists($username)) {
        $error['username_exists'] = "Username already exists";
    }

    if (empty($email)) {
        $error['email_empty'] = "Email is required";
    }

    if (!empty($email) && !is_email($email)) {
        $error['email_valid'] = "Invalid email address";
    }

    if (email_exists($email)) {
        $error['email_exists'] = "Email already exists";
    }

    if (strcmp($password, $confirmpassword)) {
        $error['password'] = "Passwords do not match";
    }

    if (count($error) == 0) {
        // wp_create_user($username, $password, $email);
        // echo "User created successfully";
        // exit;

        $user_id = wp_create_user($username, $password, $email);
        
        if (!is_wp_error($user_id)) {
            // Store the role in wp_usermeta
            update_user_meta($user_id, 'custom_role', $role);
            
            $wp_roles = new WP_Roles();
            if ($wp_roles->is_role($role)) {
                $user = new WP_User($user_id);
                $user->set_role($role);
            }

            // Generate and store the verification token
            $verification_token = wp_generate_password(20, false);
            update_user_meta($user_id, 'verification_token', $verification_token);

             // Send the verification email
            $verification_link = site_url("/verify-email?token=$verification_token&user_id=$user_id");

            $subject = 'Verify Your Email Address';
            $message = "Click the following link to verify your email address: $verification_link";
            $sent =wp_mail($email, $subject, $message);

            //  if ($sent) {
            //     echo "User created successfully. Please check your email to verify your account.";
            // } else {
            //     echo "There was a problem sending the email. Please try again later.";
            // }

            if ($sent) {
                // Redirect to login page with a verification message
                wp_redirect(site_url('/login?verification=1'));
                exit;
            } else {
                $error['email'] = "There was a problem sending the email. Please try again later.";
            }
        }
    }
}
?>

<!doctype html>
    <html lang="en">

        <head>
            <meta charset="UTF-8">
            <title>Registration Page</title>
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

                section .signin .content .form .inputBox select {
                    width: 100%;
                    background: #f0f2f5;
                    border: 1px solid #dcdfe3;
                    padding: 12px 15px;
                    border-radius: 4px;
                    color: #333;
                    font-size: 1em;
                    transition: 0.3s;
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

                .error-message {
                    color: white;
                    margin-top: 5px;
                }
            </style>

        </head>

        <body> 

            <section> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>

                <div class="signin">

                    <div class="content">

                        <h2>Sign Up</h2>
                        

                        <form method="post" class="form">
                    <!-- Username Input -->
                    <div class="inputBox">
                        <input type="text" name="txtUsername" value="<?php echo isset($username) ? esc_attr($username) : ''; ?>">
                        <i>Username</i>
                        <?php if (!empty($error['username_empty'])): ?>
                            <div class="error-message"><?php echo esc_html($error['username_empty']); ?></div>
                        <?php elseif (!empty($error['username_exists'])): ?>
                            <div class="error-message"><?php echo esc_html($error['username_exists']); ?></div>
                        <?php elseif (!empty($error['username_space'])): ?>
                            <div class="error-message"><?php echo esc_html($error['username_space']); ?></div>
                        <?php endif; ?>
                    </div>

                    <!-- Email Input -->
                    <div class="inputBox">
                        <input type="email" name="txtEmail" value="<?php echo isset($email) ? esc_attr($email) : ''; ?>">
                        <i>Email</i>
                        <?php if (!empty($error['email_empty'])): ?>
                            <div class="error-message"><?php echo esc_html($error['email_empty']); ?></div>
                        <?php elseif (!empty($error['email_valid'])): ?>
                            <div class="error-message"><?php echo esc_html($error['email_valid']); ?></div>
                        <?php elseif (!empty($error['email_exists'])): ?>
                            <div class="error-message"><?php echo esc_html($error['email_exists']); ?></div>
                        <?php endif; ?>
                    </div>

                    <!-- Password Input -->
                    <div class="inputBox">
                        <input type="password" name="txtPassword" >
                        <i>Password</i>
                        <?php if (!empty($error['password'])): ?>
                            <div class="error-message"><?php echo esc_html($error['password']); ?></div>
                        <?php endif; ?>
                    </div>

                    <!-- Confirm Password Input -->
                    <div class="inputBox">
                        <input type="password" name="txtConfirmPassword">
                        <i>Confirm Password</i>
                        <?php if (!empty($error['password'])): ?>
                            <div class="error-message"><?php echo esc_html($error['password']); ?></div>
                        <?php endif; ?>
                    </div>

                    <!-- Role Input (Optional) -->
                    <div class="inputBox">
                        <select name="role" id="role" style="width: 100%; padding: 10px; margin-top: 5px;">
                            <i>Role</i>
                            <option value="therapist">Therapist</option>
                            <option value="schoolmassage">School Massage</option>
                        </select>
                    </div>

                    <!-- Submit Button -->
                    <div class="inputBox">
                        <input type="submit" value="Register">
                    </div>
                </form>
                    </div>

                </div>

            </section> <!-- partial -->

        </body>

    </html>