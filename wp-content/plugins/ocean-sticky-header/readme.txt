=== Ocean Sticky Header ===
Contributors: oceanwp, apprimit, wpfleek, freemius
Requires at least: 5.6
Tested up to: 6.5.3
Stable tag: 2.1.3
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

== Description ==

A simple extension to attach the header at the top of your screen with an animation.
This plugin requires the [OceanWP](https://oceanwp.org/) theme to be installed.

== Installation ==

1. Upload `ocean-sticky-header` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Done!

== Frequently Asked Questions ==

= I installed the plugin but it does not work =

This plugin will only work with the [OceanWP](https://oceanwp.org/) theme.

== Changelog ==

= 2.1.3 - MAY 28 2024 =
- Fixed: Not current page anchor links don't open in the same tab.
- Fixed: Compatibility: Ocean Full Screen: Menu anchor links don't function.

= 2.1.2 - MAY 22 2024 =
- Fixed: Page scroll down when using anchor link on a page.

= 2.1.1 - MAY 20 2024 =
- Added: Translations: Portuguese language.
- Updated: Compatibility: WordPress version number.

= 2.1.0 - SEP 6 2023 =
- NEW: Metabox Settings Interface: https://docs.oceanwp.org/category/826-oceanwp-settings
- Updated: Compatibility: WordPress version number.

= 2.0.7 - MAY 23 2023 =
- Added: Compatibility: PHP 8.2.6: Creation of dynamic property Ocean_Sticky_Header::$plugin_path and Ocean_Sticky_Header::$plugin_url is deprecated.

= 2.0.6 - APR 6 2023 =
- Fixed: Anchor is not working when using Sticky header.

= 2.0.5 =
- Improved: Js error in console if using Visual composer tabs element.

= 2.0.4 =
- Improved: Theme Panel.

= 2.0.3 =
- Fixed: Update sticky wrapper height on window resize.

= 2.0.2 =
- Improved: Fade and Slide transition effects.
- Fixed: Shrink Style: logo dimensions after scroll to top.

= 2.0.1 =
- Fixed: Widgets admin page issue.

= 2.0.0 =
- Added: Vanilla JS.

= 1.2.0 =
- Added: Version updated for WordPress 5.4.

= 1.1.11 =
- Fixed: Issue with the logo when scrolling.

= 1.1.10 =
- Fixed: Shrink effect issue.

= 1.1.9 =
- Added: Polish translation, thanks to Fin Fafarafiel.

= 1.1.8 =
- Fixed: Logo that disappears on the Center header style.

= 1.1.7 =
- Added: Function to enable/disable the sticky header via a child theme.
- Fixed: Sticky issue on resize and orientation change.
- Fixed: Mobile logo shrink who disappear.

= 1.1.6 =
- Fixed: Jump header issue on Android.

= 1.1.5 =
- Added: New fields in the Sticky Header tab of the OceanWP Settings metabox to disable the sticky top bar and header per page/post.
- Added: Spanish language, thank you to Angel Julian Mena.
- Deleted: Admin notice if OceanWP is not the theme used.

= 1.1.4 =
- Fixed: Shrink logo is manual sticky.
- Fixed: Capabilities issue in the metabox.
- Deleted: sanitize_callback in the Sticky Logo field to allow you to add SVG logo.

= 1.1.3 =
- Fixed: Menu social issue.

= 1.1.2 =
- Added: Sticky tab in the OceanWP Settings metabox.
- Added: Options in Sticky tab to add a different sticky logo and retina sticky logo per page/post.
- Added: Options in Sticky tab to add a different shrink sticky logo height per page/post.
- Added: Options in Sticky tab to add a different parent menu items color per page/post.
- Tweak: Better approach for the slide sticky effect.
- Tweak: Better approach for the shrink logo effect effect.-Fixed: JS issue if no top bar.-Fixed: JS issue if no top bar.
- Fixed: JS issue if no top bar.

= 1.1.1 =
- Fixed: JS error if no header wrapper.

= 1.1.0 =
- Added: New field that allow you to fix manually an element of your header, perfect if you have created a big header and you only want fix the navigation when scrolling. Learn more: http://docs.oceanwp.org/article/460-sticky-header-for-the-custom-header-style
- Added: Two sticky effects, Slide and Show Up/Hide Down.
- Tweak: Big improvement of the JS code.
- Tweak: Default max height added to the logo for the shrink sticky style, so if your logo is too small, increase the max height in the Header > Logo section of the customizer.
- Fixed: Sticky retina logo alt tag.
- Fixed: Issue with the navigation on the Top Header style.
- Fixed: Issue on Iphone and Ipad.

= 1.0.13 =
- Fixed: Top bar sticky class error.

= 1.0.12 =
- Fixed: Shrink logo with the medium header style and the sticky menu enabled.

= 1.0.11 =
- Fixed: Logo shrink on the Fixed style.

= 1.0.10 =
- Added: French translation, thanks a lot to Jean of freepixel.net.

= 1.0.9 =
- Fixed: Double sticky logo on retina screen.

= 1.0.8 =
- Fixed: Customizer options issue.

= 1.0.7.1 =
- Added: All sanitize_callback for the customizer options.

= 1.0.7 =
- Added: Images control to add a logo when scrolling.
- Fixed: Issue with the shrink effect on the retina logo.
- Tweak: Some customizer options.

= 1.0.6 =
- Tweak: Improved padding fields in the customizer.

= 1.0.5 =
- Tweak: Support OceanWP 1.1.

= 1.0.4 =
- Added: Checkbox option to remove the shadow of the header when scrolling.
- Added: Slider option to add a top and bottom padding at the header when scrolling.
- Added: Color options to customize the header when scrolling.

= 1.0.3 =
- Added: Logo class in the js file for the center header style.

= 1.0.2 =
- Added: CSS for the full screen header style.

= 1.0.1 =
- Deleted: ocean_obj() function, no longer used.

= 1.0.0 =
- Initial release.