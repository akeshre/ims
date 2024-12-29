<?php
/*
Plugin Name: Therapist List
Description: add therapist list.
Version: 1.0
Author: Your Name
*/

// Add custom shortcode
function custom_therapist_list()
{
    ob_start();

    global $wpdb;
    $table_name = $wpdb->prefix . 'therapist_registration';

    // Get the latest 3 therapists
    $therapists = $wpdb->get_results("SELECT * FROM $table_name where approval_status='approved' ORDER BY id DESC LIMIT 3");
    
    if (!empty($therapists)) {
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
        <span class="category-name">Therapist List</span>
        <section>
            <?php foreach ($therapists as $therapist): ?>
            <a href="<?php echo esc_url(home_url('/therapist-detail/?therapist_id=' . $therapist->id)); ?>">
                <article class="card">
                    <figure class="card-img">
                        <?php if (!empty($therapist->photo)): ?>
                            <img src="<?php echo esc_url($therapist->photo); ?>" />
                        <?php else: ?>
                            <img src="http://indianmassageweb.free.nf/wp-content/uploads/2024/10/default_therapist.jpg" />
                        <?php endif; ?>
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title"><?php echo esc_html($therapist->full_name); ?></h2>
                        <p class="card-text"><?php echo esc_html($therapist->treatments_offered); ?></p>
                    </div>
                </article>
            </a>
            <?php endforeach; ?>
        </section>
        <div style="text-align: right; margin-top: 20px;">
            <a href="/therapists/" style="padding: 10px 15px; background-color: #0073aa; color: white; border: none; border-radius: 5px; cursor: pointer; text-decoration: none;">
                Display All
            </a>
        </div>
    </body>

    </html>

<?php
    }
    return ob_get_clean();
}

add_shortcode('custom_therapist_list', 'custom_therapist_list');
