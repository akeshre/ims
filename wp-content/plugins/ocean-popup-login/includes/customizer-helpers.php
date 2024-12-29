<?php
/**
 * Active callback functions for the customizer
 */

function opl_popup_login_cac_has_custom_text() {
	if ( 'custom' == get_theme_mod( 'opl_popup_login_logged_in', 'logout' ) ) {
		return true;
	} else {
		return false;
	}
}

/**
 * Check whether the Privacy Policy is published (Settings -> Privacy).
 *
 * @return bool
 */
function opl_is_privacy_policy_set() {
	$privacy_policy_page_id = (int) get_option( 'wp_page_for_privacy_policy' );

    if ( empty( $privacy_policy_page_id ) ) {
        return false;
	}

	$privacy_policy_page = get_post( $privacy_policy_page_id );

	return $privacy_policy_page instanceof WP_Post
		&& $privacy_policy_page->post_status === 'publish';
}