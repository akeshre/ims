<?php
/**
 * Navbar Template
 *
 * @package OceanWP WordPress theme
 */

// Ensure the user is logged in
if ( ! is_user_logged_in() ) {
    return;
}

// Function to get the logout URL
function custom_logout_url() {
    return wp_logout_url();
}

// URL for the profile page
$profile_url = home_url('/custom-user-profile/');

// Get current user's roles
$current_user = wp_get_current_user();
$user_roles = $current_user->roles;

// Check user role
$is_therapist = in_array('therapist', $user_roles);
$is_schoolmassage = in_array('schoolmassage', $user_roles);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Basic Reset */
        * {
            border: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Lato", sans-serif;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }

        /* Navbar Styles */
        .navbar {
            background-color: #333;
            text-align: right;
            position: fixed;
            top: 0;
            width: 100%;
            height: 60px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between; /* Space between for collapse icon */
            padding: 0 20px; /* Add padding for spacing */
        }

        .navbar-inner {
            display: flex;
            align-items: center;
        }

        /* Collapse Icon */
        .collapse-icon {
            color: white;
            font-size: 24px;
            cursor: pointer;
        }

        /* Dropdown Menu */
        .navbar .dropdown {
            position: relative;
            display: inline-block;
        }

        .navbar .dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            background-color: #333;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 1;
            border-radius: 5px;
            overflow: hidden;
        }

        .navbar .dropdown-content a {
            color: white;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            transition: background-color 0.3s;
        }

        .navbar .dropdown-content a:hover {
            background-color: #575757;
        }

        .navbar .dropdown:hover .dropdown-content {
            display: block;
        }

        .menu-button {
            color: white;
            background-color: #333;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }

        .menu-button:hover {
            background-color: #575757;
        }

        /* Sidebar Styles */
        .container {
            margin: 0;
            padding: 0;
            height: 100vh;
            width: 250px;
            position: fixed;
            background-color: #000011;
            overflow: auto;
            top: 60px;
            left: 0;
            z-index: 999;
            transition: 0.3s;
        }

        .sidebar-content {
            display: block; /* Sidebar visible by default */
        }

        .container a {
            text-decoration: none;
            display: block;
            padding: 18px;
            color: #fff;
        }

        .container a.active {
            background-color: #14a093;
        }

        .container>a:hover:not(.active) {
            background-color: #403b3b;
        }

        .content {
            margin-left: 250px; /* Space for sidebar */
            margin-top: 60px; /* Adjusted for fixed navbar */
        }

        @media screen and (max-width: 768px) {
            .navbar {
                height: auto;
                padding: 10px;
            }

            .navbar .dropdown-content {
                position: static;
                width: 100%;
            }

            .container {
                width: 100%;
                height: auto;
                position: relative;
                top: 0;
            }

            .content {
                margin-left: 0;
                background-color: rgb(242, 242, 110);
            }
        }
    </style>
</head>

<body>
    <div class="navbar">
        <!-- Collapse Icon -->
        <span class="collapse-icon" onclick="toggleSidebar()">☰</span>

        <div class="navbar-inner">
            <div class="dropdown">
                <a href="#" class="menu-button">Menu</a>
                
                <div class="dropdown-content">
                    <a href="<?php echo esc_url( $profile_url ); ?>">My Profile</a>
                    <a href="<?php echo site_url('/change-password/') ?>">Change Password</a>
                    <a href="<?php echo esc_url( custom_logout_url() ); ?>">Logout</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Sidebar based on user role -->
    <?php if ( $is_therapist ): ?>
        <!-- Therapist Sidebar -->
        <div class="container" id="sidebar">
            <div class="sidebar-content">
                <a href="<?php echo site_url('/therapist'); ?>" class="<?php echo is_page('therapist') ? 'active' : ''; ?>">Home</a>
                <a href="<?php echo site_url('/therapist-registration'); ?>" class="<?php echo is_page('therapist-registration') ? 'active' : ''; ?>">Therapist Registration Details</a>
                <a href="<?php echo site_url('/payments'); ?>">Payment Details</a>
            </div>
        </div>
    <?php elseif ( $is_schoolmassage ): ?>
        <!-- Schoolmassage Sidebar -->
        <div class="container" id="sidebar">
            <div class="sidebar-content">
                <a href="<?php echo site_url('/school'); ?>" class="<?php echo is_page('school') ? 'active' : ''; ?>">Home</a>
                <a href="<?php echo site_url('/school-registration'); ?>" class="<?php echo is_page('school-registration') ? 'active' : ''; ?>">School Details</a>
                <a href="<?php echo site_url('/school-therapist/'); ?>" class="<?php echo is_page('school-therapist/') ? 'active' : ''; ?>">Therapist Registration Details</a>
                <a href="<?php echo site_url('/payments'); ?>">Payment Details</a>
            </div>
        </div>
    <?php endif; ?>

    <div class="content">
        <!-- Page content goes here -->
    </div>

    <script>
        function toggleSidebar() {
            var sidebar = document.getElementById('sidebar');
            if (sidebar.style.display === 'none' || sidebar.style.display === '') {
                sidebar.style.display = 'block';
                document.querySelector('.content').style.marginLeft = '250px'; // Adjust content margin
            } else {
                sidebar.style.display = 'none';
                document.querySelector('.content').style.marginLeft = '0'; // Reset content margin
            }
        }
    </script>

    <?php wp_footer(); ?>
</body>

</html>
