<?php
// PayPal IPN Listener

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Step 1: Read IPN data sent from PayPal
$raw_post_data = file_get_contents('php://input');
$raw_post_array = explode('&', $raw_post_data);
$myPost = array();
foreach ($raw_post_array as $keyval) {
    $keyval = explode('=', $keyval);
    if (count($keyval) == 2) {
        $myPost[$keyval[0]] = urldecode($keyval[1]);
    }
}

// Step 2: Prepare IPN validation request
$req = 'cmd=_notify-validate';
foreach ($myPost as $key => $value) {
    $value = urlencode($value);
    $req .= "&$key=$value";
}

// Step 3: Send the data back to PayPal for validation
// $paypal_url = "https://ipnpb.paypal.com/cgi-bin/webscr"; // For live transactions
$paypal_url = "https://ipnpb.sandbox.paypal.com/cgi-bin/webscr"; // For sandbox transactions

$ch = curl_init($paypal_url);
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: Close'));

// Step 4: Get the response from PayPal
$response = curl_exec($ch);
if (!$response) {
    // Log cURL error if it fails
    error_log('cURL error: ' . curl_error($ch));
    curl_close($ch);
    exit;
}
curl_close($ch);

// Step 5: Check if PayPal response is VERIFIED
if (strcmp($response, "VERIFIED") == 0) {
    // IPN was verified, process the payment
    global $wpdb;
    $table_name = $wpdb->prefix . 'payment_details';

    $user_id = isset($myPost['custom']) ? sanitize_text_field($myPost['custom']) : 0;
    $transaction_id = sanitize_text_field($myPost['txn_id']);
    $amount = floatval($myPost['mc_gross']);
    $currency = sanitize_text_field($myPost['mc_currency']);
    $payment_status = sanitize_text_field($myPost['payment_status']);
    $payment_date = isset($myPost['payment_date']) ? date('Y-m-d H:i:s', strtotime($myPost['payment_date'])) : current_time('mysql');

    // Insert payment details into the database
    $wpdb->insert(
        $table_name,
        array(
            'user_id' => $user_id,
            'transaction_id' => $transaction_id,
            'amount' => $amount,
            'currency' => $currency,
            'payment_status' => $payment_status,
            'payment_date' => $payment_date,
        )
    );

    // Optional: Log payment for debugging
    error_log('Payment Verified and Processed: ' . print_r($myPost, true));

} elseif (strcmp($response, "INVALID") == 0) {
    // IPN validation failed, log for review
    error_log('Invalid IPN: ' . print_r($myPost, true));
}
?>
