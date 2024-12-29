<?php
/**
 * Template Name: School Detail
 *
 * @package OceanWP WordPress theme
 */


 $school_id = isset($_GET['school_id']) ? intval($_GET['school_id']) : 0;

if ($school_id) {
    global $wpdb;
    $school_table = $wpdb->prefix . 'school_registration'; // Adjust your school table name
    $lecturer_table = $wpdb->prefix . 'lecturer_registration'; // Adjust your lecturer table name

    // Query to get the school details
    $school = $wpdb->get_row($wpdb->prepare("SELECT * FROM $school_table WHERE id = %d", $school_id));

    if ($school) {
?>

<div class="container">
            <div class="therapist-detail-page">
                <h1 class="therapist-name"><?php echo esc_html($therapist->full_name); ?></h1>
                
                <div class="therapist-details-grid">
                    <div class="therapist-image">
                        <img src="<?php echo esc_url($school->logo); ?>" alt="<?php echo esc_attr($school->full_name_applicant); ?>" />
                    </div>
                    <div class="therapist-info">
                    <p><strong>Clinic Address:</strong> <?php echo esc_html($school->clinic_address); ?></p>
                    <p><strong>Contact Number:</strong> <?php echo esc_html($school->contact_number); ?></p>
                    <p><strong>Email:</strong> <?php echo esc_html($school->main_email); ?></p>
                    <p><strong>Website:</strong> <a href="<?php echo esc_url($school->website_address); ?>" target="_blank"><?php echo esc_html($school->website_address); ?></a></p>
                    <p><strong>Type of Training:</strong> <?php echo esc_html($school->type_of_training); ?></p>
                    <p><strong>Method of Delivery:</strong> <?php echo esc_html($school->method_of_delivery); ?></p>
                    <p><strong>Training Offered:</strong> <?php echo esc_html($school->training_offered); ?></p>
                    <p><strong>Number of Lecturers:</strong> <?php echo esc_html($school->number_of_lecturers); ?></p>
                    <p><?php echo esc_html($school->write_up); ?></p>
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
        echo '<p>School not found.</p>';
    }
} else {
    echo '<p>No School selected.</p>';
}