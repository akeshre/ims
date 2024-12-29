<?php
/*
Plugin Name: School List
Description: View school list.
Version: 1.0
Author: Your Name
*/

// Add custom shortcode
function custom_school_list()
{
    ob_start();

    global $wpdb;
    $table_name = $wpdb->prefix . 'school_registration';

    // Query to get the latest 3 schools
    $latest_schools = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC LIMIT 3");
    if (!empty($latest_schools)) {
?>

<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>

        <style>
            *,
            *::before,
            *::after {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :root {
                --pmcolor: #f1f0f9;
                --sdcolor: #fefefe;
                --ttcolor: #2e2e2e;
            }

            html,
            body {
                width: 100%;
                height: 100vh;
                font-family: "Poppins", sans-serif;
                color: var(--ttcolor);
                background-color: var(--pmcolor);
            }

            a {
                color: inherit;
                text-decoration: none;
            }

            section {
                --space: 1.25rem;
                width: 90%;
                margin: 2rem auto;
                display: grid;
                gap: var(--space);
                grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
            }

            .card {
                width: 100%;
                cursor: default;
                padding: var(--space);
                border-radius: 0.25rem;
                background-color: var(--sdcolor);
                transition: transform 0.3s ease-in-out;
            }

            .card:hover {
                transform: translateY(-0.5rem);
            }

            .card-img {
                width: 100%;
                height: 15rem;
                overflow: hidden;
                position: relative;
                border-radius: 0.25rem;
            }

            .card-img img {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: cover;
                object-position: center;
            }

            .card-img figcaption {
                background-color: var(--ttcolor);
                color: var(--sdcolor);
                font-size: 0.85rem;
                padding: 0.5rem 0.75rem;
                width: 100%;
                position: absolute;
                bottom: 0;
            }

            .card-title {
                text-transform: capitalize;
                margin: 0.75rem 0;
            }

            .category-name {
                font-family: sans-serif;
                width: -webkit-fill-available;
                text-align: center;
                font-size: 40px;
                margin-bottom: 50px;
            }
        </style>
    </head>

    <body>
        <span class="category-name">School List</span>
        <section>
            <?php foreach ($latest_schools as $school): ?>
                <a href="<?php echo esc_url(home_url('/school-details/?school_id=' . $school->id)); ?>">
                <article class="card">
                    <figure class="card-img">
                    <img src="<?php echo esc_url($school->logo); ?>" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title"><?php echo esc_html($school->full_name_applicant); ?></h2>
                        <p class="card-text"><?php echo esc_html($school->clinic_address); ?></p>
                    </div>
                </article>
            </a>
            <?php endforeach; ?>
        </section>
        <div style="text-align: right; margin-top: 20px;">
            <a href="/schools/" style="padding: 10px 15px; background-color: #0073aa; color: white; border: none; border-radius: 5px; cursor: pointer; text-decoration: none;">
                Display All
            </a>
        </div>
    </body>

    </html>


<?php
    }
    return ob_get_clean();
}

add_shortcode('custom_school_list', 'custom_school_list');