=== Ocean Popup Login ===
Contributors: oceanwp, freemius, apprimit, wpfleek
Requires at least: 5.6
Tested up to: 6.5.3
Stable tag: 2.1.8
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==

Add user login, registration and lost password forms as a popup to your website. Simple, effective and out of the box solution.
This plugin requires the [OceanWP](https://oceanwp.org/) theme to be installed.

== Installation ==

1. Upload `ocean-popup-login` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Done!

== Frequently Asked Questions ==

= I installed the plugin but it does not work =

This plugin will only function with the [OceanWP](https://oceanwp.org/) theme.

== Changelog ==


= 2.1.8 - MAY 20 2024 =
- Added: Translations: Portuguese language.
- Updated: Compatibility: WordPress version number.

= 2.1.7 - DEC 11 2023 =
Added: Compatibility: Easy Digital Downloads: Password retrieve filter for the Forgot Password / Reset Password option.

= 2.1.6 - SEP 6 2023 =
- Updated: Compatibility: WordPress version number.

= 2.1.5 - MAY 23 2023 =
- NEW: Security method via reCaptcha: OceanWP Panel > Ingretations + Customizer option.
- NEW: Username security options: username length, exclude spaces, forbidden usernames; Customizer options.
- Added: Compatibility: PHP 8.2.6: Creation of dynamic property Ocean_Popup_Login::$plugin_path and Ocean_Popup_Login::$plugin_url is deprecated.

= 2.1.4 - JAN 10 2023 =
- Fixed: Customizer: Checkbox option to display privacy policy doesn't display.

= 2.1.3 - NOV 9 2022 =
- Fixed: HTML Code for Custom Text is not available.
- Fixed: Live preview for custom HTML text.
- Fixed: PHP Fatal error: function 'opl_popup_login_sanitize_logged_in' cannot be called statically.

= 2.1.2 =
- Added: Accessibility: Login form text input fields.

= 2.1.1 =
- Improved: Theme Panel.
- Fixed: After a user registration from the popup login plugin, no email is sent to the user.

= 2.1.0 =
NEW: Enforce strong passwords upon user registration (optional).
NEW: Limit login and password reset attempts on the popup login form and admin login page (optional).

= 2.0.3 =
- NEW: Security Options: Enforce strong passwords.
- NEW: Security Options: Password options: passwords must contain either digits, small or capital letters, or special characters.
- Fixed: Customizer: Display of the checkbox option.

= 2.0.2 =
- Improved: Scripts dependencies.

= 2.0.1 =
- Improved: Fade and Slide transition effects.
- Fixed: Auto Mode: Mobile Menu: form not displayed on Sidebar and Dropdown styles.
- Fixed: Manual Mode: Form not displayed when shortcode or link class in use.

= 2.0.0 =
- Added: Vanilla JS.

= 1.2.1 =
- Fixed: Undefined index opl_user_remember.

= 1.2.0 =
- Added: Feature to hide the 'Remember Me' option.
- Added: Option to change website background overlay color.
- Added: German translation, thanks to Wolfgang Wick.
- Updated: French translation, thanks to Mathieu Funk.

= 1.1.0 =
- Added: Version updated for WordPress 5.4.

= 1.0.9 =
- Fixed: Reset Password Recovery link timeout.

= 1.0.8 =
- Fixed: Fatal error on plugin activation.

= 1.0.7 =
- Added: Codes for Freemius switch.

= 1.0.6 =
- Added: New setting which allow you to add a redirect for the logout link.
- Tweak: Added support for the Nextend Social Login and Register plugin which allows you to login/register via your social media.

= 1.0.5 =
- Added: New settings to add a redirection after login or registration.
- Added: German translation, thanks to Antal Hendrix.
- Fixed: Issue if background image added to the popup.

= 1.0.4 =
- Added: Privacy Policy link for GDPR consent in forms, you need to select your Privacy Policy page in Settings > Privacy.
- Added: Two new settings Login and Logout Texts so now you can add what you want for the login and lgout texts.
- Added: Portuguese translation updated, thanks to Chagas Silva.

= 1.0.3 =
- Added: Estonian translation, thanks to Janek Tuttar.
- Fixed: Login didn't work if SSL.

= 1.0.2 =
- Tweak: JS script improved, no need Magnific Popup anymore.
- Tweak: Sign in/Sign up link added before the cart and search icons.

= 1.0.1 =
- Added: French translation, thank you very much to Julien Roussel.

= 1.0.0 =
- Initial release.
