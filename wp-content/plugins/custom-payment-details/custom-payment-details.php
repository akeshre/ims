<?php
/*
Plugin Name: Custom Payment Details
Description: Adds a custom admin menu to display payment details.
Version: 1.0
Author: Your Name
*/

add_action('admin_menu', 'custom_payment_menu');

function custom_payment_menu() { 
   add_menu_page( 
       'Payment Details',           // Page title
       'Payments',                  // Menu title
       'manage_options',            // Capability required to view the page
       'payment-details',           // Menu slug
       'display_payment_details',   // Callback function to render the page
       'dashicons-media-spreadsheet' // Icon
   );
}

function display_payment_details() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'payment_details';

    // Fetch the payment details from the database
    $results = $wpdb->get_results("SELECT * FROM $table_name");

    if ($results) {
        echo '<h1>Payment Details</h1>';
        echo '<table class="wp-list-table widefat fixed striped">';
        echo '<thead><tr>';
        echo '<th>ID</th>';
        echo '<th>User ID</th>';
        echo '<th>Transaction ID</th>';
        echo '<th>Amount</th>';
        echo '<th>Currency</th>';
        echo '<th>Payment Status</th>';
        echo '<th>Payer Email</th>';
        echo '<th>Payment Date</th>';
        echo '</tr></thead><tbody>';

        foreach ($results as $row) {
            echo '<tr>';
            echo '<td>' . esc_html($row->id) . '</td>';
            echo '<td>' . esc_html($row->user_id) . '</td>';
            echo '<td>' . esc_html($row->transaction_id) . '</td>';
            echo '<td>' . esc_html($row->amount) . '</td>';
            echo '<td>' . esc_html($row->currency) . '</td>';
            echo '<td>' . esc_html($row->payment_status) . '</td>';
            echo '<td>' . esc_html($row->payer_email) . '</td>';
            echo '<td>' . esc_html($row->payment_date) . '</td>';
            echo '</tr>';
        }

        echo '</tbody></table>';
    } else {
        echo '<p>No payment details found.</p>';
    }
}
