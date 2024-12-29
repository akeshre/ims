<?php
/**
 * Template Name: Custom User Profile
 *
 * @package OceanWP WordPress theme
 */

// Ensure the user is logged in
if (!is_user_logged_in() ) {
    wp_redirect( wp_login_url() );
    exit;
}

// Get current user
$current_user = wp_get_current_user();
?>
<?php include 'custom_navbar.php'; ?>
<style>
/* Basic styling for the profile page */
.profile-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-container h1 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}

.profile-detail {
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.profile-detail p {
    font-size: 16px;
    margin-bottom: 15px;
    line-height: 1.6;
}

.profile-detail strong {
    color: #555;
}

@media (max-width: 768px) {
    .profile-container {
        padding: 15px;
    }

    .profile-container h1 {
        font-size: 24px;
    }

    .profile-detail {
        padding: 15px;
    }
}
</style>

<div class="profile-container">
    <h1>User Profile</h1>
    <div class="profile-detail">
        <p><strong>Username:</strong> <?php echo esc_html( $current_user->user_login ); ?></p>
        <p><strong>Display Name:</strong> <?php echo esc_html( $current_user->display_name ); ?></p>
        <p>
            <strong>Email:</strong> <?php echo esc_html( $current_user->user_email ); ?>
            <!-- <a href="#" id="update-email-link" style="color: blue; text-decoration: underline; margin-left: 10px;">Update Email</a> -->
        </p>
        <p><strong>Nickname:</strong> <?php echo esc_html( $current_user->nickname ); ?></p>
        <p><strong>Registered Date:</strong> <?php echo esc_html( $current_user->user_registered ); ?></p>
        <p><strong>Role:</strong> <?php echo implode(', ', $current_user->roles); ?></p>


        
    </div>
</div>


<form id="update-email-form" method="post" style="display: none; margin-top: 20px;">
    <label for="new_email"><strong>New Email:</strong></label>
    <input type="email" id="new_email" name="new_email">
    <button type="submit" name="update_email">Update Email</button>
</form>

<?php echo wp_footer(); ?>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const updateEmailLink = document.getElementById("update-email-link");
        const updateEmailForm = document.getElementById("update-email-form");

        updateEmailLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default link behavior
            if (updateEmailForm.style.display === "none") {
                updateEmailForm.style.display = "block"; // Show the form
            } else {
                updateEmailForm.style.display = "none"; // Hide the form
            }
        });
    });
</script>
</body>
</html>

<?php
if ( isset($_POST['update_email']) && !empty($_POST['new_email']) ) {
    $new_email = sanitize_email( $_POST['new_email'] );
    $current_user_id = $current_user->ID;

    // Update the user's email address
    $update = wp_update_user([
        'ID' => $current_user_id,
        'user_email' => $new_email
    ]);

    if ( is_wp_error( $update ) ) {
        echo '<p>Failed to update email.</p>';
    } else {
        // Send a verification email
        $verification_link = add_query_arg([
            'user_id' => $current_user_id,
            'new_email' => $new_email,
            'key' => wp_generate_password(20, false)
        ], home_url('/verify-email'));

        $message = 'Click the following link to verify your email address: ' . esc_url($verification_link);
        wp_mail( $new_email, 'Verify Your Email Address', $message );

        echo '<p>A verification email has been sent to your new email address.</p>';
    }
}
?>
