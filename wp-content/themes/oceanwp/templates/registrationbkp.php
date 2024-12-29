<?php
/**
 * Template Name: Registrationbkp
 *
 * @package OceanWP WordPress theme
 */
get_header();
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

<style>
    #site-navigation-wrap{
        display: none !important;
    }

    .oceanwp-mobile-menu-icon{
        display: none !important;
    }
    
    #site-header.transparent-header{
        position: relative;
        z-index: 1000000;
        background: black;
    }
    /* Ensure the header and form do not overlap */
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

    
    /* Style the submit button */
    .submit-button {
        padding: 10px 20px;
        background-color: #0073aa;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    /* Style error messages */
    .error-message {
        color: red;
        margin-top: 5px;
    }
</style>

<div class="registration-container">
    <h3>Register</h3>
    <form method="post">
        <p>
            <label for="txtUsername"><b>Username*</b></label>
            <div>
                <input type="text" name="txtUsername" id="txtUsername" placeholder="Enter Username" style="width: 100%; padding: 10px; margin-top: 5px;" />
                <?php if (isset($error['username_space']) || isset($error['username_empty']) || isset($error['username_exists'])): ?>
                    <div class="error-message">
                        <?php echo isset($error['username_space']) ? $error['username_space'] : ''; ?>
                        <?php echo isset($error['username_empty']) ? $error['username_empty'] : ''; ?>
                        <?php echo isset($error['username_exists']) ? $error['username_exists'] : ''; ?>
                    </div>
                <?php endif; ?>
            </div>
        </p>

        <p>
            <label for="txtEmail"><b>Email*</b></label>
            <div>
                <input type="email" name="txtEmail" id="txtEmail" placeholder="Enter Email" style="width: 100%; padding: 10px; margin-top: 5px;" />
                <?php if (isset($error['email_valid']) || isset($error['email_exists']) || isset($error['email_empty'])): ?>
                    <div class="error-message">
                        <?php echo isset($error['email_empty']) ? $error['email_empty'] : ''; ?>
                        <?php echo isset($error['email_valid']) ? $error['email_valid'] : ''; ?>
                        <?php echo isset($error['email_exists']) ? $error['email_exists'] : ''; ?>
                    </div>
                <?php endif; ?>
            </div>
        </p>

        <p>
            <label for="txtPassword"><b>Password*</b></label>
            <div>
                <input type="password" name="txtPassword" id="txtPassword" placeholder="Enter Password" style="width: 100%; padding: 10px; margin-top: 5px;" />
            </div>
        </p>

        <p>
            <label for="txtConfirmPassword"><b>Confirm Password*</b></label>
            <div>
                <input type="password" name="txtConfirmPassword" id="txtConfirmPassword" placeholder="Enter Confirm Password" style="width: 100%; padding: 10px; margin-top: 5px;" />
                <?php if (isset($error['password'])): ?>
                    <div class="error-message">
                        <?php echo $error['password']; ?>
                    </div>
                <?php endif; ?>
            </div>
        </p>

        <p>
            <label for="role">Role</label>
            <div>
                <select name="role" id="role" style="width: 100%; padding: 10px; margin-top: 5px;">
                    <option value="therapist">Therapist</option>
                    <option value="schoolmassage">School Massage</option>
                </select>
            </div>
        </p>
        
        <input type="submit" name="btnSubmit" class="submit-button" />
    </form>
    <p>Already have an account? <a href="<?php echo site_url('/login'); ?>">Login</a></p>
</div>

<?php
get_footer();
?>
