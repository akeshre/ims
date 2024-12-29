<?php
/*
Template Name: School Therapist List
Description: Displays the list of therapists and provides an option to add more if needed.
Version: 1.0
Author: Your Name
*/

define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);
@ini_set('display_errors', 1);

global $wpdb;
$school_therapist_table = $wpdb->prefix . 'school_lecturer_details';
$school_table = $wpdb->prefix . 'school_registration';

// Check if the user is logged in
if (!is_user_logged_in()) {
    wp_redirect(home_url('/login/'));
    exit;
}

// Check if the user has the 'schoolmassage' role
$user = wp_get_current_user();
if (!in_array('schoolmassage', (array) $user->roles)) {
    wp_redirect(home_url());
    exit;
}

$current_user_id = get_current_user_id();

// Get the school ID
$school_id = $wpdb->get_var(
    $wpdb->prepare(
        "SELECT id FROM $school_table WHERE user_id = %d",
        $current_user_id
    )
);

// Count the total number of lecturers allowed (for example, this is a hardcoded value; replace it with your logic if necessary)
$total_lecturers_allowed = $wpdb->get_var(
    $wpdb->prepare(
        "SELECT number_of_lecturers FROM $school_table WHERE id = %d",
        $school_id
    )
);

// Count the number of therapists already registered
$therapists_count = $wpdb->get_var(
    $wpdb->prepare(
        "SELECT COUNT(*) FROM $school_therapist_table WHERE school_id = %d",
        $school_id
    )
);

// Calculate the remaining slots
$remaining_slots = $total_lecturers_allowed - $therapists_count;
?>

<?php include 'custom_navbar.php'; ?>

<!-- Therapist List and Add New Button -->
<style>
    .therapist-list {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ddd;
        background-color: #fff;
        border-radius: 8px;
    }
    .therapist-list h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }
    .therapist-list table {
        width: 100%;
        border-collapse: collapse;
    }
    .therapist-list table, .therapist-list th, .therapist-list td {
        border: 1px solid #ddd;
    }
    .therapist-list th, .therapist-list td {
        padding: 10px;
        text-align: left;
    }
    .therapist-list th {
        background-color: #f4f4f4;
    }
    .add-new-button {
        display: flex;
        justify-content: flex-end;
        margin: 20px 0;
    }
    .add-new-button a {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 4px;
        font-size: 16px;
    }
    .add-new-button a:hover {
        background-color: #45a049;
    }
</style>

<div class="therapist-list">
    <h1>School Therapists</h1>
    <p><strong>Registered Therapists:</strong> <?php echo esc_html($therapists_count); ?> / <?php echo esc_html($total_lecturers_allowed); ?></p>
    <?php if ($remaining_slots > 0): ?>
        <div class="add-new-button">
            <a href="<?php echo esc_url(home_url('/school-therapist-registration/')); ?>">Add New Therapist</a>
        </div>
    <?php else: ?>
        <p>All available therapist slots are filled.</p>
    <?php endif; ?>
    <?php if ($therapists_count > 0): ?>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Previous Training</th>
                    <th>Specialties</th>
                    <th>Logo</th>
                    <th>Certifications</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $therapists = $wpdb->get_results(
                    $wpdb->prepare(
                        "SELECT * FROM $school_therapist_table WHERE school_id = %d",
                        $school_id
                    )
                );
                foreach ($therapists as $therapist):
                ?>
                    <tr>
                        <td><?php echo esc_html($therapist->lecturer_name); ?></td>
                        <td><?php echo nl2br(esc_html($therapist->lecturer_previous_training)); ?></td>
                        <td><?php echo nl2br(esc_html($therapist->subjects_they_teach)); ?></td>
                        <td>
                            <?php if ($therapist->logo): ?>
                                <img src="<?php echo esc_url($therapist->logo); ?>" alt="Logo" style="width:100px;">
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if ($therapist->lecturer_previous_certification): ?>
                                <?php foreach (explode(',', $therapist->lecturer_previous_certification) as $certificate_url): ?>
                                    <img src="<?php echo esc_url($certificate_url); ?>" alt="Certificate" style="max-width: 100px; margin-right: 10px;">
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php else: ?>
        <p>No therapists registered yet.</p>
    <?php endif; ?>

    <!-- Show the Add New button if there are remaining slots -->
    
</div>
