<?php
// Load WordPress environment to use WordPress functions and access the database
require_once( dirname(__FILE__) . '/wp-load.php' );

// Verify that this is a PayPal IPN request
if (isset($_REQUEST['txn_id'])) {
    
    // Capture PayPal IPN data from $_REQUEST
    $txn_id = isset($_REQUEST['txn_id']) ? sanitize_text_field($_REQUEST['txn_id']) : '';
    $payer_email = isset($_REQUEST['payer_email']) ? sanitize_email($_REQUEST['payer_email']) : '';
    $payment_status = isset($_REQUEST['payment_status']) ? sanitize_text_field($_REQUEST['payment_status']) : '';
    $payment_gross = isset($_REQUEST['mc_gross']) ? floatval($_REQUEST['mc_gross']) : 0.00;
    $mc_currency = isset($_REQUEST['mc_currency']) ? sanitize_text_field($_REQUEST['mc_currency']) : '';
    $payment_date = isset($_REQUEST['payment_date']) ? sanitize_text_field($_REQUEST['payment_date']) : '';
    $user_id = get_current_user_id(); // Optional, use if you want to link it to a WordPress user

    // Insert the IPN data into the custom payment log table in WordPress database
    global $wpdb;
    $table_name = $wpdb->prefix . 'payment_details';
    
    $wpdb->insert(
        $table_name,
        array(
            'user_id' => $user_id, // Use if linked to a user
            'transaction_id' => $txn_id,
            'amount' => $payment_gross,
            'currency' => $mc_currency,
            'payment_status' => $payment_status,
            'payer_email' => $payer_email,
            'payment_date' => $payment_date,
        ),
        array(
            '%d', // user_id
            '%s', // transaction_id
            '%f', // amount
            '%s', // currency
            '%s', // payment_status
            '%s', // payer_email
            '%s', // payment_date
        )
    );
    
    // Optionally: Redirect the user to a confirmation or thank you page after successful logging
    wp_redirect(home_url('/payments/'));
    exit;

}
?>
