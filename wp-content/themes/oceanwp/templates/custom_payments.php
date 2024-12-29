<?php
/*
Template Name: Custom Payments
Version: 1.1
Author: Your Name
*/


	// Enable debugging for error tracking
	define('WP_DEBUG', true);
	define('WP_DEBUG_LOG', true);
	define('WP_DEBUG_DISPLAY', true);
	@ini_set('display_errors', 1);

	// Check if the user is logged in
	if (!is_user_logged_in()) {
		wp_redirect(home_url('/login/'));
		exit;
	}

	global $wpdb;
	$user = wp_get_current_user();
	$user_id = $user->ID;

	// Check if user details exist in the therapist_registration table
	$registration_table = $wpdb->prefix . 'therapist_registration';
	$user_details = $wpdb->get_row($wpdb->prepare(
		"SELECT * FROM $registration_table WHERE user_id = %d",
		$user_id
	));

	$therapist_details = $wpdb->get_row($wpdb->prepare(
		"SELECT * FROM {$wpdb->prefix}therapist_registration WHERE user_id = %d",
		$user_id
	));

	$is_school = in_array('schoolmassage', (array) $user->roles); // Assuming 'schoolmassage' is the role for schools
	$is_therapist = in_array('therapist', (array) $user->roles); // Assuming 'therapist' is the role for therapists

	$amount = 0;
	if ($is_school) {
		$amount = 10.00;
	} elseif ($is_therapist) {
		$amount = 5.00;
	} else {
		// If the user role does not match, show an error or redirect
		wp_redirect(home_url('/error/')); // Redirect to an error page or handle the error as needed
		exit;
	}

	// Fetch payment details from the database
	$table_name = $wpdb->prefix . 'payment_details';
	$payment_details = $wpdb->get_row($wpdb->prepare(
		"SELECT * FROM $table_name WHERE user_id = %d ORDER BY payment_date DESC LIMIT 1",
		$user_id
	));
?>
<?php include 'custom_navbar.php'; ?>


