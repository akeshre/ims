<?php
/**
 * Template Name: Verify Email
 *
 * @package OceanWP WordPress theme
 */



global $wpdb;

if (isset($_GET['token']) && isset($_GET['user_id'])) {
    $user_id = intval($_GET['user_id']);
    $token = sanitize_text_field($_GET['token']);
    
    // Retrieve the stored token from usermeta
    $stored_token = get_user_meta($user_id, 'verification_token', true);
    
    if ($stored_token === $token) {
        // Mark the email as verified
        update_user_meta($user_id, 'is_verified', 1);

        // Delete the verification token since it is no longer needed
        delete_user_meta($user_id, 'verification_token');

        echo "Email verified successfully. You can now <a href='" . wp_login_url() . "'>login</a>.";
    } else {
        echo "Invalid verification link.";
    }
} else {
    echo "No token provided.";
}

