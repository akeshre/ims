<?php
/*
Plugin Name: Therapist Registration
Description: Creates a custom table for therapist registration.
Version: 1.0
Author: Your Name
*/

// Hook to create the custom table
register_activation_hook(__FILE__, 'create_therapist_table');

function create_therapist_table() {
    global $wpdb;

    // Set the table name
    $table_name = $wpdb->prefix . 'therapist_registration';

    // Character set and collation
    $charset_collate = $wpdb->get_charset_collate();

    // SQL to create the table
    $sql = "CREATE TABLE $table_name (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id BIGINT(20) UNSIGNED NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        clinic_address TEXT NOT NULL,
        contact_number VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        website_address VARCHAR(255) DEFAULT NULL,
        previous_training_certification TEXT DEFAULT NULL,
        photo VARCHAR(255) DEFAULT NULL,
        logo VARCHAR(255) DEFAULT NULL,
        write_up TEXT DEFAULT NULL,
        treatments_offered TEXT DEFAULT NULL,
        approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES {$wpdb->prefix}users(ID) ON DELETE CASCADE
    ) $charset_collate;";

    // Include the upgrade functions for dbDelta
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

    // Create the table
    dbDelta($sql);
}



// Hook to add admin menu
add_action('admin_menu', 'therapist_registration_menu');

function therapist_registration_menu() {
    add_menu_page(
        'Therapist Registrations',
        'Therapist Registrations',
        'manage_options',
        'therapist-registrations',
        'therapist_registration_list',
        'dashicons-forms',
        20
    );
}

// Display pending registrations
function therapist_registration_list() {
    global $wpdb;
    $results = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}therapist_registration WHERE approval_status = 'pending'");

    if ($results) {
        echo '<table class="wp-list-table widefat fixed striped">';
        echo '<thead><tr><th>ID</th><th>Full Name</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>';
        foreach ($results as $row) {
            echo '<tr>';
            echo '<td>' . esc_html($row->id) . '</td>';
            echo '<td>' . esc_html($row->full_name) . '</td>';
            echo '<td>' . esc_html($row->email) . '</td>';
            echo '<td>' . esc_html($row->approval_status) . '</td>';
            echo '<td><a href="' .admin_url('admin.php?page=therapist-registrations&action=approve&id=' . $row->id) . '">Approve</a> | <a href="' . admin_url('admin.php?page=therapist-registrations&action=reject&id=' . $row->id) . '">Reject</a></td>';
            echo '</tr>';
        }
        echo '</table>';
    } else {
        echo 'No pending registrations found.';
    }
}

add_action('admin_init', 'handle_therapist_actions');
function handle_therapist_actions() {
    if (isset($_GET['page']) && $_GET['page'] == 'therapist-registrations' && isset($_GET['action']) && isset($_GET['id'])) {
        global $wpdb;
        $action = sanitize_text_field($_GET['action']);
        $id = intval($_GET['id']);

        if ($action === 'approve') {
            $wpdb->update(
                "{$wpdb->prefix}therapist_registration",
                ['approval_status' => 'approved'],
                ['id' => $id]
            );
        } elseif ($action === 'reject') {
            $wpdb->update(
                "{$wpdb->prefix}therapist_registration",
                ['approval_status' => 'rejected'],
                ['id' => $id]
            );
        }

        // Redirect back to the registrations page
        wp_redirect(admin_url('admin.php?page=therapist-registrations'));
        exit;
    }
}

// add_action('admin_init', 'approve_registration');
// function approve_registration() {
    
//     if (isset($_GET['page']) && $_GET['page'] == 'approve_registration' && isset($_GET['id'])) {
        
//     exit;
//         global $wpdb;
//         $id = intval($_GET['id']);
//         $wpdb->update(
//             "{$wpdb->prefix}therapist_registration",
//             ['approval_status' => 'approved'],
//             ['id' => $id]
//         );
//         wp_redirect(admin_url('admin.php?page=therapist-registrations'));
//         exit;
//     }
// }

// Handle approval action
// add_action('admin_init', 'approve_registration');

// function approve_registration() {
//     if (isset($_GET['page']) && $_GET['page'] == 'approve_registration' && isset($_GET['id'])) {
//         global $wpdb;
//         $id = intval($_GET['id']);
//         $wpdb->update(
//             "{$wpdb->prefix}therapist_registration",
//             ['approval_status' => 'approved'],
//             ['id' => $id]
//         );
//         wp_redirect(admin_url('admin.php?page=therapist-registrations'));
//         exit;
//     }
// }

// // Handle rejection action
// add_action('admin_init', 'reject_registration');

// function reject_registration() {
//     if (isset($_GET['page']) && $_GET['page'] == 'reject_registration' && isset($_GET['id'])) {
//         global $wpdb;
//         $id = intval($_GET['id']);
//         $wpdb->update(
//             "{$wpdb->prefix}therapist_registration",
//             ['approval_status' => 'rejected'],
//             ['id' => $id]
//         );
//         wp_redirect(admin_url('admin.php?page=therapist-registrations'));
//         exit;
//     }
// }


