<?php
/**
 * Template Name: Custom Dashboard
 *
 * @package OceanWP WordPress theme
 */

// Ensure the user is logged in
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url());
    exit;
}

// Get current user
$current_user = wp_get_current_user();

?>
<?php include 'custom_navbar.php'; ?>

<style>
    .dashboard-container {
        display: flex;
        padding: 20px;
    }

    .sidebar {
        width: 250px;
        background-color: #f7f7f7;
        padding: 15px;
        border-right: 1px solid #ddd;
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
        transition: all 0.3s ease;
    }

    .sidebar ul li a:hover {
        background-color: #4CAF50;
        color: #fff;
    }

    .content {
        flex-grow: 1;
        padding: 20px;
    }

    .content h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    .content p {
        font-size: 16px;
        line-height: 1.6;
    }
</style>

<div class="dashboard-container">
    <!-- Left Sidebar -->
    <div class="sidebar">

        <h2>Dashboard Menu</h2>
        <ul>
            <li><a href="<?php echo site_url('/therapist-registration'); ?>">Therapist Registration Details</a></li>
            <li><a href="#">Payment Details</a></li>
        </ul>
    </div>

    <!-- Main Content Area -->
    <div class="content">

    
        <h1>Welcome to Your Dashboard</h1>
        <p>Hello, <?php echo esc_html($current_user->display_name); ?>! Welcome to your custom dashboard page.</p>
        <!-- You can add more dashboard content here -->
    </div>
</div>

<?php wp_footer(); ?>
</body>
</html>

