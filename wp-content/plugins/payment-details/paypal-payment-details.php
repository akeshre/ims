<?php
/*
Plugin Name: Payment Details Plugin
Description: Handles PayPal payment details and stores them in a custom table.
Version: 1.0
Author: Your Name
*/


function create_payment_log_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'payment_details';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        user_id bigint(20) NOT NULL,
        transaction_id varchar(255) NOT NULL,
        amount decimal(10, 2) NOT NULL,
        currency varchar(10) NOT NULL,
        payment_status varchar(50) NOT NULL,
        payer_email varchar(255) NOT NULL,
        payment_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
register_activation_hook(__FILE__, 'create_payment_log_table');

?>
