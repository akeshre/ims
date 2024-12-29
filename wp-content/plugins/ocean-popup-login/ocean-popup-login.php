<?php
/**
 * Plugin Name:         Ocean Popup Login
 * Plugin URI:          https://oceanwp.org/extension/ocean-popup-login/
 * Description:         Add user login, registration and lost password forms as a popup to your website. Simple, effective and out of the box solution.
 * Version:             2.1.8
 * Update URI: https://api.freemius.com
 * Author:              OceanWP
 * Author URI:          https://oceanwp.org/
 * Requires at least:   5.6
 * Tested up to:        6.5.3
 *
 * Text Domain: ocean-popup-login
 * Domain Path: /languages
 *
 * @package Ocean_Popup_Login
 * @category Core
 * @author OceanWP
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns the main instance of Ocean_Popup_Login to prevent the need to use globals.
 *
 * @since  1.0.0
 * @return object Ocean_Popup_Login
 */
function Ocean_Popup_Login() {
	return Ocean_Popup_Login::instance();
} // End Ocean_Popup_Login()

Ocean_Popup_Login();

/**
 * Main Ocean_Popup_Login Class
 *
 * @class Ocean_Popup_Login
 * @version 1.0.0
 * @since 1.0.0
 * @package Ocean_Popup_Login
 */
final class Ocean_Popup_Login {
	/**
	 * Ocean_Popup_Login The single instance of Ocean_Popup_Login.
	 *
	 * @var     object
	 * @access  private
	 * @since   1.0.0
	 */
	private static $_instance = null;

	/**
	 * The token.
	 *
	 * @var     string
	 * @access  public
	 * @since   1.0.0
	 */
	public $token;

	/**
	 * The version number.
	 *
	 * @var     string
	 * @access  public
	 * @since   1.0.0
	 */
	public $version;

	/**
	 * The plugin url.
	 *
	 * @var     string
	 * @access  public
	 */
	public $plugin_url;

	/**
	 * The plugin path.
	 *
	 * @var     string
	 * @access  public
	 */
	public $plugin_path;

	/**
	 * The plugin data.
	 *
	 * @var     array
	 * @access  public
	 */
	public $plugin_data;

	// Admin - Start
	/**
	 * The admin object.
	 *
	 * @var     object
	 * @access  public
	 * @since   1.0.0
	 */
	public $admin;

	/**
	 * Constructor function.
	 *
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function __construct() {
		$this->token       = 'ocean-popup-login';
		$this->plugin_url  = plugin_dir_url( __FILE__ );
		$this->plugin_path = plugin_dir_path( __FILE__ );
		$this->plugin_data = get_file_data( __FILE__, array( 'Version' => 'Version' ), false );
		$this->version     = $this->plugin_data['Version'];

		define( 'OPL_URL', $this->plugin_url );
		define( 'OPL_PATH', $this->plugin_path );

		register_activation_hook( __FILE__, array( $this, 'install' ) );

		add_action( 'init', array( $this, 'load_plugin_textdomain' ) );

		add_filter( 'ocean_register_tm_strings', array( $this, 'register_tm_strings' ) );

		add_shortcode( 'oceanwp_popup_login', array( $this, 'popup_shortcode' ) );
	}

	// Init setup
	public function init() {
		$enable_attempts_blocking = get_theme_mod( 'opl_popup_enable_attempts_blocking', false );
		if ( true === $enable_attempts_blocking ) {
			add_action( 'init', array( $this, 'set_limit_control_cookie' ) );
		}
		add_action( 'init', array( $this, 'setup' ) );
	}

	public function set_limit_control_cookie() {
		$identify = wp_generate_uuid4();
		if ( empty( $_COOKIE['limit-control'] ) ) {
			setcookie( 'limit-control', $identify, 0, '/' );
		}
	}

	/**
	 * Main Ocean_Popup_Login Instance
	 *
	 * Ensures only one instance of Ocean_Popup_Login is loaded or can be loaded.
	 *
	 * @since 1.0.0
	 * @static
	 * @see Ocean_Popup_Login()
	 * @return Main Ocean_Popup_Login instance
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	} // End instance()

	/**
	 * Load the localisation file.
	 *
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function load_plugin_textdomain() {
		load_plugin_textdomain( 'ocean-popup-login', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	}

	/**
	 * Cloning is forbidden.
	 *
	 * @since 1.0.0
	 */
	public function __clone() {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?' ), '1.0.0' );
	}

	/**
	 * Unserializing instances of this class is forbidden.
	 *
	 * @since 1.0.0
	 */
	public function __wakeup() {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?' ), '1.0.0' );
	}

	/**
	 * Installation.
	 * Runs on activation. Logs the version number and assigns a notice message to a WordPress option.
	 *
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function install() {
		$this->_log_version_number();
	}

	/**
	 * Log the plugin version number.
	 *
	 * @access  private
	 * @since   1.0.0
	 * @return  void
	 */
	private function _log_version_number() {
		// Log the version number.
		update_option( $this->token . '-version', $this->version );
	}

	/**
	 * Register translation strings
	 */
	public static function register_tm_strings( $strings ) {

		$strings['opl_popup_login_text_title']           = esc_html__( 'Log in', 'ocean-popup-login' );
		$strings['opl_popup_login_text_content']         = esc_html__( 'Become a part of our community!', 'ocean-popup-login' );
		$strings['opl_popup_register_text_title']        = esc_html__( 'Log in', 'ocean-popup-login' );
		$strings['opl_popup_register_text_content']      = esc_html__( 'Become a part of our community!', 'ocean-popup-login' );
		$strings['opl_popup_lost_password_text_title']   = esc_html__( 'Log in', 'ocean-popup-login' );
		$strings['opl_popup_lost_password_text_content'] = esc_html__( 'Become a part of our community!', 'ocean-popup-login' );

		return $strings;

	}

	/**
	 * Setup all the things.
	 * Only executes if OceanWP or a child theme using OceanWP as a parent is active and the extension specific filter returns true.
	 *
	 * @return void
	 */
	public function setup() {
		$theme = wp_get_theme();

		if ( 'OceanWP' == $theme->name || 'oceanwp' == $theme->template ) {
			add_action( 'customize_register', array( $this, 'customizer_options' ) );
			add_action( 'wp_nav_menu_items', array( $this, 'login_link' ), 9, 2 );
			add_action( 'wp_footer', array( $this, 'login_form' ) );
			add_action( 'wp_ajax_nopriv_opl_login_member', array( $this, 'login_member' ) );
			add_action( 'wp_ajax_nopriv_opl_register_member', array( $this, 'register_member' ) );
			add_action( 'wp_ajax_nopriv_opl_reset_password', array( $this, 'reset_password' ) );
			add_action( 'ocean_primary_backgrounds', array( $this, 'primary_background' ) );
			add_action( 'ocean_hover_primary_backgrounds', array( $this, 'hover_primary_background' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ), 999 );
			add_filter( 'ocean_localize_array', array( $this, 'localize_array' ) );
			add_filter( 'ocean_head_css', array( $this, 'head_css' ) );
			add_filter( 'oe_theme_panels', array( $this, 'oe_theme_panels' ) );

			// If WordPress Social Login enabled
			add_action( 'opl_wp_social_login', 'wsl_action_wordpress_social_login' );
			add_action( 'opl_wp_social_register', 'wsl_action_wordpress_social_login' );

			$enable_attempts_blocking = get_theme_mod( 'opl_popup_enable_attempts_blocking', false );
			if ( true === $enable_attempts_blocking ) {
				require_once OPL_PATH . 'includes/login-limit.php';
			}
		}
	}

