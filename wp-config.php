<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */

define( 'DB_NAME', 'ims' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );
define( 'WP_ALLOW_REPAIR', true );
/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'jvvrewkaolla1vr3zjao0xub13la9d7gfqyjy1notahnxkv3bznp0qh7o0nutpyv' );
define( 'SECURE_AUTH_KEY',  'awhd4dcjgda9qdvkfdhkwpaetiqvat1ppugkoer8wo7vti1sdcvf0emk1zwvypyl' );
define( 'LOGGED_IN_KEY',    'vzomqbzbklyne5xu6wvfd70a0azhlmex1r6v6zfpcv88xruqb7t4axmeconujyq4' );
define( 'NONCE_KEY',        'zkohp4qz0qvsx6skr0m1sbgq4a9jeqxgfessw7eehltsbibvt2m1cbx2puyp9d7v' );
define( 'AUTH_SALT',        'gozxgdebgpqx0sy3xa2uorocxak4xwvfvymdtjmljsqmezzla3kldfzkyqreq2sn' );
define( 'SECURE_AUTH_SALT', 'h6wg7fwsc3veijbke3bei7sovboyx5blz9fqlpbx4wbgpi8fu4kxpwe4yh6dff2h' );
define( 'LOGGED_IN_SALT',   'z51le4lns2hwxlk7h8zynqtn5j1oqtwvmogpacluq8cwn6yedcgxf5qtuns2cprm' );
define( 'NONCE_SALT',       'ofl7psff9tgx6bbu1ht45kp2ez45owiheutezljdh3hnrczg0icw8flxv8kvocch' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp5j_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */




// define( 'WP_DEBUG', false );
// define( 'WP_DEBUG_LOG', true );
// define( 'WP_DEBUG_DISPLAY', false );

/* Add any custom values between this line and the "stop editing" line. */

define( 'WP_MAIL_SMTP_AUTH', true );
define( 'WP_MAIL_SMTP_SECURE', 'ssl'); // Set 'tls' or 'ssl'
define( 'WP_MAIL_SMTP_PORT', '465'); // Set port 465 for SSL, or 587 for TLS
define( 'WP_MAIL_SMTP_HOST', 'smtp.gmail.com'); // Replace with your SMTP server
define( 'WP_MAIL_SMTP_USER', ''); // Replace with your email
define( 'WP_MAIL_SMTP_PASS', ''); // Replace with your email password
define( 'WP_MAIL_FROM', ''); // Replace with the email you want to send from
define( 'WP_MAIL_FROM_NAME', 'Indian Massage');

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
