<?php
/**
 * Template Name: Therapist Detail
 *
 * @package OceanWP WordPress theme
 */

// get_header(); 

$therapist_id = isset($_GET['therapist_id']) ? intval($_GET['therapist_id']) : 0;
if ($therapist_id) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'therapist_registration';

    // Query to get the therapist details
    $therapist = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $therapist_id));

    if ($therapist) {
        ?>
        <div class="container">
            <div class="therapist-detail-page">
                <h1 class="therapist-name"><?php echo esc_html($therapist->full_name); ?></h1>
                
                <div class="therapist-details-grid">
                    <div class="therapist-image">
                        <img src="<?php echo esc_url($therapist->previous_training_certification); ?>" alt="<?php echo esc_attr($therapist->full_name); ?>" />
                    </div>
                    <div class="therapist-info">
                        <p><strong>Clinic Address:</strong> <?php echo esc_html($therapist->clinic_address); ?></p>
                        <p><strong>Contact Number:</strong> <?php echo esc_html($therapist->contact_number); ?></p>
                        <p><strong>Email:</strong> <?php echo esc_html($therapist->email); ?></p>
                        <p><strong>Website:</strong> <a href="<?php echo esc_url($therapist->website_address); ?>" target="_blank"><?php echo esc_html($therapist->website_address); ?></a></p>
                        <p><strong>Treatments Offered:</strong> <?php echo esc_html($therapist->treatments_offered); ?></p>
                        <p><strong>Previous Training:</strong><br/> <img src="<?php echo esc_html($therapist->previous_training_certification); ?>" style="height:200px;width:200px" /></p>
                        <p><strong>Write-up:</strong> <?php echo esc_html($therapist->write_up); ?></p>
                    </div>
                </div>
            </div>
        </div>

        <style>
            #site-navigation-wrap{
                display:none;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }
            .therapist-detail-page {
                text-align: center;
            }
            .therapist-details-grid {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: flex-start;
                gap: 20px;
                margin-top: 20px;
            }
            .therapist-image img {
                max-width: 300px;
                width: 100%;
                height: auto;
                border-radius: 8px;
            }
            .therapist-info {
                flex: 1;
                max-width: 600px;
                text-align: left;
            }
            .therapist-info p {
                font-size: 18px;
                line-height: 1.6;
            }
            .therapist-info a {
                color: #0073aa;
                text-decoration: none;
            }
            .therapist-info a:hover {
                text-decoration: underline;
            }
            @media (max-width: 768px) {
                .therapist-details-grid {
                    flex-direction: column;
                    align-items: center;
                }
            }
        </style>

        <?php
    } else {
        echo '<p>Therapist not found.</p>';
    }
} else {
    echo '<p>No therapist selected.</p>';
}

// get_footer(); 
