<?php
/**
 * Template Name: School List
 *
 * @package OceanWP WordPress theme
 */
?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>School List</title>
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
                display: block; /* Ensures that the <a> wraps the card properly without adding extra space */
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
        </style>
    </head>
    <?php
    global $wpdb;
    $table_name = $wpdb->prefix . 'school_registration'; // Adjust this to your actual table name

    // Query to get all schools
    $schools = $wpdb->get_results("SELECT * FROM $table_name");

    if ($schools) {
    ?>

    <body style="margin-top:60px;">
        <h1 style="margin-left:60px;">School List</h1>
        <div>
            <section>

                <?php foreach ($schools as $school): ?>
                    <article class="card">
                        <a href="<?php echo esc_url(home_url('/school-details/?school_id=' . $school->id)); ?>">
                            <figure class="card-img">
                                <img src="<?php echo esc_url($school->logo); ?>" />
                            </figure>
                            <div class="card-body">
                                <h2 class="card-title"><?php echo esc_html($school->full_name_applicant); ?></h2>
                                <p class="card-text"><?php echo esc_html($school->clinic_address); ?></p>
                            </div>
                        </a>
                    </article>
                <?php endforeach; ?>
            <?php
        } else {
            echo '<p>No schools found.</p>';
        }
            ?>
            </section>
        </div>


    </body>

</html>