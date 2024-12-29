<?php

class LoginLimit {

	protected $opt;

	function __construct() {
		$number_of_attempts = get_theme_mod( 'opl_popup_number_of_attempts', '3' );
		$minutes_to_block = get_theme_mod( 'opl_popup_minutes_to_block', '30' );
		$this->opt = (object) array(
			// time to reset blocking. 3600 = 1 hour.
			'lock_sec' => $minutes_to_block*60, // 30 minutes.

			// Number of login attempts.
			'lock_num' => $number_of_attempts,
		);

		add_filter( 'authenticate', array( $this, 'check_attempted_login' ), 30, 3 );
		add_action( 'wp_login_failed', array( $this, 'login_failed' ), 10, 1 );
		add_action( 'lost_password', array( $this, 'lost_password' ), 1, 1 );
		// transfer to ocean-popup-login.php
		// add_action( 'init', array( $this, 'set_limit_control_cookie' ) );
	}


	function set_limit_control_cookie() {
		$identify = wp_generate_uuid4();
		if ( empty( $_COOKIE['limit-control'] ) ) {
			setcookie( 'limit-control', $identify, 0, '/' );
		}
	}

	function secToArray($secs)
	{
		$res = array();
		
		$res['days'] = floor($secs / 86400);
		$secs = $secs % 86400;
		
		$res['hours'] = floor($secs / 3600);
		$secs = $secs % 3600;
	 
		$res['minutes'] = floor($secs / 60);
		$res['secs'] = $secs % 60;
	 
		return $res;
	}

	function check_attempted_login( $user, $username, $password ) {
		$action = @$_GET['action'];
		if ( ! in_array( $action, array( 'postpass', 'logout', 'lostpassword', 'retrievepassword', 'resetpass', 'rp', 'register', 'login' ), true ) ) {
			$action = 'login';
		}

		$transient_key = $_COOKIE['limit-control'];

		if ( ! empty( $transient_key ) ) {

			$data = get_transient( $transient_key );

			if ( ! empty( $data['tried'] ) && $data['tried'] >= $this->opt->lock_num ) {
				$last_access_time = $data['last_time'];

				if ( ( $last_access_time + $this->opt->lock_sec ) > current_time( 'timestamp' ) ) {
					$estimate_time = $last_access_time + $this->opt->lock_sec;
					$current_time = current_time( 'timestamp' );
					$leave_time_data = $this->secToArray( ( $estimate_time - $current_time ) );
					$leave_time_message = '';
					if( ! empty( $leave_time_data['hours'] ) ) {
						$leave_time_message .= $leave_time_data['hours'] . ' h ';
					}
					if( ! empty( $leave_time_data['minutes'] ) ) {
						$leave_time_message .= $leave_time_data['minutes'] . ' m ';
					}
					if( ! empty( $leave_time_data['secs'] ) ) {
						$leave_time_message .= $leave_time_data['secs'] . ' sec';
					}
					return new WP_Error( 'too_many_tried', sprintf( __( '<strong>ERROR</strong>: You have reached authentication limit, you will be able to try again later (%s).' ), $leave_time_message) );
				}
			}
		}

		return $user;
	}


	function login_failed( $username ) {
		$action = @$_GET['action'];
		if ( ! in_array( $action, array( 'postpass', 'logout', 'lostpassword', 'retrievepassword', 'resetpass', 'rp', 'register', 'login' ), true ) ) {
			$action = 'login';
		}

		$transient_key = $_COOKIE['limit-control'];
		if ( ! empty( $transient_key ) ) {

			$transient_data = get_transient( $transient_key );
			if ( ! empty( $transient_data ) ) {

				$transient_data['tried']++;
				$transient_data['last_time'] = current_time( 'timestamp' );

				if ( $transient_data['tried'] <= $this->opt->lock_num ) {
					set_transient( $transient_key, $transient_data, $this->opt->lock_sec );
				}
			} else {
				$transient_data = array(
					'tried'     => 1,
					'last_time' => current_time( 'timestamp' ),
				);
				set_transient( $transient_key, $transient_data, $this->opt->lock_sec );
			}
		}
	}

	function lost_password( $errors ) {
		if ( is_wp_error( $errors ) ) {
			$action = @$_GET['action'];
			if ( ! in_array( $action, array( 'postpass', 'logout', 'lostpassword', 'retrievepassword', 'resetpass', 'rp', 'register', 'login' ), true ) ) {
				$action = 'login';
			}
			$transient_key = $_COOKIE['limit-control'];
			if ( ! empty( $transient_key ) ) {

				$transient_data = get_transient( $transient_key );
				if ( ! empty( $transient_data ) ) {

					$transient_data['tried']++;
					$transient_data['last_time'] = current_time( 'timestamp' );

					if ( $transient_data['tried'] <= $this->opt->lock_num ) {
						set_transient( $transient_key, $transient_data, $this->opt->lock_sec );
					} else {

						$last_access_time = $transient_data['last_time'];

						if ( ( $last_access_time + $this->opt->lock_sec ) > current_time( 'timestamp' ) ) {
							$errors->add( 'too_many_tried', __( '<strong>Error</strong>: You have reached authentication limit, you will be able to try again in 30 minutes.' ) );
						}
					}
				} else {
					$transient_data = array(
						'tried'     => 1,
						'last_time' => current_time( 'timestamp' ),
					);
					set_transient( $transient_key, $transient_data, $this->opt->lock_sec );
				}
			}
		}
	}
}

new LoginLimit();
