<?php
/*
Template Name: Therapist
Description: Creates a custom table for therapist registration.
Version: 1.0
Author: Your Name
*/
if (!is_user_logged_in() ) {
    wp_redirect( wp_login_url() );
    exit;
}
$current_user = wp_get_current_user();
?>
<?php include 'custom_navbar.php'; ?>

<div class="content">
    <h1>Welcome to Your Dashboard</h1>
    <p>Hello, <?php echo esc_html($current_user->display_name); ?>! Welcome to your custom dashboard page.</p>
</div>

</body>
</html>