<style>
	body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f1f1f1;
    }
	.receipt {
		max-width: 400px;
		margin: 5vh auto 0 auto;
		
		&_hoverable {
			transition: .3s;
			box-shadow: 0 3px 10px rgba(0,0,0,.2);
			
			&:hover {
				box-shadow: 0 5px 20px rgba(0,0,0,.3);
			}
		}
	}

	.header {
		width: 100%;
	}

	.header__top {
		display: flex;
		align-items: center;
		background: white;
		width: 100%;
		border-radius: 4px 4px 0 0;
	}

	.header__logo {	
		width: 10%;
		padding: $padding * 2;
	}

    .payment-container {
        max-width: 600px;
        margin: 200px auto 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .payment-header {
        font-size: 26px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #333;
    }

    .payment-description {
        font-size: 18px;
        margin-bottom: 20px;
        color: #666;
    }

	.responsivePayPal {
		height: 66px;
		width: 600px;
		overflow: hidden;
		margin: auto;
		padding-top: 2px;
		}

	.responsivePayPal img {
		position: relative;
		top: -4px;
		left: -14px;
	}

	.header__meta {
		position: relative;
		width: 90%;
		height: 100%;
		margin-left: $padding;
		line-height: 1.7rem;
		opacity: .3;
	}

	.header__serial {
		display: block;
	}

	.header__number {
		position: absolute;
		top: $padding / 2;
		right: 0;
		transform: rotate(270deg);
		opacity: .2;	
	}

	
</style>


<div class="payment-container">
	<?php if (!$user_details) {
		// Display message if no details are found
		echo '<div class="error-message">You need to fill in your details first.</div>';
		echo '<br/> Go to <a href="' . home_url('/therapist-registration/') . '">Therapist Page</a>';
		return;
	} ?>

	
	<?php
	// Check if details are filled but not approved
	if ($therapist_details && $therapist_details->approval_status === 'pending') {
		echo '<div class="error-message">Your details are pending approval. Please wait until an admin approves them to proceed with payment.</div>';
		return;
	}

	if ($therapist_details && $therapist_details->approval_status === 'rejected') {
		echo '<div class="error-message">Admin Rejected your application .</div>';
		return;
	}

	?>
	
	<?php 
	if ($therapist_details && $therapist_details->approval_status === 'approved') {
		if ($payment_details): ?>
			<?php if ($payment_details->payment_status === 'Completed'): ?>

				<div class="receipt">
					<h1> Payment Details </h1>
					<header class="header">
						<div class="header__top">
							<div class="header__logo">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.58 30.18"><defs><style>.a{fill:#253b80;}.b{fill:#179bd7;}.c{fill:#222d65;}</style></defs><title>PayPal</title><path class="a" d="M7.27,29.15l0.52-3.32-1.16,0H1.06L4.93,1.29A0.32,0.32,0,0,1,5,1.1,0.32,0.32,0,0,1,5.24,1h9.38C17.73,1,19.88,1.67,21,3a4.39,4.39,0,0,1,1,1.92,6.92,6.92,0,0,1,0,2.64V8.27l0.53,0.3a3.69,3.69,0,0,1,1.07.81,3.78,3.78,0,0,1,.86,1.94,8.2,8.2,0,0,1-.12,2.81,9.9,9.9,0,0,1-1.15,3.18,6.55,6.55,0,0,1-1.83,2,7.4,7.4,0,0,1-2.46,1.11,12.26,12.26,0,0,1-3.07.35H15.12a2.2,2.2,0,0,0-2.17,1.85l-0.06.3L12,28.78l0,0.22a0.18,0.18,0,0,1-.06.13,0.15,0.15,0,0,1-.1,0H7.27Z"/><path class="b" d="M23,7.67h0q0,0.27-.1.55c-1.24,6.35-5.47,8.55-10.87,8.55H9.33A1.34,1.34,0,0,0,8,17.89H8L6.6,26.83,6.2,29.36a0.7,0.7,0,0,0,.7.81h4.88a1.17,1.17,0,0,0,1.16-1l0-.25,0.92-5.83L14,22.79a1.17,1.17,0,0,1,1.16-1h0.73c4.73,0,8.43-1.92,9.51-7.48,0.45-2.32.22-4.26-1-5.62A4.67,4.67,0,0,0,23,7.67Z"/><path class="c" d="M21.75,7.15L21.17,7l-0.62-.12a15.28,15.28,0,0,0-2.43-.18H10.77a1.17,1.17,0,0,0-1.16,1L8,17.6l0,0.29a1.34,1.34,0,0,1,1.32-1.13h2.75c5.4,0,9.64-2.19,10.87-8.55C23,8,23,7.85,23,7.67a6.59,6.59,0,0,0-1-.43Z"/><path class="a" d="M9.61,7.7a1.17,1.17,0,0,1,1.16-1h7.35a15.28,15.28,0,0,1,2.43.18L21.17,7l0.58,0.15L22,7.24a6.69,6.69,0,0,1,1,.43c0.37-2.35,0-3.94-1.27-5.39S17.85,0,14.62,0H5.24A1.34,1.34,0,0,0,3.92,1.13L0,25.9a0.81,0.81,0,0,0,.8.93H6.6L8,17.6Z"/></svg>
							</div>
							<div class="header__meta">
								<span class="header__date"><?php echo esc_html($payment_details->payment_date); ?></span>
								<span class="header__serial">Transaction ID: <?php echo esc_html($payment_details->transaction_id); ?></span>
								<span class="header__number"><?php echo esc_html($payment_details->transaction_id); ?></span>
							</div>
						</div>
						<h3>
							<span>Hi, <?php echo esc_html($user->display_name); ?></span>
							<span>Your payment amount details</span>
							<span></span>
						</h3>
						<div class="header__spacing"></div>
					</header>
					
					<section class="cart">
						<hr class="cart__hr" />
						<footer class="cart__total">
							<h2>Total Amount Paid</h2>
							<h2>$<?php echo esc_html($payment_details->amount); ?></h2>				
						</footer>
					</section>
				</div>

			<?php elseif ($payment_details->payment_status === 'Failed'): ?>


			<?php else: ?>

				<div class="error-message">Your payment status is unknown. Please try again.</div>
				<div class="responsivePayPal">
				<?php
					echo do_shortcode('[wp_paypal button="buynow" name="Service Payment" amount="' . esc_attr($amount) . '" button_image="http://localhost:8021/ims_backup_latest/wp-content/uploads/2024/09/paypal_img.png"]');
				?>
			</div>
			<?php endif; ?>
		<?php else: ?>
			<div class="payment-header">Complete Your Payment</div>
			<div class="payment-description">
				Thank you for choosing our service! Please complete your payment using the secure PayPal button below.
			</div>
			<div class="responsivePayPal">
				<?php
					echo do_shortcode('[wp_paypal button="buynow" name="Service Payment" amount="' . esc_attr($amount) . '" button_image="http://localhost:8021/ims_backup_latest/wp-content/uploads/2024/09/paypal_img.png"]');
				?>
			</div>
			
		<?php endif; } ?>
</div>