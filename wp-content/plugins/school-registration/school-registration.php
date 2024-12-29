<?php
/*
Plugin Name: School Registration
Description: Creates custom tables for school registration and lecturer details.
Version: 1.0
Author: Your Name
*/

// Hook to create the custom tables
register_activation_hook(__FILE__, 'create_school_tables');

function create_school_tables() {
    global $wpdb;

    // Set the table names
    $school_table = $wpdb->prefix . 'school_registration';
    $lecturer_table = $wpdb->prefix . 'school_lecturer_details';

    // Character set and collation
    $charset_collate = $wpdb->get_charset_collate();

    // SQL to create the School Registration table
    $school_sql = "CREATE TABLE $school_table (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id BIGINT(20) UNSIGNED NOT NULL,
        full_name_applicant VARCHAR(255) NOT NULL,
        company_position VARCHAR(255) NOT NULL,
        clinic_address TEXT NOT NULL,
        contact_number VARCHAR(20) NOT NULL,
        main_email VARCHAR(100) NOT NULL,
        website_address VARCHAR(255) DEFAULT NULL,
        training_facility_pictures VARCHAR(255) DEFAULT NULL,
        type_of_training TEXT DEFAULT NULL,
        method_of_delivery TEXT DEFAULT NULL,
        logo VARCHAR(255) DEFAULT NULL,
        write_up TEXT DEFAULT NULL,
        training_offered TEXT DEFAULT NULL,
        number_of_lecturers INT(11) DEFAULT 0,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES {$wpdb->prefix}users(ID) ON DELETE CASCADE
    ) $charset_collate;";

    // SQL to create the School Lecturer Details table
    $lecturer_sql = "CREATE TABLE $lecturer_table (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        school_id BIGINT(20) UNSIGNED NOT NULL,
        lecturer_name VARCHAR(255) NOT NULL,
        lecturer_previous_training TEXT DEFAULT NULL,
        subjects_they_teach TEXT DEFAULT NULL,
        logo VARCHAR(255) DEFAULT NULL,
        lecturer_previous_certification VARCHAR(255) DEFAULT NULL,
        FOREIGN KEY (school_id) REFERENCES $school_table(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    ) $charset_collate;";

    // Include the upgrade functions for dbDelta
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

    // Create the tables
    dbDelta($school_sql);
    dbDelta($lecturer_sql);
}
