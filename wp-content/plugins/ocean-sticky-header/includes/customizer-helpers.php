<?php
/**
 * Active callback functions for the customizer
 */
if ( ! function_exists( 'osh_cac_has_shrink_style' ) ) {
	function osh_cac_has_shrink_style() {
		if ( 'shrink' == get_theme_mod( 'osh_sticky_header_style', 'shrink' ) ) {
			return true;
		} else {
			return false;
		}
	}
}