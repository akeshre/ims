<?php
/**
 * Template Name: Change Password
 *
 * @package OceanWP WordPress theme
 */

if (!is_user_logged_in()) {
    wp_redirect(wp_login_url());
    exit;
}

// Get the current user
$current_user = wp_get_current_user();

// Handle the form submission
if (isset($_POST['submit'])) {
    $current_password = $_POST['current_password'];
    $new_password = $_POST['new_password'];
    $confirm_password = $_POST['confirm_password'];

    if (empty($current_password) || empty($new_password) || empty($confirm_password)) {
        $error = "All fields are required.";
    } elseif ($new_password !== $confirm_password) {
        $error = "New password and confirm password do not match.";
    } elseif (!wp_check_password($current_password, $current_user->user_pass, $current_user->ID)) {
        $error = "Current password is incorrect.";
    } else {
        // Update the user's password
        wp_set_password($new_password, $current_user->ID);
        wp_logout(); // Log the user out after password change
        wp_redirect(wp_login_url() . '?password_changed=1');
        exit;
    }
}
?>

<?php include 'custom_navbar.php'; ?>

<div class="changepassword-container">
    <div class="changepassword-content">
        <div class="changepassword-form">
            <h2>Change Password</h2>

            <?php if (isset($error)) : ?>
                <div class="error"><?php echo $error; ?></div>
            <?php endif; ?>

            <form method="post">
                <label for="current_password">Current Password:</label>
                <input type="password" name="current_password" >

                <label for="new_password">New Password:</label>
                <input type="password" name="new_password" >

                <label for="confirm_password">Confirm New Password:</label>
                <input type="password" name="confirm_password" >

                <input type="submit" name="submit" value="Change Password">
            </form>
        </div>
    </div>
</div>


<style>
    /* Sidebar styles */
    /* .sidebar {
        width: 250px;
        background-color: #fff;
        padding: 15px;
        border-right: 1px solid #ddd;
        position: fixed; 
        height: 100%;
        transition: all 0.3s;
    }

    .sidebar.collapsed {
        width: 0;
        padding: 0;
        overflow: hidden;
    }

    .sidebar h2 {
        font-size: 18px;
        margin-bottom: 15px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ddd;
    }

    .sidebar ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .sidebar ul li {
        margin-bottom: 10px;
    }

    .sidebar ul li a {
        text-decoration: none;
        color: #333;
        display: block;
        padding: 10px;
        border-radius: 5px;
        background-color: #fff;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .sidebar ul li a:hover,
    .sidebar ul li a.active {
        background-color: #4CAF50;
        color: #fff;
    } */

    /*
    .changepassword-container {
        padding: 20px;
        background-color: #f7f7f7;
    }

     .changepassword-content {
        width: 50%;
        flex-grow: 1;
        padding: 20px;
        margin-left: 500px;
        transition: margin-left 0.3s;
    } */

    .changepassword-container {
        padding: 20px;
        background-color: #f7f7f7;
    }

    .changepassword-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .changepassword-form h1 {
        margin-bottom: 20px;
    }

    .changepassword-form label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .changepassword-form input[type="text"],
    .changepassword-form input[type="password"]
    {
        width: 100%;
        max-width: 400px;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .changepassword-form input[type="submit"] {
        padding: 10px 20px;
        background-color: #0073e6;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
    }

    .changepassword-form input[type="submit"]:hover {
        background-color: #005bb5;
    }



</style>