	/**
	 * Customizer options
	 *
	 * @since 1.0.0
	 */
	public static function customizer_options( $wp_customize ) {

		if ( OCEAN_EXTRA_ACTIVE
			&& class_exists( 'Ocean_Extra_Theme_Panel' ) ) {

			if ( empty( Ocean_Extra_Theme_Panel::get_setting( 'ocean_popup_login_panel' ) ) ) {
				return false;
			}
		}

		// Helpers functions
		require_once OPL_PATH . 'includes/customizer-helpers.php';

		/**
		 * Section
		 */
		$wp_customize->add_section(
			'opl_popup_login',
			array(
				'title'    => esc_html__( 'Popup Login', 'ocean-popup-login' ),
				'priority' => 210,
			)
		);

		/**
		 * Popup Position
		 */
		$wp_customize->add_setting(
			'opl_popup_login_position',
			array(
				'transport'         => 'postMessage',
				'default'           => 'menu',
				'sanitize_callback' => 'oceanwp_sanitize_select',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Buttonset_Control(
				$wp_customize,
				'opl_popup_login_position',
				array(
					'label'       => esc_html__( 'Position', 'ocean-popup-login' ),
					'description' => esc_html__( 'If you choose Manual, check this documentation: https://docs.oceanwp.org/article/499-how-to-show-popup-login-link', 'ocean-popup-login' ),
					'section'     => 'opl_popup_login',
					'settings'    => 'opl_popup_login_position',
					'priority'    => 10,
					'choices'     => array(
						'menu'   => esc_html__( 'Menu', 'ocean-popup-login' ),
						'manual' => esc_html__( 'Manual', 'ocean-popup-login' ),
					),
				)
			)
		);

		/**
		 * Logged in
		 */
		$wp_customize->add_setting(
			'opl_popup_login_logged_in',
			array(
				'default'           => 'logout',
				'sanitize_callback' => array( 'Ocean_Popup_Login', 'opl_popup_login_sanitize_logged_in' ),
			)
		);

		$wp_customize->add_control(
			'opl_popup_login_logged_in',
			array(
				'label'       => esc_html__( 'Logged In', 'ocean-popup-login' ),
				'description' => esc_html__( 'Display this when user logged in.', 'ocean-popup-login' ),
				'section'     => 'opl_popup_login',
				'priority'    => 10,
				'type'        => 'radio',
				'choices'     => array(
					'nothing' => esc_html__( 'Display nothing', 'ocean-popup-login' ),
					'logout'  => esc_html__( 'Logout link', 'ocean-popup-login' ),
					'custom'  => esc_html__( 'Custom', 'ocean-popup-login' ),
				),
			)
		);

		/**
		 * Custom text
		 */
		$wp_customize->add_setting(
			'opl_popup_login_logged_in_custom',
			array(
				'default'           => '',
				'transport'         => 'refresh',
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			'opl_popup_login_logged_in_custom',
			array(
				'label'           => esc_html__( 'Custom Text', 'ocean-popup-login' ),
				'section'         => 'opl_popup_login',
				'priority'        => 10,
				'type'            => 'textarea',
				'active_callback' => 'opl_popup_login_cac_has_custom_text',
			)
		);

		/**
		 * Login text
		 */
		$wp_customize->add_setting(
			'opl_popup_login_text',
			array(
				'default'           => esc_html__( 'Sign in / Join', 'ocean-popup-login' ),
				'transport'         => 'postMessage',
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			'opl_popup_login_text',
			array(
				'label'    => esc_html__( 'Login Text', 'ocean-popup-login' ),
				'section'  => 'opl_popup_login',
				'priority' => 10,
				'type'     => 'text',
			)
		);

		/**
		 * Logout text
		 */
		$wp_customize->add_setting(
			'opl_popup_logout_text',
			array(
				'default'           => esc_html__( 'Logout', 'ocean-popup-login' ),
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			'opl_popup_logout_text',
			array(
				'label'    => esc_html__( 'Logout Text', 'ocean-popup-login' ),
				'section'  => 'opl_popup_login',
				'priority' => 10,
				'type'     => 'text',
			)
		);

		/**
		 * Logout url
		 */
		$wp_customize->add_setting(
			'opl_popup_logout_url',
			array(
				'transport'         => 'postMessage',
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			'opl_popup_logout_url',
			array(
				'label'    => esc_html__( 'Logout URL', 'ocean-popup-login' ),
				'section'  => 'opl_popup_login',
				'priority' => 10,
				'type'     => 'text',
			)
		);

		/**
		 * Login Form Heading
		 */
		$wp_customize->add_setting(
			'opl_popup_login_heading',
			array(
				'sanitize_callback' => 'wp_kses',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Heading_Control(
				$wp_customize,
				'opl_popup_login_heading',
				array(
					'label'    => esc_html__( 'Login Form', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Title Text
		 */
		$wp_customize->add_setting(
			'opl_popup_login_text_title',
			array(
				'default'           => esc_html__( 'Log in', 'ocean-popup-login' ),
				'transport'         => 'postMessage',
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_login_text_title',
				array(
					'label'    => esc_html__( 'Title', 'ocean-popup-login' ),
					'type'     => 'text',
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Description Text
		 */
		$wp_customize->add_setting(
			'opl_popup_login_text_content',
			array(
				'default'           => esc_html__( 'Become a part of our community!', 'ocean-popup-login' ),
				'transport'         => 'postMessage',
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_login_text_content',
				array(
					'label'    => esc_html__( 'Content', 'ocean-popup-login' ),
					'type'     => 'textarea',
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Redirect After Login
		 */
		$wp_customize->add_setting(
			'opl_popup_login_redirect',
			array(
				'transport'         => 'postMessage',
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_login_redirect',
				array(
					'label'       => esc_html__( 'Redirect After Login', 'ocean-popup-login' ),
					'description' => esc_html__( 'Add your URL here if you want to redirect after login.', 'ocean-popup-login' ),
					'type'        => 'text',
					'section'     => 'opl_popup_login',
					'priority'    => 10,
				)
			)
		);

		/**
		 * Show/Hide Remember Me login option
		 */
		$wp_customize->add_setting(
			'opl_popup_hide_remember_me',
			array(
				'default'           => false,
				'sanitize_callback' => 'oceanwp_sanitize_checkbox',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_hide_remember_me',
				array(
					'label'    => esc_html__( 'Hide the Remember Me option?', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'type'     => 'checkbox',
					'priority' => 10,
				)
			)
		);

		/**
		 * Register Form Heading
		 */
		$wp_customize->add_setting(
			'opl_popup_register_heading',
			array(
				'sanitize_callback' => 'wp_kses',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Heading_Control(
				$wp_customize,
				'opl_popup_register_heading',
				array(
					'label'    => esc_html__( 'Register Form', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Title Text
		 */
		$wp_customize->add_setting(
			'opl_popup_register_text_title',
			array(
				'default'           => esc_html__( 'Create an account', 'ocean-popup-login' ),
				'transport'         => 'postMessage',
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_register_text_title',
				array(
					'label'    => esc_html__( 'Title', 'ocean-popup-login' ),
					'type'     => 'text',
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Description Text
		 */
		$wp_customize->add_setting(
			'opl_popup_register_text_content',
			array(
				'default'           => esc_html__( 'Welcome! Register for an account', 'ocean-popup-login' ),
				'transport'         => 'postMessage',
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_register_text_content',
				array(
					'label'    => esc_html__( 'Content', 'ocean-popup-login' ),
					'type'     => 'textarea',
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Registration Agreement Text
		 */
		$default_registration_agreement_text = 'I have read and agree with the <a href="' . get_permalink( get_option( 'wp_page_for_privacy_policy' ) ) . '">Privacy Policy/Terms and Conditions</a>';

		$wp_customize->add_setting(
			'opl_popup_registration_agreement_text',
			array(
				'default'           => esc_html__( $default_registration_agreement_text, 'ocean-popup-login' ),
				'transport'         => 'postMessage',
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_registration_agreement_text',
				array(
					'label'       => __( 'User agreement prompt', 'ocean-popup-login' ),
					'description' => opl_is_privacy_policy_set()
									   ? __( 'If Require Agreement is checked, new users will be required to check an agreement box in order to complete their registration', 'ocean-popup-login' )
									   : __( 'Please publish the Privacy Policy (see Settings -> Privacy) to enable this feature.', 'ocean-popup-login' ),
					'type'        => 'textarea',
					'section'     => 'opl_popup_login',
					'priority'    => 10,
				)
			)
		);

		/**
		 * Registration Agreement Toggle
		 */
		$wp_customize->add_setting(
			'opl_popup_registration_agreement_toggle',
			array(
				'default'           => false,
				'sanitize_callback' => 'oceanwp_sanitize_checkbox',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_registration_agreement_toggle',
				array(
					'label'           => esc_html__( 'Require agreement', 'ocean-popup-login' ),
					'section'         => 'opl_popup_login',
					'type'            => 'checkbox',
					'active_callback' => 'opl_is_privacy_policy_set',
				)
			)
		);

		/**
		 * Redirect After Registration
		 */
		$wp_customize->add_setting(
			'opl_popup_register_redirect',
			array(
				'transport'         => 'postMessage',
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_register_redirect',
				array(
					'label'       => esc_html__( 'Redirect After Registration', 'ocean-popup-login' ),
					'description' => esc_html__( 'Add your URL here if you want to redirect after registration.', 'ocean-popup-login' ),
					'type'        => 'text',
					'section'     => 'opl_popup_login',
					'priority'    => 10,
				)
			)
		);

		/**
		 * Username Security Options Heading
		 */
		$wp_customize->add_setting(
			'opl_popup_username_security_heading',
			array(
				'sanitize_callback' => 'wp_kses',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Heading_Control(
				$wp_customize,
				'opl_popup_username_security_heading',
				array(
					'label'    => esc_html__( 'Username Security Options', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/*
		* User username enable limit
		*/
		$wp_customize->add_setting(
			'opl_popup_username_enable_limit',
			array(
				'default'           => false,
				'sanitize_callback' => 'oceanwp_sanitize_checkbox',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_username_enable_limit',
				array(
					'label'    => esc_html__( 'User username enable limit', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'type'     => 'checkbox',
					'priority' => 10,
				)
			)
		);

		// Min username length
		$wp_customize->add_setting(
			'opl_popup_username_min_length',
			array(
				'default'           => 6,
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_username_min_length',
				array(
					'label'       => esc_html__( 'Min username length', 'ocean-popup-login' ),
					'type'        => 'number',
					'section'     => 'opl_popup_login',
					'settings'    => 'opl_popup_username_min_length',
					'priority'    => 10,
					'input_attrs' => array(
						'min'  => 2,
						'max'  => 100,
						'step' => 1,
					),
				)
			)
		);

		// Max username length
		$wp_customize->add_setting(
			'opl_popup_username_max_length',
			array(
				'default'           => 15,
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_username_max_length',
				array(
					'label'       => esc_html__( 'Max username length', 'ocean-popup-login' ),
					'type'        => 'number',
					'section'     => 'opl_popup_login',
					'settings'    => 'opl_popup_username_max_length',
					'priority'    => 10,
					'input_attrs' => array(
						'min'  => 2,
						'max'  => 100,
						'step' => 1,
					),
				)
			)
		);

		/*
		* User username forbid spaces
		*/
		$wp_customize->add_setting(
			'opl_popup_username_forbid_spaces',
			array(
				'default'           => false,
				'sanitize_callback' => 'oceanwp_sanitize_checkbox',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_username_forbid_spaces',
				array(
					'label'    => esc_html__( 'User username forbid spaces', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'type'     => 'checkbox',
					'priority' => 10,
				)
			)
		);

		/**
		 * Forbidden words for username
		 */
		$wp_customize->add_setting(
			'opl_popup_username_words_forbidden',
			array(
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_username_words_forbidden',
				array(
					'label'       => esc_html__( 'Forbidden words for username', 'ocean-popup-login' ),
					'description' => esc_html__( 'Separate with comma only. Do not use spaces. Example: admin,administrator,webmaster', 'ocean-popup-login' ),
					'type'        => 'text',
					'section'     => 'opl_popup_login',
					'priority'    => 10,
				)
			)
		);

				/**
		 * Security Method Heading
		 */
		$wp_customize->add_setting(
			'opl_popup_recaptcha_heading',
			array(
				'sanitize_callback' => 'wp_kses',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Heading_Control(
				$wp_customize,
				'opl_popup_recaptcha_heading',
				array(
					'label'    => esc_html__( 'Security Method', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		* Enable reCAPTCHA
		*/
		$wp_customize->add_setting(
			'opl_popup_recaptcha_enable',
			array(
				'default'           => false,
				'sanitize_callback' => 'oceanwp_sanitize_checkbox',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_recaptcha_enable',
				array(
					'label'    => esc_html__( 'Enable reCAPTCHA', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'type'     => 'checkbox',
					'priority' => 10,
				)
			)
		);

		/*
		* Enable nonce
		*/
		$wp_customize->add_setting(
			'opl_popup_nonce_enable',
			array(
				'default'           => true,
				'sanitize_callback' => 'oceanwp_sanitize_checkbox',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_nonce_enable',
				array(
					'label'    => esc_html__( 'Enable nonce', 'ocean-popup-login' ),
					'description' => esc_html__( 'Use only one security method. By default, the nonce security method is sufficient for protection. If you experience issues with this method caused by your caching plugin (Session token expired), you can use the Google reCaptcha method instead.', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'type'     => 'checkbox',
					'priority' => 10,
				)
			)
		);

		/**
		 * Password Security Options Heading
		 */
		$wp_customize->add_setting(
			'opl_popup_security_heading',
			array(
				'sanitize_callback' => 'wp_kses',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Heading_Control(
				$wp_customize,
				'opl_popup_security_heading',
				array(
					'label'    => esc_html__( 'Password Security Options', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Enforce password length on registration.
		 */
		$wp_customize->add_setting(
			'opl_popup_enforce_secure_password',
			array(
				'default'           => false,
				'sanitize_callback' => 'oceanwp_sanitize_checkbox',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_enforce_secure_password',
				array(
					'label'       => esc_html__( 'Enforce Secure Password Usage', 'ocean-popup-login' ),
					'description' => esc_html__( 'When enabled, users will be opted to use passwords between 8 and 50 characters long.', 'ocean-popup-login' ),
					'section'     => 'opl_popup_login',
					'type'        => 'checkbox',
					'priority'    => 10,
				)
			)
		);

		/*
		* User passwords must contain numbers.
		*/
		$wp_customize->add_setting(
			'opl_popup_enforce_number_password',
			array(
				'default'           => false,
				'sanitize_callback' => 'oceanwp_sanitize_checkbox',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_enforce_number_password',
				array(
					'label'       => esc_html__( 'Passwords must contain digits', 'ocean-popup-login' ),
					'description' => esc_html__( 'When enabled, users will be forced to insert at least one digit into the password.', 'ocean-popup-login' ),
					'section'     => 'opl_popup_login',
					'type'        => 'checkbox',
					'priority'    => 10,
				)
			)
		);

		/*
		* User passwords must contain small letters
		*/
		$wp_customize->add_setting(
			'opl_popup_enforce_smalll_password',
			array(
				'default'           => false,
				'sanitize_callback' => 'oceanwp_sanitize_checkbox',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_enforce_smalll_password',
				array(
					'label'       => esc_html__( 'Passwords must contain small letters', 'ocean-popup-login' ),
					'description' => esc_html__( 'When enabled, users will be forced to insert at least one small letter into the password.', 'ocean-popup-login' ),
					'section'     => 'opl_popup_login',
					'type'        => 'checkbox',
					'priority'    => 10,
				)
			)
		);

		/*
		* User passwords must contain capital letters
		*/
		$wp_customize->add_setting(
			'opl_popup_enforce_capsl_password',
			array(
				'default'           => false,
				'sanitize_callback' => 'oceanwp_sanitize_checkbox',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_enforce_capsl_password',
				array(
					'label'       => esc_html__( 'Passwords must contain capital letters', 'ocean-popup-login' ),
					'description' => esc_html__( 'When enabled, users will be forced to insert at least one capital letter into the password.', 'ocean-popup-login' ),
					'section'     => 'opl_popup_login',
					'type'        => 'checkbox',
					'priority'    => 10,
				)
			)
		);

		/*
		* User passwords must contain symbols
		*/
		$wp_customize->add_setting(
			'opl_popup_enforce_specch_password',
			array(
				'default'           => false,
				'sanitize_callback' => 'oceanwp_sanitize_checkbox',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_enforce_specch_password',
				array(
					'label'       => esc_html__( 'Passwords must contain symbols', 'ocean-popup-login' ),
					'description' => esc_html__( 'When enabled, users will be forced to insert at least one special character into the password.', 'ocean-popup-login' ),
					'section'     => 'opl_popup_login',
					'type'        => 'checkbox',
					'priority'    => 10,
				)
			)
		);


		/**
		 * Blocking Options Heading
		 */
		$wp_customize->add_setting(
			'opl_popup_blocking_heading',
			array(
				'sanitize_callback' => 'wp_kses',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Heading_Control(
				$wp_customize,
				'opl_popup_blocking_heading',
				array(
					'label'    => esc_html__( 'Blocking Options', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Enable Attempts Blocking.
		 */
		$wp_customize->add_setting(
			'opl_popup_enable_attempts_blocking',
			array(
				'default'           => false,
				'sanitize_callback' => 'oceanwp_sanitize_checkbox',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_enable_attempts_blocking',
				array(
					'label'       => esc_html__( 'Enable Attempts Blocking', 'ocean-popup-login' ),
					'description' => esc_html__( 'When enabled, users will be blocked if entered invalid credentials several times.', 'ocean-popup-login' ),
					'section'     => 'opl_popup_login',
					'type'        => 'checkbox',
					'priority'    => 10,
				)
			)
		);

		$wp_customize->add_setting(
			'opl_popup_number_of_attempts',
			array(
				'default'           => 3,
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_number_of_attempts',
				array(
					'label'       => esc_html__( 'Number of Invalid Attempts', 'ocean-popup-login' ),
					'type'        => 'number',
					'section'     => 'opl_popup_login',
					'settings'    => 'opl_popup_number_of_attempts',
					'priority'    => 10,
					'input_attrs' => array(
						'min'  => 0,
						'max'  => 100,
						'step' => 1,
					),
				)
			)
		);

		$wp_customize->add_setting(
			'opl_popup_minutes_to_block',
			array(
				'default'           => 30,
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_minutes_to_block',
				array(
					'label'       => esc_html__( 'Minutes to be blocked', 'ocean-popup-login' ),
					'type'        => 'number',
					'section'     => 'opl_popup_login',
					'settings'    => 'opl_popup_minutes_to_block',
					'priority'    => 10,
					'input_attrs' => array(
						'min'  => 0,
						'max'  => 1000,
						'step' => 1,
					),
				)
			)
		);

		/**
		 * Lost Password Form Heading
		 */
		$wp_customize->add_setting(
			'opl_popup_lost_password_heading',
			array(
				'sanitize_callback' => 'wp_kses',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Heading_Control(
				$wp_customize,
				'opl_popup_lost_password_heading',
				array(
					'label'    => esc_html__( 'Lost Password Form', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Title Text
		 */
		$wp_customize->add_setting(
			'opl_popup_lost_password_text_title',
			array(
				'default'           => esc_html__( 'Reset password', 'ocean-popup-login' ),
				'transport'         => 'postMessage',
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_lost_password_text_title',
				array(
					'label'    => esc_html__( 'Title', 'ocean-popup-login' ),
					'type'     => 'text',
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Description Text
		 */
		$wp_customize->add_setting(
			'opl_popup_lost_password_text_content',
			array(
				'default'           => esc_html__( 'Recover your password', 'ocean-popup-login' ),
				'transport'         => 'postMessage',
				'sanitize_callback' => 'wp_kses_post',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'opl_popup_lost_password_text_content',
				array(
					'label'    => esc_html__( 'Content', 'ocean-popup-login' ),
					'type'     => 'textarea',
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);



		/**
		 * Styling Heading
		 */
		$wp_customize->add_setting(
			'opl_popup_login_styling_heading',
			array(
				'sanitize_callback' => 'wp_kses',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Heading_Control(
				$wp_customize,
				'opl_popup_login_styling_heading',
				array(
					'label'    => esc_html__( 'Styling', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Width
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_width',
			array(
				'transport'         => 'postMessage',
				'default'           => '500',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_width_tablet',
			array(
				'transport'         => 'postMessage',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);

		$wp_customize->add_setting(
			'opl_popup_login_style_width_mobile',
			array(
				'transport'         => 'postMessage',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Slider_Control(
				$wp_customize,
				'opl_popup_login_style_width',
				array(
					'label'       => esc_html__( 'Width (px)', 'oceanwp' ),
					'section'     => 'opl_popup_login',
					'settings'    => array(
						'desktop' => 'opl_popup_login_style_width',
						'tablet'  => 'opl_popup_login_style_width_tablet',
						'mobile'  => 'opl_popup_login_style_width_mobile',
					),
					'priority'    => 10,
					'input_attrs' => array(
						'min'  => 10,
						'max'  => 5000,
						'step' => 1,
					),
				)
			)
		);

		/**
		 * Popup Padding
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_top_padding',
			array(
				'transport'         => 'postMessage',
				'default'           => '30',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_right_padding',
			array(
				'transport'         => 'postMessage',
				'default'           => '100',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_bottom_padding',
			array(
				'transport'         => 'postMessage',
				'default'           => '30',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_left_padding',
			array(
				'transport'         => 'postMessage',
				'default'           => '100',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);

		$wp_customize->add_setting(
			'opl_popup_login_style_tablet_top_padding',
			array(
				'transport'         => 'postMessage',
				'default'           => '30',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_tablet_right_padding',
			array(
				'transport'         => 'postMessage',
				'default'           => '100',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_tablet_bottom_padding',
			array(
				'transport'         => 'postMessage',
				'default'           => '30',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_tablet_left_padding',
			array(
				'transport'         => 'postMessage',
				'default'           => '100',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);

		$wp_customize->add_setting(
			'opl_popup_login_style_mobile_top_padding',
			array(
				'transport'         => 'postMessage',
				'default'           => '30',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_mobile_right_padding',
			array(
				'transport'         => 'postMessage',
				'default'           => '50',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_mobile_bottom_padding',
			array(
				'transport'         => 'postMessage',
				'default'           => '30',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_mobile_left_padding',
			array(
				'transport'         => 'postMessage',
				'default'           => '50',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Dimensions_Control(
				$wp_customize,
				'opl_popup_login_style_padding_dimensions',
				array(
					'label'       => esc_html__( 'Padding (px)', 'ocean-popup-login' ),
					'section'     => 'opl_popup_login',
					'settings'    => array(
						'desktop_top'    => 'opl_popup_login_style_top_padding',
						'desktop_right'  => 'opl_popup_login_style_right_padding',
						'desktop_bottom' => 'opl_popup_login_style_bottom_padding',
						'desktop_left'   => 'opl_popup_login_style_left_padding',
						'tablet_top'     => 'opl_popup_login_style_tablet_top_padding',
						'tablet_right'   => 'opl_popup_login_style_tablet_right_padding',
						'tablet_bottom'  => 'opl_popup_login_style_tablet_bottom_padding',
						'tablet_left'    => 'opl_popup_login_style_tablet_left_padding',
						'mobile_top'     => 'opl_popup_login_style_mobile_top_padding',
						'mobile_right'   => 'opl_popup_login_style_mobile_right_padding',
						'mobile_bottom'  => 'opl_popup_login_style_mobile_bottom_padding',
						'mobile_left'    => 'opl_popup_login_style_mobile_left_padding',
					),
					'priority'    => 10,
					'input_attrs' => array(
						'min'  => 0,
						'step' => 1,
					),
				)
			)
		);

		/**
		 * Popup Border Radius
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_top_radius',
			array(
				'transport'         => 'postMessage',
				'default'           => '3',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_right_radius',
			array(
				'transport'         => 'postMessage',
				'default'           => '3',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_bottom_radius',
			array(
				'transport'         => 'postMessage',
				'default'           => '3',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_left_radius',
			array(
				'transport'         => 'postMessage',
				'default'           => '3',
				'sanitize_callback' => 'oceanwp_sanitize_number',
			)
		);

		$wp_customize->add_setting(
			'opl_popup_login_style_tablet_top_radius',
			array(
				'transport'         => 'postMessage',
				'default'           => '3',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_tablet_right_radius',
			array(
				'transport'         => 'postMessage',
				'default'           => '3',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_tablet_bottom_radius',
			array(
				'transport'         => 'postMessage',
				'default'           => '3',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_tablet_left_radius',
			array(
				'transport'         => 'postMessage',
				'default'           => '3',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);

		$wp_customize->add_setting(
			'opl_popup_login_style_mobile_top_radius',
			array(
				'transport'         => 'postMessage',
				'default'           => '3',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_mobile_right_radius',
			array(
				'transport'         => 'postMessage',
				'default'           => '3',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_mobile_bottom_radius',
			array(
				'transport'         => 'postMessage',
				'default'           => '3',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);
		$wp_customize->add_setting(
			'opl_popup_login_style_mobile_left_radius',
			array(
				'transport'         => 'postMessage',
				'default'           => '3',
				'sanitize_callback' => 'oceanwp_sanitize_number_blank',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Dimensions_Control(
				$wp_customize,
				'opl_popup_login_style_radius_dimensions',
				array(
					'label'       => esc_html__( 'Border Radius (px)', 'ocean-popup-login' ),
					'section'     => 'opl_popup_login',
					'settings'    => array(
						'desktop_top'    => 'opl_popup_login_style_top_radius',
						'desktop_right'  => 'opl_popup_login_style_right_radius',
						'desktop_bottom' => 'opl_popup_login_style_bottom_radius',
						'desktop_left'   => 'opl_popup_login_style_left_radius',
						'tablet_top'     => 'opl_popup_login_style_tablet_top_radius',
						'tablet_right'   => 'opl_popup_login_style_tablet_right_radius',
						'tablet_bottom'  => 'opl_popup_login_style_tablet_bottom_radius',
						'tablet_left'    => 'opl_popup_login_style_tablet_left_radius',
						'mobile_top'     => 'opl_popup_login_style_mobile_top_radius',
						'mobile_right'   => 'opl_popup_login_style_mobile_right_radius',
						'mobile_bottom'  => 'opl_popup_login_style_mobile_bottom_radius',
						'mobile_left'    => 'opl_popup_login_style_mobile_left_radius',
					),
					'priority'    => 10,
					'input_attrs' => array(
						'min'  => 0,
						'step' => 1,
					),
				)
			)
		);

		/**
		 * Background image
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_bg',
			array(
				'transport'         => 'postMessage',
				'default'           => '',
				'sanitize_callback' => 'absint',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Cropped_Image_Control(
				$wp_customize,
				'opl_popup_login_style_bg',
				array(
					'label'       => esc_html__( 'Background Image', 'ocean-popup-login' ),
					'section'     => 'opl_popup_login',
					'priority'    => 10,
					'flex_width'  => true,
					'flex_height' => true,
					'width'       => 500,
					'height'      => 410,
				)
			)
		);

		/**
		 * Popup Background
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_bg_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '#ffffff',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_bg_color',
				array(
					'label'    => esc_html__( 'Form Background Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Background
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_overlay_bg_color',
			array(
				'transport'         => 'postMessage',
				'default'           => 'rgba(11,11,11,.8)',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_overlay_bg_color',
				array(
					'label'    => esc_html__( 'Site Overlay Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Title Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_title_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '#333333',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_title_color',
				array(
					'label'    => esc_html__( 'Title Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Content Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_content_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '#777777',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_content_color',
				array(
					'label'    => esc_html__( 'Content Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Input Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_input_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '#757575',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_input_color',
				array(
					'label'    => esc_html__( 'Input Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Input Border Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_input_border_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '#dddddd',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_input_border_color',
				array(
					'label'    => esc_html__( 'Input Border Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Input Border Focus Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_input_border_focus_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_input_border_focus_color',
				array(
					'label'    => esc_html__( 'Input Border Focus Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Remember Me Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_remember_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '#040404',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_remember_color',
				array(
					'label'    => esc_html__( 'Remember Me Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Button Background
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_button_bg_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_button_bg_color',
				array(
					'label'    => esc_html__( 'Button Background Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Button Background Hover
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_button_bg_color_hover',
			array(
				'transport'         => 'postMessage',
				'default'           => '',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_button_bg_color_hover',
				array(
					'label'    => esc_html__( 'Button Background Color Hover', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Button Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_button_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '#ffffff',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_button_color',
				array(
					'label'    => esc_html__( 'Button Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Forgot Password Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_forgot_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_forgot_color',
				array(
					'label'    => esc_html__( 'Forgot Password Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Bottom Content Background Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_bottom_bg_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '#f6f6f6',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_bottom_bg_color',
				array(
					'label'    => esc_html__( 'Bottom Background Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Bottom Content Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_bottom_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '#000000',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_bottom_color',
				array(
					'label'    => esc_html__( 'Bottom Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Bottom Button Background Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_bottom_button_bg_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '#ffffff',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_bottom_button_bg_color',
				array(
					'label'    => esc_html__( 'Bottom Button Background Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Bottom Button Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_bottom_button_color',
			array(
				'transport'         => 'postMessage',
				'default'           => '#1f1f1f',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_bottom_button_color',
				array(
					'label'    => esc_html__( 'Bottom Button Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Bottom Button Background Color: hover
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_bottom_button_hover_bg_color',
			array(
				'transport'         => 'postMessage',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_bottom_button_hover_bg_color',
				array(
					'label'    => esc_html__( 'Bottom Button Background Color: hover', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Popup Bottom Button Color: hover
		 */
		$wp_customize->add_setting(
			'opl_popup_login_style_bottom_button_hover_color',
			array(
				'transport'         => 'postMessage',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_style_bottom_button_hover_color',
				array(
					'label'    => esc_html__( 'Bottom Button Color: hover', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Privacy Policy Heading
		 */
		$wp_customize->add_setting(
			'opl_popup_login_privacy_heading',
			array(
				'sanitize_callback' => 'wp_kses',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Heading_Control(
				$wp_customize,
				'opl_popup_login_privacy_heading',
				array(
					'label'       => esc_html__( 'Privacy Policy', 'ocean-popup-login' ),
					'description' => esc_html__( 'You need to select your Privacy Policy page in Settings > Privacy.', 'ocean-popup-login' ),
					'section'     => 'opl_popup_login',
					'priority'    => 10,
				)
			)
		);

		/**
		 * Privacy Policy Color
		 */
		$wp_customize->add_setting(
			'opl_popup_login_privacy_color',
			array(
				'transport'         => 'postMessage',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_privacy_color',
				array(
					'label'    => esc_html__( 'Color', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

		/**
		 * Privacy Policy Color: Hover
		 */
		$wp_customize->add_setting(
			'opl_popup_login_privacy_hover_color',
			array(
				'transport'         => 'postMessage',
				'sanitize_callback' => 'oceanwp_sanitize_color',
			)
		);

		$wp_customize->add_control(
			new OceanWP_Customizer_Color_Control(
				$wp_customize,
				'opl_popup_login_privacy_hover_color',
				array(
					'label'    => esc_html__( 'Color: Hover', 'ocean-popup-login' ),
					'section'  => 'opl_popup_login',
					'priority' => 10,
				)
			)
		);

	}

	/**
	 * The popup link.
	 *
	 * @since 1.0.0
	 */
	public function login_link( $items, $args ) {

		// Only used on main menu
		if ( ! in_array( $args->theme_location, array( 'main_menu', 'mobile_menu' ) )
			|| 'menu' != get_theme_mod( 'opl_popup_login_position', 'menu' ) ) {
			return $items;
		}

		// Get permalink on any page
		$logout_url = get_theme_mod( 'opl_popup_logout_url' );
		if ( '' != $logout_url ) {
			$permalink = $logout_url;
		} else {
			if ( is_tax() ) {
				$permalink = get_term_link( get_query_var( 'term' ), get_query_var( 'taxonomy' ) );
			} elseif ( is_post_type_archive() ) {
				$permalink = get_post_type_archive_link( get_query_var( 'post_type' ) );
			} elseif ( is_home() ) {
				$permalink = get_permalink( get_option( 'page_for_posts' ) );
			} else {
				$permalink = get_permalink();
			}
		}

		// Customizer data
		$type        = get_theme_mod( 'opl_popup_login_logged_in', 'logout' );
		$login_text  = get_theme_mod( 'opl_popup_login_text' );
		$login_text  = $login_text ? $login_text : esc_html__( 'Sign in / Join', 'ocean-popup-login' );
		$logout_text = get_theme_mod( 'opl_popup_logout_text' );
		$logout_text = $logout_text ? $logout_text : esc_html__( 'Logout', 'ocean-popup-login' );

		// Add login item to menu
		$items .= '<li class="opl-login-li">';
		if ( ! is_user_logged_in() ) {
			$items .= '<a href="#opl-login-form" class="opl-link">' . $login_text . '</a>';
		} else {
			if ( $type == 'logout' ) {
				$items .= '<a href="' . wp_logout_url( $permalink ) . '" class="opl-logout-link">' . $logout_text . '</a>';
			} elseif ( $type == 'custom' ) {
				$items .= '<span class="opl-logout-link">' . wp_kses_post( get_theme_mod( 'opl_popup_login_logged_in_custom' ) ) . '</span>';
			} else {
				$items .= false;
			}
		}
		$items .= '</li>';

		// Return nav $items
		return $items;

	}

	/**
	 * The popup link shortcode.
	 *
	 * @since 1.0.0
	 */
	public function login_link_shortcode( $items, $login_text, $logout_text ) {

		// Get permalink on any page
		$logout_url = get_theme_mod( 'opl_popup_logout_url' );
		if ( '' != $logout_url ) {
			$permalink = $logout_url;
		} else {
			if ( is_tax() ) {
				$permalink = get_term_link( get_query_var( 'term' ), get_query_var( 'taxonomy' ) );
			} elseif ( is_post_type_archive() ) {
				$permalink = get_post_type_archive_link( get_query_var( 'post_type' ) );
			} elseif ( is_home() ) {
				$permalink = get_permalink( get_option( 'page_for_posts' ) );
			} else {
				$permalink = get_permalink();
			}
		}

		// Vars
		$type        = get_theme_mod( 'opl_popup_login_logged_in', 'logout' );
		$login_text  = $login_text ? $login_text : esc_html__( 'Sign in / Join', 'ocean-popup-login' );
		$logout_text = $logout_text ? $logout_text : esc_html__( 'Logout', 'ocean-popup-login' );

		// Login link
		if ( ! is_user_logged_in() ) {
			$items .= '<a href="#opl-login-form" class="opl-link">' . $login_text . '</a>';
		} else {
			if ( $type == 'logout' ) {
				$items .= '<a href="' . wp_logout_url( $permalink ) . '" class="opl-logout-link">' . $logout_text . '</a>';
			} elseif ( $type == 'custom' ) {
				$items .= '<span class="opl-logout-link">' . esc_html( get_theme_mod( 'opl_popup_login_logged_in_custom' ) ) . '</span>';
			} else {
				$items .= false;
			}
		}

		// Return nav $items
		return $items;

	}

	/**
	 * Gets the popup template part.
	 *
	 * @since 1.0.0
	 */
	public function login_form() {

		$file       = $this->plugin_path . 'template/popup.php';
		$theme_file = get_stylesheet_directory() . '/templates/extra/popup.php';

		if ( file_exists( $theme_file ) ) {
			$file = $theme_file;
		}

		if ( file_exists( $file ) ) {
			include $file;
		}

	}
	/**
	 * Login.
	 *
	 * @since 1.0.0
	 */
	public function login_member() {

		// Get variables.
		$user_login = $_POST['opl_user_login'];
		$user_pass  = $_POST['opl_user_pass'];

		if ( get_theme_mod( 'opl_popup_hide_remember_me', false ) === false ) {
			$user_remember = isset( $_POST['opl_user_remember'] ) ? $_POST['opl_user_remember'] : '';
		} else {
			$user_remember = '';
		}

		if ( self::opl_is_recaptcha_enabled() ) {
			if ( self::ocean_theme_is_outdated() ) {
				$captcha_code            = isset( $_POST['g-recaptcha-response'] ) ? $_POST['g-recaptcha-response'] : '';
				$captcha_validate_result = $this->recaptcha_validate( $captcha_code );
			}
		}

		// Check CSRF token.
		if ( self::opl_is_nonce_enabled() ) {
			if ( ! check_ajax_referer( 'opl-login-nonce', 'login-security', false ) ) {
				echo json_encode(
					array(
						'error'   => true,
						'message' => '<div class="alert alert-danger">' . esc_html__(
							'Session token has expired, please reload the page and try again',
							'ocean-popup-login'
						) . '</div>',
					)
				);
			}
		}

		// Check recaptcha
		elseif ( is_wp_error( $captcha_validate_result ) ) {
			$error_code = $captcha_validate_result->get_error_message();

			switch ( $error_code ) {
				case 'missing-input-secret':
				case 'invalid-input-secret':
					$message = __( 'Invalid reCAPTCHA secret key.', 'ocean-popup-login' );
					break;
				case 'missing-input-response':
				case 'invalid-input-response':
					$message = __( 'Please check the box to prove that you are not a robot.', 'ocean-popup-login' );
					break;
				case 'recaptcha-not-reachable':
				default:
					$message = __( 'Unable to reach the reCAPTCHA server.', 'ocean-popup-login' );
					break;
			}

			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html( $message ) . '</div>',
				)
			);
		}

		// Check if input variables are empty.
		elseif ( empty( $user_login ) || empty( $user_pass ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Please fill all form fields',
						'ocean-popup-login'
					) . '</div>',
				)
			);
		}

		// Now we can insert this account.
		else {

			$user = wp_signon(
				array(
					'user_login'    => $user_login,
					'user_password' => $user_pass,
					'remember'      => $user_remember,
				),
				is_ssl()
			);

			if ( is_wp_error( $user ) ) {
				if ( $user->get_error_messages( 'too_many_tried' ) ) {
					$error_message = reset( $user->get_error_messages( 'too_many_tried' ) );
					echo json_encode(
						array(
							'error'   => true,
							'message' => '<div class="alert alert-danger">' . $error_message . '</div>',
						)
					);
				} else {
					echo json_encode(
						array(
							'error'   => true,
							'message' => '<div class="alert alert-danger">' . esc_html__(
								'ERROR: Username or password incorrect!',
								'ocean-popup-login'
							) . '</div>',
						)
					);
				}
			} else {
				echo json_encode(
					array(
						'error'   => false,
						'message' => '<div class="alert alert-success">' . esc_html__(
							'Login successful, reloading page...',
							'ocean-popup-login'
						) . '</div>',
					)
				);
			}
		}

		die();

	}

	/**
	 * Register.
	 *
	 * @since 1.0.0
	 */
	public function register_member() {

		// Get variables
		$user_login = $_POST['opl_register_login'];
		$user_email = $_POST['opl_register_email'];
		$user_pass  = $_POST['opl_register_pass'];
		$user_pass2 = $_POST['opl_register_pass2'];
		$user_data  = '';

		$user_agreement_required = get_theme_mod( 'opl_popup_registration_agreement_toggle' ) && get_theme_mod( 'opl_popup_registration_agreement_text' );
		$user_agreement_accepted = ! empty( $_POST['opl_user_agreement_accepted'] );

		$user_password_length = get_theme_mod( 'opl_popup_enforce_secure_password', false );
		$user_password_number = get_theme_mod( 'opl_popup_enforce_number_password', false );
		$user_password_smalll = get_theme_mod( 'opl_popup_enforce_smalll_password', false );
		$user_password_capsl  = get_theme_mod( 'opl_popup_enforce_capsl_password', false );
		$user_password_specch = get_theme_mod( 'opl_popup_enforce_specch_password', false );

		if ( self::opl_is_recaptcha_enabled() ) {
			if ( self::ocean_theme_is_outdated() ) {
				$captcha_code            = isset( $_POST['g-recaptcha-response'] ) ? $_POST['g-recaptcha-response'] : '';
				$captcha_validate_result = $this->recaptcha_validate( $captcha_code );
			}
		}

		$username_custom_validated = $this->username_validate( $user_login );

		// Check CSRF token
		if ( self::opl_is_nonce_enabled() ) {
			if ( ! check_ajax_referer( 'opl-login-nonce', 'register-security', false ) ) {
				echo json_encode(
					array(
						'error'   => true,
						'message' => '<div class="alert alert-danger">' . esc_html__(
							'Session token has expired, please reload the page and try again',
							'ocean-popup-login'
						) . '</div>',
					)
				);
				die();
			}
		}

		// Check recaptcha
		elseif ( is_wp_error( $captcha_validate_result ) ) {
			$error_code = $captcha_validate_result->get_error_message();

			switch ( $error_code ) {
				case 'missing-input-secret':
				case 'invalid-input-secret':
					$message = __( 'Invalid reCAPTCHA secret key.', 'ocean-popup-login' );
					break;
				case 'missing-input-response':
				case 'invalid-input-response':
					$message = __( 'Please check the box to prove that you are not a robot.', 'ocean-popup-login' );
					break;
				case 'recaptcha-not-reachable':
				default:
					$message = __( 'Unable to reach the reCAPTCHA server.', 'ocean-popup-login' );
					break;
			}

			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html( $message ) . '</div>',
				)
			);
			die();
		}

		// Check if the username is empty
		elseif ( empty( $user_login ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Invalid username',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Check if the username exist
		elseif ( username_exists( $user_login ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Username already taken',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Check if the username is valid
		elseif ( ! validate_username( $user_login ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Invalid username',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Custom username validation
		elseif ( is_wp_error( $this->username_validate( $user_login ) ) ) {
			$user_name_custom_valid_result = $this->username_validate( $user_login );
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						$user_name_custom_valid_result->get_error_message(),
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Check if email is empty
		elseif ( empty( $user_email ) || ! is_email( $user_email ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Invalid email',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Check if the eamil exist
		elseif ( email_exists( $user_email ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Email address already taken',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Check if password is empty.
		elseif ( empty( $user_pass ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Please enter a password',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Check if passwords match.
		elseif ( ( ! empty( $user_pass ) && empty( $user_pass2 ) ) || ( $user_pass !== $user_pass2 ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Passwords do not match',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Check password length.
		elseif ( true === $user_password_length && strlen( $user_pass ) < 8 ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Password must be between 8 and 50 characters long.',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Check password for numbers.
		elseif ( true === $user_password_number && ! preg_match( '/[0-9]/', $user_pass ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Password must contain at least one digit.',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Check password for small letters.
		elseif ( true === $user_password_smalll && ! preg_match( '/[a-z]/', $user_pass ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Password must contain at least one small letter.',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Check password for capital letters.
		elseif ( true === $user_password_capsl && ! preg_match( '/[A-Z]/', $user_pass ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Password must contain at least one capital letter.',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Check password for symbols.
		elseif ( true === $user_password_specch && ! preg_match( '/[^a-zA-Z0-9]/', $user_pass ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Password must contain at least one special character.',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// Check user agreement (if enabled)
		elseif ( $user_agreement_required && ! $user_agreement_accepted ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Please check the agreement box to continue',
						'ocean-popup-login'
					) . '</div>',
				)
			);
			die();
		}

		// User args
		$user_args = apply_filters(
			'opl_insert_user_args',
			array(
				'user_login'      => $user_login,
				'user_email'      => $user_email,
				'user_pass'       => $user_pass,
				'user_registered' => date( 'Y-m-d H:i:s' ),
				'role'            => get_option( 'default_role' ),
			),
			$user_data
		);

		// Insert new user
		$user_id = wp_insert_user( $user_args );

		if ( is_wp_error( $user_id ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-success">' . esc_html__(
						'Error on user creation.',
						'ocean-popup-login'
					) . '</div>',
				)
			);
		} else {

			// Login new user
			self::opl_log_user_in( $user_id, $user_login, $user_pass );

			$message  = esc_html__( 'Hi there,', 'ocean-popup-login' ) . "\r\n\r\n";
			$message .= sprintf( esc_html__( "Welcome to %s! Here's how to log in:", 'ocean-popup-login' ), get_option( 'blogname' ) ) . "\r\n\r\n";
			$message .= wp_login_url() . "\r\n\r\n";
			$message .= sprintf( esc_html__( 'Username: %s', 'ocean-popup-login' ), $user_login ) . "\r\n\r\n";
			$message .= sprintf( esc_html__( 'Email: %s', 'ocean-popup-login' ), $user_email ) . "\r\n\r\n";
			$message .= esc_html__( 'Password: The one you entered in the registration form. (For security reason, we save encripted password)', 'ocean-popup-login' ) . "\r\n\r\n";
			$message .= sprintf( esc_html__( 'If you have any problems, please contact me at %s.', 'ocean-popup-login' ), get_option( 'admin_email' ) ) . "\r\n\r\n";
			$message .= esc_html__( 'Thank you!', 'ocean-popup-login' );

			wp_mail( $user_email, sprintf( esc_html__( '[%s] Your username and password', 'ocean-popup-login' ), get_option( 'blogname' ) ), $message );

			echo json_encode(
				array(
					'error'   => false,
					'message' => '<div class="alert alert-success">' . esc_html__(
						'Registration complete, reloading page...',
						'ocean-popup-login'
					) . '</div>',
				)
			);

		}

		die();

	}

	/**
	 * Log User In
	 *
	 * @since 1.0.0
	 */
	public function opl_log_user_in( $user_id, $user_login, $user_pass, $remember = false ) {
		if ( $user_id < 1 ) {
			return;
		}

		wp_set_current_user( $user_id, $user_login );
		if ( wp_validate_auth_cookie() == false ) {
			wp_set_auth_cookie( $user_id, true, false );
		}
		do_action( 'wp_login', $user_login, get_userdata( $user_id ) );
		do_action( 'opl_log_user_in', $user_id, $user_login, $user_pass );
	}

	/**
	 * Reset password.
	 *
	 * @since 1.0.0
	 */
	public function reset_password() {

		// Get variables
		$username_or_email = $_POST['opl_user_or_email'];

		// Check CSRF token
		if ( self::opl_is_nonce_enabled() ) {
			if ( ! check_ajax_referer( 'opl-login-nonce', 'password-security', false ) ) {
				echo json_encode(
					array(
						'error'   => true,
						'message' => '<div class="alert alert-danger">' . esc_html__(
							'Session token has expired, please reload the page and try again',
							'ocean-popup-login'
						) . '</div>',
					)
				);
			}
		}

		// Check if input variables are empty
		elseif ( empty( $username_or_email ) ) {
			echo json_encode(
				array(
					'error'   => true,
					'message' => '<div class="alert alert-danger">' . esc_html__(
						'Please fill all form fields',
						'ocean-popup-login'
					) . '</div>',
				)
			);
		} else {

			$username = is_email( $username_or_email ) ? sanitize_email( $username_or_email ) : sanitize_user( $username_or_email );

			$user_forgotten = self::lost_password_retrieve( $username );

			if ( is_wp_error( $user_forgotten ) ) {

				$lostpass_error_messages = $user_forgotten->errors;

				$display_errors = '<div class="alert alert-warning">';
				foreach ( $lostpass_error_messages as $error ) {
					$display_errors .= '<p>' . $error[0] . '</p>';
				}
				$display_errors .= '</div>';

				echo json_encode(
					array(
						'error'   => true,
						'message' => $display_errors,
					)
				);
			} else {
				echo json_encode(
					array(
						'error'   => false,
						'message' => '<p class="alert alert-success">' . esc_html__(
							'Password Reset. Please check your email.',
							'ocean-popup-login'
						) . '</p>',
					)
				);
			}
		}

		die();

	}

	/**
	 * Reset password.
	 *
	 * @since 1.0.0
	 */
	public function lost_password_retrieve( $user_data ) {

		global $wpdb, $current_site, $wp_hasher;

		$errors = new WP_Error();

		if ( empty( $user_data ) ) {
			$errors->add( 'empty_username', esc_html__( 'Please enter a username or e-mail address.', 'ocean-popup-login' ) );
		} elseif ( strpos( $user_data, '@' ) ) {
			$user_data = get_user_by( 'email', trim( $user_data ) );
			if ( empty( $user_data ) ) {
				$errors->add( 'invalid_email', esc_html__( 'There is no user registered with that email address.', 'ocean-popup-login' ) );
			}
		} else {
			$login     = trim( $user_data );
			$user_data = get_user_by( 'login', $login );
		}

		if ( $errors->get_error_code() ) {
			return $errors;
		}

		if ( ! $user_data ) {
			$errors->add( 'invalidcombo', esc_html__( 'Invalid username or e-mail.', 'ocean-popup-login' ) );
			return $errors;
		}

		$user_login = $user_data->user_login;
		$user_email = $user_data->user_email;

		do_action( 'retrieve_password', $user_login );

		$allow = apply_filters( 'allow_password_reset', true, $user_data->ID );

		if ( ! $allow ) {
			return new WP_Error( 'no_password_reset', esc_html__( 'Password reset is not allowed for this user', 'ocean-popup-login' ) );
		} elseif ( is_wp_error( $allow ) ) {
			return $allow;
		}

		$key = wp_generate_password( 20, false );

		do_action( 'retrieve_password_key', $user_login, $key );

		if ( empty( $wp_hasher ) ) {
			require_once ABSPATH . 'wp-includes/class-phpass.php';
			$wp_hasher = new PasswordHash( 8, true );
		}

		$hashed = time() . ':' . $wp_hasher->HashPassword( $key );

		$wpdb->update( $wpdb->users, array( 'user_activation_key' => $hashed ), array( 'user_login' => $user_login ) );

		$message  = esc_html__( 'Someone requested that the password be reset for the following account:', 'ocean-popup-login' ) . "\r\n\r\n";
		$message .= network_home_url( '/' ) . "\r\n\r\n";
		$message .= sprintf( esc_html__( 'Username: %s', 'ocean-popup-login' ), $user_login ) . "\r\n\r\n";
		$message .= esc_html__( 'If this was a mistake, just ignore this email and nothing will happen.', 'ocean-popup-login' ) . "\r\n\r\n";
		$message .= esc_html__( 'To reset your password, visit the following address:', 'ocean-popup-login' ) . "\r\n\r\n";
		$message .= '<' . network_site_url( "wp-login.php?action=rp&key=$key&login=" . rawurlencode( $user_login ), 'login' ) . ">\r\n\r\n";

		if ( is_multisite() ) {
			$blogname = $GLOBALS['current_site']->site_name;
		} else {
			$blogname = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );
		}

		$title   = sprintf( esc_html__( '[%s] Password Reset', 'ocean-popup-login' ), $blogname );
		$title   = apply_filters( 'retrieve_password_title', $title );
		$message = apply_filters( 'retrieve_password_message', $message, $key, $user_login, $user_data );

		if ( $message && ! wp_mail( $user_email, $title, $message ) ) {
			$errors->add( 'noemail', esc_html__( 'The e-mail could not be sent. Possible reason: your host may have disabled the mail() function.', 'ocean-popup-login' ) );

			return $errors;

			wp_die();
		}

		return true;

	}

	/**
	 * Sanitize the logged in options value.
	 *
	 * @since 1.0.0
	 */
	public static function opl_popup_login_sanitize_logged_in( $type ) {
		if ( ! in_array( $type, array( 'nothing', 'logout', 'custom' ) ) ) {
			$type = 'logout';
		}
		return $type;
	}

	/**
	 * Primary background.
	 *
	 * @since 1.0.0
	 */
	public function primary_background( $backgrounds ) {

		$backgrounds[] = '#opl-login-form .opl-button';
		$backgrounds[] = '#opl-login-form .input-wrap .opl-focus-line';

		return $backgrounds;

	}

	/**
	 * Primary hover background.
	 *
	 * @since 1.0.0
	 */
	public function hover_primary_background( $hover ) {

		$hover[] = '#opl-login-form .opl-button:active';
		$hover[] = '#opl-login-form .opl-button:hover';

		return $hover;

	}

	/**
	 * Validates reCAPTCHA
	 *
	 * @since 1.1.0
	 * @access public
	 */
	public function recaptcha_validate( $response, $remote_ip = '' ) {

		if ( empty( $remote_ip ) ) {
			$remote_ip = $_SERVER['REMOTE_ADDR'];
		}

		$response = wp_remote_post(
			'https://www.google.com/recaptcha/api/siteverify',
			array(
				'body' => array(
					'secret'   => 'v3' == get_option( 'owp_recaptcha_version' ) ? get_option( 'owp_recaptcha3_secret_key' ) : get_option( 'owp_recaptcha_secret_key' ),
					'response' => $response,
					'remoteip' => $remote_ip,
				),
			)
		);

		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = wp_remote_retrieve_body( $response );

		if ( 200 == $response_code ) {

			$result = json_decode( $response_body, true );

			if ( $result['success'] ) {
				return true;
			}

			return new WP_Error( 'recaptcha', reset( $result['error-codes'] ) );
		}

		return new WP_Error( 'recaptcha', 'recaptcha-not-reachable' );
	}

	public function username_validate( $username ) {
		$username_words_forbidden = get_theme_mod( 'opl_popup_username_words_forbidden', false );
		$username_forbid_spaces   = get_theme_mod( 'opl_popup_username_forbid_spaces', false );
		$username_enable_limit    = get_theme_mod( 'opl_popup_username_enable_limit', false );
		$username_min_length      = get_theme_mod( 'opl_popup_username_min_length', 2 );
		$username_max_length      = get_theme_mod( 'opl_popup_username_max_length', 15 );

		if ( ! empty( $username_words_forbidden ) ) {
			$username_words_forbidden = explode( ',', $username_words_forbidden );
			if ( in_array( $username, $username_words_forbidden ) ) {
				return new WP_Error( 'username', __( 'This Username is forbidden. Choose a different one.', 'ocean-popup-login' ) );
			}
		}

		if ( ! empty( $username_forbid_spaces ) ) {
			if ( preg_match( '|\s|', $username ) ) {
				return new WP_Error( 'username', __( 'Username can not contain spaces', 'ocean-popup-login' ) );
			}
		}

		if ( ! empty( $username_enable_limit ) ) {
			$username_length = strlen( $username );
			if ( $username_length < $username_min_length || $username_length > $username_max_length ) {
				return new WP_Error( 'username', sprintf( __( 'Username should be min %1$s and max %2$s symbols', 'ocean-popup-login' ), $username_min_length, $username_max_length ) );
			}
		}

		return true;
	}

	/**
	 * Enqueue scripts.
	 *
	 * @since 1.0.0
	 */
	public function scripts() {

		// Return if logged in
		if ( is_user_logged_in() ) {
			return;
		}

		// Load main stylesheet
		wp_enqueue_style( 'opl-style', plugins_url( '/assets/css/style.min.css', __FILE__ ) );

		// Load custom js methods.
		wp_enqueue_script( 'axios', plugins_url( '/assets/vendors/axios/axios.min.js', __FILE__ ), array(), '0.21.1', true );

		$popup_script_deps     = array( 'oceanwp-main', 'axios' );
		$popup_script_localize = false;

		if ( self::opl_is_recaptcha_enabled() ) {
			if ( self::ocean_theme_is_outdated() ) {
				$recaptcha_version = get_option( 'owp_recaptcha_version' );
				$site_key          = ( 'v3' == $recaptcha_version ) ? get_option( 'owp_recaptcha3_site_key' ) : get_option( 'owp_recaptcha_site_key' );
				$secret_key        = ( 'v3' == $recaptcha_version ) ? get_option( 'owp_recaptcha3_secret_key' ) : get_option( 'owp_recaptcha_secret_key' );
				if ( ! empty( $site_key ) || ! empty( $secret_key ) ) {
					if ( 'v3' == $recaptcha_version ) {
							$popup_script_deps     = array_merge( $popup_script_deps, array( 'jquery', 'recaptcha' ) );
							$recaptcha_script_args = array(
								'hl'     => str_replace( '_', '-', get_locale() ),
								'render' => $site_key,
							);
							$popup_script_localize = true;
							wp_register_script( 'recaptcha', add_query_arg( $recaptcha_script_args, 'https://www.google.com/recaptcha/api.js' ) );
					} else {
						wp_enqueue_script(
							'recaptcha',
							add_query_arg(
								array(
									'hl' => str_replace( '_', '-', get_locale() ),
								),
								'https://www.google.com/recaptcha/api.js'
							)
						);
					}
				}
			}
		}

		wp_register_script( 'opl-js-script', plugins_url( '/assets/js/popup-login.min.js', __FILE__ ), $popup_script_deps, $this->version, true );
		wp_enqueue_script( 'opl-js-script' );
		if ( $popup_script_localize ) {
			wp_localize_script( 'recaptcha-v3-init', 'RecaptchaV3InitParam', array( 'key' => $site_key ) );
		}
	}


	/**
	 * Localize array.
	 *
	 * @since 1.0.0
	 */
	public function localize_array( $array ) {

		// if is not logged in
		if ( ! is_user_logged_in() ) {
			$array['loggedIn'] = is_user_logged_in();
			$array['ajaxURL']  = admin_url( 'admin-ajax.php' );
		}

		return $array;
	}

	/**
	 * Registers the function as a shortcode
	 */
	public function popup_shortcode( $atts, $items ) {

		// Extract attributes
		extract(
			shortcode_atts(
				array(
					'login_text'  => esc_html__( 'Sign in / Join', 'ocean-popup-login' ),
					'logout_text' => esc_html__( 'Logout', 'ocean-popup-login' ),
				),
				$atts
			)
		);

		return $this->login_link_shortcode( $items, $login_text, $logout_text );
	}


	public static function ocean_theme_is_outdated() {
		$theme = wp_get_theme();
		if ( 'OceanWP' == $theme->name || 'oceanwp' == $theme->template ) {
			if ( ! defined( 'OCEANWP_THEME_VERSION' ) ) {
				define( 'OCEANWP_THEME_VERSION', theme_version() );
			}
			if ( ! is_child_theme() ) {
				$current_theme_version = OCEANWP_THEME_VERSION;
			} else {
				$current_theme_version = '3.4.2';
			}
			$required_theme_version = '3.4.3';

			if ( ! empty( $current_theme_version ) && ! empty( $required_theme_version ) && version_compare( $current_theme_version, $required_theme_version, '<' ) ) {
				return false;
			} else {
				return true;
			}
		}
	}

	/**
	 * Check if reCAPTCHA is enabled
	 *
	 * @return bool  */
	public static function opl_is_recaptcha_enabled() {
		// Get the value from the Customizer.
		$recaptcha_enable = get_theme_mod( 'opl_popup_recaptcha_enable', false );

		// Check the value and return true or false.
		if ( $recaptcha_enable ) {
			return true;
		} else {
			return false;
		}
	}

	public static function opl_is_nonce_enabled() {
		// Get the value from the Customizer.
		$nonce_enable = get_theme_mod( 'opl_popup_nonce_enable', false );

		// Check the value and return true or false.
		if ( $nonce_enable ) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Get CSS
	 */
	public function head_css( $output ) {
		$popup_width                       = get_theme_mod( 'opl_popup_login_style_width', '500' );
		$popup_width_tablet                = get_theme_mod( 'opl_popup_login_style_width_tablet' );
		$popup_width_mobile                = get_theme_mod( 'opl_popup_login_style_width_mobile' );
		$top_padding                       = get_theme_mod( 'opl_popup_login_style_top_padding', '30' );
		$right_padding                     = get_theme_mod( 'opl_popup_login_style_right_padding', '100' );
		$bottom_padding                    = get_theme_mod( 'opl_popup_login_style_bottom_padding', '30' );
		$left_padding                      = get_theme_mod( 'opl_popup_login_style_left_padding', '100' );
		$tablet_top_padding                = get_theme_mod( 'opl_popup_login_style_tablet_top_padding', '30' );
		$tablet_right_padding              = get_theme_mod( 'opl_popup_login_style_tablet_right_padding', '100' );
		$tablet_bottom_padding             = get_theme_mod( 'opl_popup_login_style_tablet_bottom_padding', '30' );
		$tablet_left_padding               = get_theme_mod( 'opl_popup_login_style_tablet_left_padding', '100' );
		$mobile_top_padding                = get_theme_mod( 'opl_popup_login_style_mobile_top_padding', '30' );
		$mobile_right_padding              = get_theme_mod( 'opl_popup_login_style_mobile_right_padding', '50' );
		$mobile_bottom_padding             = get_theme_mod( 'opl_popup_login_style_mobile_bottom_padding', '30' );
		$mobile_left_padding               = get_theme_mod( 'opl_popup_login_style_mobile_left_padding', '50' );
		$top_radius                        = get_theme_mod( 'opl_popup_login_style_top_radius', '3' );
		$right_radius                      = get_theme_mod( 'opl_popup_login_style_right_radius', '3' );
		$bottom_radius                     = get_theme_mod( 'opl_popup_login_style_bottom_radius', '3' );
		$left_radius                       = get_theme_mod( 'opl_popup_login_style_left_radius', '3' );
		$tablet_top_radius                 = get_theme_mod( 'opl_popup_login_style_tablet_top_radius', '3' );
		$tablet_right_radius               = get_theme_mod( 'opl_popup_login_style_tablet_right_radius', '3' );
		$tablet_bottom_radius              = get_theme_mod( 'opl_popup_login_style_tablet_bottom_radius', '3' );
		$tablet_left_radius                = get_theme_mod( 'opl_popup_login_style_tablet_left_radius', '3' );
		$mobile_top_radius                 = get_theme_mod( 'opl_popup_login_style_mobile_top_radius', '3' );
		$mobile_right_radius               = get_theme_mod( 'opl_popup_login_style_mobile_right_radius', '3' );
		$mobile_bottom_radius              = get_theme_mod( 'opl_popup_login_style_mobile_bottom_radius', '3' );
		$mobile_left_radius                = get_theme_mod( 'opl_popup_login_style_mobile_left_radius', '3' );
		$popup_bg_img                      = get_theme_mod( 'opl_popup_login_style_bg' );
		$popup_bg                          = get_theme_mod( 'opl_popup_login_style_bg_color', '#ffffff' );
		$popup_overlay_bg                  = get_theme_mod( 'opl_popup_login_style_overlay_bg_color', 'rgba(11,11,11,.8)' );
		$popup_title_color                 = get_theme_mod( 'opl_popup_login_style_title_color', '#333333' );
		$popup_content_color               = get_theme_mod( 'opl_popup_login_style_content_color', '#777777' );
		$popup_input_color                 = get_theme_mod( 'opl_popup_login_style_input_color', '#757575' );
		$popup_input_border_color          = get_theme_mod( 'opl_popup_login_style_input_border_color', '#dddddd' );
		$popup_input_border_focus_color    = get_theme_mod( 'opl_popup_login_style_input_border_focus_color' );
		$popup_input_remember_color        = get_theme_mod( 'opl_popup_login_style_remember_color', '#040404' );
		$popup_input_button_bg_color       = get_theme_mod( 'opl_popup_login_style_button_bg_color' );
		$popup_input_button_bg_color_hover = get_theme_mod( 'opl_popup_login_style_button_bg_color_hover' );
		$popup_input_button_color          = get_theme_mod( 'opl_popup_login_style_button_color', '#ffffff' );
		$popup_forgot_color                = get_theme_mod( 'opl_popup_login_style_forgot_color' );
		$bottom_bg_color                   = get_theme_mod( 'opl_popup_login_style_bottom_bg_color', '#f6f6f6' );
		$bottom_color                      = get_theme_mod( 'opl_popup_login_style_bottom_color', '#000000' );
		$bottom_button_bg_color            = get_theme_mod( 'opl_popup_login_style_bottom_button_bg_color', '#ffffff' );
		$bottom_button_color               = get_theme_mod( 'opl_popup_login_style_bottom_button_color', '#1f1f1f' );
		$bottom_button_hover_bg_color      = get_theme_mod( 'opl_popup_login_style_bottom_button_hover_bg_color' );
		$bottom_button_hover_color         = get_theme_mod( 'opl_popup_login_style_bottom_button_hover_color' );
		$privacy_color                     = get_theme_mod( 'opl_popup_login_privacy_color' );
		$privacy_hover_color               = get_theme_mod( 'opl_popup_login_privacy_hover_color' );

		// Set up empty variables.
		$css                = '';
		$padding_css        = '';
		$tablet_padding_css = '';
		$mobile_padding_css = '';
		$radius_css         = '';
		$tablet_radius_css  = '';
		$mobile_radius_css  = '';

		// Popup width
		if ( ! empty( $popup_width ) && '500' != $popup_width ) {
			$css .= '#opl-login-form .opl-popup-block{width:' . $popup_width . 'px;}';
		}

		// Popup width tablet
		if ( ! empty( $popup_width_tablet ) ) {
			$css .= '@media (max-width: 768px){#opl-login-form .opl-popup-block{width:' . $popup_width_tablet . 'px;}}';
		}

		// Popup width mobile
		if ( ! empty( $popup_width_mobile ) ) {
			$css .= '@media (max-width: 480px){#opl-login-form .opl-popup-block{width:' . $popup_width_mobile . 'px;}}';
		}

		// Popup top padding
		if ( ! empty( $top_padding ) && '30' != $top_padding ) {
			$padding_css .= 'padding-top:' . $top_padding . 'px;';
		}

		// Popup right padding
		if ( ! empty( $right_padding ) && '100' != $right_padding ) {
			$padding_css .= 'padding-right:' . $right_padding . 'px;';
		}

		// Popup bottom padding
		if ( ! empty( $bottom_padding ) && '30' != $bottom_padding ) {
			$padding_css .= 'padding-bottom:' . $bottom_padding . 'px;';
		}

		// Popup left padding
		if ( ! empty( $left_padding ) && '100' != $left_padding ) {
			$padding_css .= 'padding-left:' . $left_padding . 'px;';
		}

		// Popup padding css
		if ( ! empty( $top_padding ) && '30' != $top_padding
			|| ! empty( $right_padding ) && '100' != $right_padding
			|| ! empty( $bottom_padding ) && '30' != $bottom_padding
			|| ! empty( $left_padding ) && '100' != $left_padding ) {
			$css .= '#opl-login-form .opl-popup-block{' . $padding_css . '}';
		}

		// Tablet popup top padding
		if ( ! empty( $tablet_top_padding ) && '30' != $tablet_top_padding ) {
			$tablet_padding_css .= 'padding-top:' . $tablet_top_padding . 'px;';
		}

		// Tablet popup right padding
		if ( ! empty( $tablet_right_padding ) && '100' != $tablet_right_padding ) {
			$tablet_padding_css .= 'padding-right:' . $tablet_right_padding . 'px;';
		}

		// Tablet popup bottom padding
		if ( ! empty( $tablet_bottom_padding ) && '30' != $tablet_bottom_padding ) {
			$tablet_padding_css .= 'padding-bottom:' . $tablet_bottom_padding . 'px;';
		}

		// Tablet popup left padding
		if ( ! empty( $tablet_left_padding ) && '100' != $tablet_left_padding ) {
			$tablet_padding_css .= 'padding-left:' . $tablet_left_padding . 'px;';
		}

		// Tablet popup padding css
		if ( ! empty( $tablet_top_padding ) && '30' != $tablet_top_padding
			|| ! empty( $tablet_right_padding ) && '100' != $tablet_right_padding
			|| ! empty( $tablet_bottom_padding ) && '30' != $tablet_bottom_padding
			|| ! empty( $tablet_left_padding ) && '100' != $tablet_left_padding ) {
			$css .= '@media (max-width: 768px){#opl-login-form .opl-popup-block{' . $tablet_padding_css . '}}';
		}

		// Mobile popup top padding
		if ( ! empty( $mobile_top_padding ) && '30' != $mobile_top_padding ) {
			$mobile_padding_css .= 'padding-top:' . $mobile_top_padding . 'px;';
		}

		// Mobile popup right padding
		if ( ! empty( $mobile_right_padding ) && '50' != $mobile_right_padding ) {
			$mobile_padding_css .= 'padding-right:' . $mobile_right_padding . 'px;';
		}

		// Mobile popup bottom padding
		if ( ! empty( $mobile_bottom_padding ) && '30' != $mobile_bottom_padding ) {
			$mobile_padding_css .= 'padding-bottom:' . $mobile_bottom_padding . 'px;';
		}

		// Mobile popup left padding
		if ( ! empty( $mobile_left_padding ) && '50' != $mobile_left_padding ) {
			$mobile_padding_css .= 'padding-left:' . $mobile_left_padding . 'px;';
		}

		// Mobile popup padding css
		if ( ! empty( $mobile_top_padding ) && '30' != $mobile_top_padding
			|| ! empty( $mobile_right_padding ) && '50' != $mobile_right_padding
			|| ! empty( $mobile_bottom_padding ) && '30' != $mobile_bottom_padding
			|| ! empty( $mobile_left_padding ) && '50' != $mobile_left_padding ) {
			$css .= '@media (max-width: 480px){#opl-login-form .opl-popup-block{' . $mobile_padding_css . '}}';
		}

		// Popup top border radius
		if ( ! empty( $top_radius ) && '3' != $top_radius ) {
			$radius_css .= 'border-top-left-radius:' . $top_radius . 'px;';
		}

		// Popup right border radius
		if ( ! empty( $right_radius ) && '3' != $right_radius ) {
			$radius_css .= 'border-top-right-radius:' . $right_radius . 'px;';
		}

		// Popup bottom border radius
		if ( ! empty( $bottom_radius ) && '3' != $bottom_radius ) {
			$radius_css .= 'border-bottom-right-radius:' . $bottom_radius . 'px;';
		}

		// Popup left border radius
		if ( ! empty( $left_radius ) && '3' != $left_radius ) {
			$radius_css .= 'border-bottom-left-radius:' . $left_radius . 'px;';
		}

		// Popup border radius css
		if ( ! empty( $top_radius ) && '3' != $top_radius
			|| ! empty( $right_radius ) && '3' != $right_radius
			|| ! empty( $bottom_radius ) && '3' != $bottom_radius
			|| ! empty( $left_radius ) && '3' != $left_radius ) {
			$css .= '#opl-login-form .opl-popup-block{' . $radius_css . '}';
		}

		// Tablet popup top border radius
		if ( ! empty( $tablet_top_radius ) && '3' != $tablet_top_radius ) {
			$tablet_radius_css .= 'border-top-left-radius:' . $tablet_top_radius . 'px;';
		}

		// Tablet popup right border radius
		if ( ! empty( $tablet_right_radius ) && '3' != $tablet_right_radius ) {
			$tablet_radius_css .= 'border-top-right-radius:' . $tablet_right_radius . 'px;';
		}

		// Tablet popup bottom border radius
		if ( ! empty( $tablet_bottom_radius ) && '3' != $tablet_bottom_radius ) {
			$tablet_radius_css .= 'border-bottom-right-radius:' . $tablet_bottom_radius . 'px;';
		}

		// Tablet popup left border radius
		if ( ! empty( $tablet_left_radius ) && '3' != $tablet_left_radius ) {
			$tablet_radius_css .= 'border-bottom-left-radius:' . $tablet_left_radius . 'px;';
		}

		// Tablet popup border radius css
		if ( ! empty( $tablet_top_radius ) && '3' != $tablet_top_radius
			|| ! empty( $tablet_right_radius ) && '3' != $tablet_right_radius
			|| ! empty( $tablet_bottom_radius ) && '3' != $tablet_bottom_radius
			|| ! empty( $tablet_left_radius ) && '3' != $tablet_left_radius ) {
			$css .= '@media (max-width: 768px){#opl-login-form .opl-popup-block{' . $tablet_radius_css . '}}';
		}

		// Mobile popup top border radius
		if ( ! empty( $mobile_top_radius ) && '3' != $mobile_top_radius ) {
			$mobile_radius_css .= 'border-top-left-radius:' . $mobile_top_radius . 'px;';
		}

		// Mobile popup right border radius
		if ( ! empty( $mobile_right_radius ) && '3' != $mobile_right_radius ) {
			$mobile_radius_css .= 'border-top-right-radius:' . $mobile_right_radius . 'px;';
		}

		// Mobile popup bottom border radius
		if ( ! empty( $mobile_bottom_radius ) && '3' != $mobile_bottom_radius ) {
			$mobile_radius_css .= 'border-bottom-right-radius:' . $mobile_bottom_radius . 'px;';
		}

		// Mobile popup left border radius
		if ( ! empty( $mobile_left_radius ) && '3' != $mobile_left_radius ) {
			$mobile_radius_css .= 'border-bottom-left-radius:' . $mobile_left_radius . 'px;';
		}

		// Mobile popup border radius css
		if ( ! empty( $mobile_top_radius ) && '3' != $mobile_top_radius
			|| ! empty( $mobile_right_radius ) && '3' != $mobile_right_radius
			|| ! empty( $mobile_bottom_radius ) && '3' != $mobile_bottom_radius
			|| ! empty( $mobile_left_radius ) && '3' != $mobile_left_radius ) {
			$css .= '@media (max-width: 480px){#woo-popup-wrap #woo-popup-inner{' . $mobile_radius_css . '}}';
		}

		// Popup background image
		if ( ! empty( $popup_bg_img ) ) {
			$img  = wp_get_attachment_image_src( absint( $popup_bg_img ), 'full' );
			$css .= '#opl-login-form .has-background-image{background-image: url(' . esc_url( $img[0] ) . ');}';
		}

		// Popup background color
		if ( ! empty( $popup_bg ) && '#ffffff' != $popup_bg ) {
			$css .= '#opl-login-form .opl-popup-block{background-color:' . $popup_bg . ';}';
		}

		// Popup overlay background color
		if ( ! empty( $popup_overlay_bg ) && 'rgba(11,11,11,.8)' != $popup_overlay_bg ) {
			$css .= '#opl-login-form .opl-overlay{background-color:' . $popup_overlay_bg . ';}';
		}

		// Popup title color
		if ( ! empty( $popup_title_color ) && '#333333' != $popup_title_color ) {
			$css .= '#opl-login-form .opl-title{color:' . $popup_title_color . ';}';
		}

		// Popup content color
		if ( ! empty( $popup_content_color ) && '#777777' != $popup_content_color ) {
			$css .= '#opl-login-form .opl-intro{color:' . $popup_content_color . ';}';
		}

		// Popup input color
		if ( ! empty( $popup_input_color ) && '#757575' != $popup_input_color ) {
			$css .= '#opl-login-form .input-wrap .opl-label{color:' . $popup_input_color . ';}';
		}

		// Popup input border color
		if ( ! empty( $popup_input_border_color ) && '#dddddd' != $popup_input_border_color ) {
			$css .= '#opl-login-form .input-wrap .opl-line{background-color:' . $popup_input_border_color . ';}';
		}

		// Popup input border color
		if ( ! empty( $popup_input_border_focus_color ) ) {
			$css .= '#opl-login-form .input-wrap .opl-focus-line{background-color:' . $popup_input_border_focus_color . ';}';
		}

		// Popup remember me color
		if ( ! empty( $popup_input_remember_color ) && '#040404' != $popup_input_remember_color ) {
			$css .= '#opl-login-form .input-wrap.opl-remember label{color:' . $popup_input_remember_color . ';}';
		}

		// Popup button background color
		if ( ! empty( $popup_input_button_bg_color ) ) {
			$css .= '#opl-login-form .opl-button{background-color:' . $popup_input_button_bg_color . ';}';
		}

		// Popup button background color hover
		if ( ! empty( $popup_input_button_bg_color_hover ) ) {
			$css .= '#opl-login-form .opl-button:hover{background-color:' . $popup_input_button_bg_color_hover . ';}';
		}

		// Popup button color
		if ( ! empty( $popup_input_button_color ) && '#ffffff' != $popup_input_button_color ) {
			$css .= '#opl-login-form .opl-button{color:' . $popup_input_button_color . ';}';
		}

		// Popup forgot password color
		if ( ! empty( $popup_forgot_color ) ) {
			$css .= '#opl-login-form .opl-text a{color:' . $popup_forgot_color . ';}';
		}

		// Popup bottom background color
		if ( ! empty( $bottom_bg_color ) && '#f6f6f6' != $bottom_bg_color ) {
			$css .= '#opl-login-form .opl-bottom{background-color:' . $bottom_bg_color . ';}';
		}

		// Popup bottom color
		if ( ! empty( $bottom_color ) && '#000000' != $bottom_color ) {
			$css .= '#opl-login-form .opl-bottom .text{color:' . $bottom_color . ';}';
		}

		// Popup bottom button background color
		if ( ! empty( $bottom_button_bg_color ) && '#ffffff' != $bottom_button_bg_color ) {
			$css .= '#opl-login-form .opl-bottom .opl-btn{background-color:' . $bottom_button_bg_color . ';}';
		}

		// Popup bottom button color
		if ( ! empty( $bottom_button_color ) && '#1f1f1f' != $bottom_button_color ) {
			$css .= '#opl-login-form .opl-bottom .opl-btn{color:' . $bottom_button_color . ';}';
		}

		// Popup bottom button hover background color
		if ( ! empty( $bottom_button_hover_bg_color ) ) {
			$css .= '#opl-login-form .opl-bottom .opl-btn:hover{background-color:' . $bottom_button_hover_bg_color . ';}';
		}

		// Popup bottom button hover color
		if ( ! empty( $bottom_button_hover_color ) ) {
			$css .= '#opl-login-form .opl-bottom .opl-btn:hover{color:' . $bottom_button_hover_color . ';}';
		}

		// Popup bottom privacy color
		if ( ! empty( $privacy_color ) ) {
			$css .= '#opl-login-form .opl-privacy a{color:' . $privacy_color . ';}';
		}

		// Popup bottom privacy hover color
		if ( ! empty( $privacy_hover_color ) ) {
			$css .= '#opl-login-form .opl-privacy a:hover{color:' . $privacy_hover_color . ';}';
		}

		// Return CSS
		if ( ! empty( $css ) ) {
			$output .= '/* Login Popup CSS */' . $css;
		}

		// Return output css
		return $output;
	}

	/**
	 * Add popup login switcher.
	 *
	 * @since  1.0.0
	 */
	public function oe_theme_panels( $panels ) {

		$panels['ocean_popup_login_panel'] = array(
			'label' => esc_html__( 'Popup Login', 'ocean-popup-login' ),
		);

		// Return panels list
		return $panels;
	}

} // End Class

// --------------------------------------------------------------------------------
// region Freemius
// --------------------------------------------------------------------------------

if ( ! function_exists( 'ocean_popup_login_fs' ) ) {
	// Create a helper function for easy SDK access.
	function ocean_popup_login_fs() {
		global $ocean_popup_login_fs;

		if ( ! isset( $ocean_popup_login_fs ) ) {
			$ocean_popup_login_fs = OceanWP_EDD_Addon_Migration::instance( 'ocean_popup_login_fs' )->init_sdk(
				array(
					'id'         => '3764',
					'slug'       => 'ocean-popup-login',
					'public_key' => 'pk_e0499681c773af2bbac0016bb24ff',
				)
			);

			if ( $ocean_popup_login_fs->can_use_premium_code__premium_only() ) {
				Ocean_Popup_Login::instance()->init();
			}
		}

		return $ocean_popup_login_fs;
	}

	function ocean_popup_login_fs_addon_init() {
		if ( class_exists( 'Ocean_Extra' ) ) {
			OceanWP_EDD_Addon_Migration::instance( 'ocean_popup_login_fs' )->init();
		}
	}

	if ( 0 == did_action( 'owp_fs_loaded' ) ) {
		// Init add-on only after parent theme was loaded.
		add_action( 'owp_fs_loaded', 'ocean_popup_login_fs_addon_init', 15 );
	} else {
		if ( class_exists( 'Ocean_Extra' ) ) {
			/**
			 * This makes sure that if the theme was already loaded
			 * before the plugin, it will run Freemius right away.
			 *
			 * This is crucial for the plugin's activation hook.
			 */
			ocean_popup_login_fs_addon_init();
		}
	}

	function ocean_popup_login_fs_try_migrate() {
		OceanWP_EDD_Addon_Migration::instance( 'ocean_popup_login_fs' )->try_migrate_addon(
			'72620',
			'Ocean_Popup_Login',
			'Popup Login'
		);
	}
}

// endregion
