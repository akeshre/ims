<?php
/*
Template Name: School Therapist Registration
Description: Creates a custom table for school therapist registration.
Version: 1.0
Author: Your Name
*/

define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);
@ini_set('display_errors', 1);

require_once(ABSPATH . 'wp-admin/includes/file.php');

global $wpdb;
$school_therapist_table = $wpdb->prefix . 'school_lecturer_details';

$errors = [];

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
$school_table = $wpdb->prefix . 'school_registration';

$school_id = $wpdb->get_var(
    $wpdb->prepare(
        "SELECT id FROM $school_table WHERE user_id = %d",
        $current_user_id
    )
);

// $therapist = $wpdb->get_row(
//     $wpdb->prepare(
//         "SELECT * FROM $school_therapist_table WHERE school_id = %d",
//         $school_id
//     )
// );

// Process the form submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] === 'therapist_registration') {
    $therapist_name = sanitize_text_field($_POST['therapist_name']);
    $therapist_previous_training = sanitize_textarea_field($_POST['therapist_previous_training']);
    $specialties = sanitize_textarea_field($_POST['specialties']);

    // Handle logo upload
    $logo_url = '';
    if (isset($_FILES['logo']) && !empty($_FILES['logo']['name'])) {
        $uploadedfile = $_FILES['logo'];
        $upload_overrides = ['test_form' => false];
        $movefile = wp_handle_upload($uploadedfile, $upload_overrides);

        if ($movefile && !isset($movefile['error'])) {
            $logo_url = $movefile['url'];
        } else {
            $errors['logo'] = "Logo upload failed: " . $movefile['error'];
        }
    }

    // Handle multiple certificates upload
    $certificate_urls = [];
    if (isset($_FILES['certificates']) && !empty($_FILES['certificates']['name'][0])) {
        foreach ($_FILES['certificates']['name'] as $key => $value) {
            if (!empty($_FILES['certificates']['name'][$key])) {
                $file = [
                    'name' => $_FILES['certificates']['name'][$key],
                    'type' => $_FILES['certificates']['type'][$key],
                    'tmp_name' => $_FILES['certificates']['tmp_name'][$key],
                    'error' => $_FILES['certificates']['error'][$key],
                    'size' => $_FILES['certificates']['size'][$key],
                ];
                $upload_overrides = ['test_form' => false];
                $upload_result = wp_handle_upload($file, $upload_overrides);

                if ($upload_result && !isset($upload_result['error'])) {
                    $certificate_urls[] = $upload_result['url'];
                } else {
                    $errors['certificates'] = "One or more certificate uploads failed: " . $upload_result['error'];
                }
            }
        }
    }

    // Validate inputs
    if (empty($therapist_name) || !preg_match("/^[a-zA-Z\s]+$/", $therapist_name)) {
        $errors['therapist_name'] = "Therapist Name is required and should contain only letters and spaces.";
    }

    if (empty($specialties)) {
        $errors['specialties'] = "Specialties are required.";
    }

    // If no errors, insert data into the database
    if (empty($errors)) {
        $wpdb->insert(
            $school_therapist_table,
            [
                'school_id' => $school_id,
                'lecturer_name' => $therapist_name,
                'lecturer_previous_training' => $therapist_previous_training,
                'subjects_they_teach' => $specialties,
                'logo' => $logo_url,
                'lecturer_previous_certification' => implode(',', $certificate_urls),
            ],
            ['%d', '%s', '%s', '%s', '%s', '%s']
        );

        wp_redirect(home_url('/school-therapist/'));
    } else {
        // Display errors
        foreach ($errors as $key => $error) {
            echo '<p class="error">' . $error . '</p>';
        }
    }
}
?>

<?php include 'custom_navbar.php'; ?>

<!-- Therapist Registration Form -->
<style>
    .registration-form {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ddd;
        background-color: #fff;
        border-radius: 8px;
    }
    .registration-form h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }
    .registration-form label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }
    .registration-form input,
    .registration-form textarea {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    .registration-form input[type="submit"] {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        border-radius: 4px;
        font-size: 16px;
    }
    .registration-form input[type="submit"]:hover {
        background-color: #45a049;
    }
    .error {
        color: red;
        margin-bottom: 15px;
    }
</style>

<div class="registration-form">
    <h1>School Therapist Registration</h1>
    
        <form action="<?php echo esc_url($_SERVER['REQUEST_URI']); ?>" method="post" enctype="multipart/form-data">
            <label for="therapist_name">Therapist Name:</label>
            <input type="text" id="therapist_name" name="therapist_name" value="<?php echo esc_attr($_POST['therapist_name'] ?? ''); ?>">
            <div class="error"><?php echo $errors['therapist_name'] ?? ''; ?></div>

            <label for="therapist_previous_training">Previous Training:</label>
            <textarea id="therapist_previous_training" name="therapist_previous_training"><?php echo esc_textarea($_POST['therapist_previous_training'] ?? ''); ?></textarea>

            <label for="specialties">Specialties:</label>
            <textarea id="specialties" name="specialties"><?php echo esc_textarea($_POST['specialties'] ?? ''); ?></textarea>
            <div class="error"><?php echo $errors['specialties'] ?? ''; ?></div>

            <label for="logo">Upload Logo:</label>
            <input type="file" id="logo" name="logo">

            <label for="certificates">Upload Certificates (Multiple):</label>
            <input type="file" id="certificates" name="certificates[]" multiple>

            <input type="hidden" name="action" value="therapist_registration">
            <input type="submit" value="Register">
        </form>
    
</div>
