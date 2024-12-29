<?php
/*
Template Name: School Registration
Description: Creates a custom table for therapist registration.
Version: 1.0
Author: Your Name
*/

define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);
@ini_set('display_errors', 1);

require_once(ABSPATH . 'wp-admin/includes/file.php');

global $wpdb;
$school_table = $wpdb->prefix . 'school_registration';


// Check if the user is logged in
if (!is_user_logged_in()) {
    wp_redirect(home_url('/login/')); // Redirect to the login page
    exit;
}

// Check if the user has the 'school' role
$user = wp_get_current_user();
if (!in_array('schoolmassage', (array) $user->roles)) {
    wp_redirect(home_url()); // Redirect to the home page if not a school user
    exit;
}

$user_id = get_current_user_id();
$registration = $wpdb->get_row($wpdb->prepare("SELECT * FROM $school_table WHERE user_id = %d", $user_id));

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] === 'school_registration') {
    // Sanitize and validate input data
    $user_id = get_current_user_id();
    $full_name = sanitize_text_field($_POST['full_name_applicant']);
    $company_position = sanitize_text_field($_POST['company_position']);
    $clinic_address = sanitize_text_field($_POST['clinic_address']);
    $contact_number = sanitize_text_field($_POST['contact_number']);
    $main_email = sanitize_email($_POST['main_email']);
    $website_address = sanitize_text_field($_POST['website_address']);
    $type_of_training = sanitize_textarea_field($_POST['type_of_training']);
    $method_of_delivery = sanitize_textarea_field($_POST['method_of_delivery']);
    $write_up = sanitize_textarea_field($_POST['write_up']);
    $training_offered = sanitize_textarea_field($_POST['training_offered']);
    $number_of_lecturers = (int)$_POST['number_of_lecturers'];

    if (empty($full_name) || !preg_match("/^[a-zA-Z\s]+$/", $full_name)) {
        $errors['full_name_applicant'] = "Full Name is required and should contain only letters and spaces.";
    }

    if (empty($company_position)) {
        $errors['company_position'] = "Company Position is required.";
    }

    if (empty($clinic_address)) {
        $errors['clinic_address'] = "Clinic Address is required.";
    }

    if (empty($contact_number) || !preg_match("/^[0-9]+$/", $contact_number)) {
        $errors['contact_number'] = "Contact Number is required and should be a valid number.";
    }

    if (empty($main_email) || !filter_var($main_email, FILTER_VALIDATE_EMAIL)) {
        $errors['main_email'] = "Valid email is required.";
    }

    // Handle logo upload
    if (!empty($_FILES['logo']['name'])) {
        $allowed_file_types = ['image/jpeg', 'image/png', 'image/gif'];
        $file_type = $_FILES['logo']['type'];

        if (in_array($file_type, $allowed_file_types)) {
            $logo_upload = wp_handle_upload($_FILES['logo'], ['test_form' => false]);
            if (isset($logo_upload['url'])) {
                $uploaded_file_paths['logo'] = $logo_upload['url'];
            } else {
                $errors['logo'] = 'Error uploading logo: ' . $logo_upload['error'];
            }
        } else {
            $errors['logo'] = 'Invalid file type for logo. Only JPG, PNG, and GIF files are allowed.';
        }
    }

     // Handle training facility pictures upload (multiple files)
     if (!empty($_FILES['training_facility_pictures']['name'][0])) {
        $files = $_FILES['training_facility_pictures'];
        $allowed_file_types = ['image/jpeg', 'image/png', 'image/gif'];

        foreach ($files['name'] as $key => $name) {
            $file_type = $files['type'][$key];

            if (in_array($file_type, $allowed_file_types)) {
                $file = [
                    'name' => $files['name'][$key],
                    'type' => $files['type'][$key],
                    'tmp_name' => $files['tmp_name'][$key],
                    'error' => $files['error'][$key],
                    'size' => $files['size'][$key],
                ];

                $upload = wp_handle_upload($file, ['test_form' => false]);

                if (isset($upload['url'])) {
                    $uploaded_file_paths['training_facility_pictures'][] = $upload['url'];
                } else {
                    $errors['training_facility_pictures'] = 'Error uploading file: ' . $upload['error'];
                }
            } else {
                $errors['training_facility_pictures'] = "Invalid file type for $name. Only JPG, PNG, and GIF files are allowed.";
            }
        }
    }

    if (empty($errors)) {
        // Insert data into the database
        $wpdb->insert(
            $school_table,
            [
                'user_id' => $user_id,
                'full_name_applicant' => $full_name,
                'company_position' => $company_position,
                'clinic_address' => $clinic_address,
                'contact_number' => $contact_number,
                'main_email' => $main_email,
                'website_address' => $website_address,
                'training_facility_pictures' => !empty($uploaded_file_paths['training_facility_pictures']) ? implode(',', $uploaded_file_paths['training_facility_pictures']) : null,
                'type_of_training' => $type_of_training,
                'method_of_delivery' => $method_of_delivery,
                'logo' => $uploaded_file_paths['logo'],
                'write_up' => $write_up,
                'training_offered' => $training_offered,
                'number_of_lecturers' => $number_of_lecturers,
            ],
            ['%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d']
        );

        echo "School Registration successfully saved!";
    }
}


?>
<?php include 'custom_navbar.php'; ?>
<style>
    
    .registration-content {
        flex-grow: 1;
        padding: 20px;
    }
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
    <h1>School Registration</h1>
    <?php if ($registration): ?>
        <div class="registration-view">
            <p><strong>Full Name:</strong> <?php echo esc_html($registration->full_name_applicant); ?></p>
            <p><strong>Company Position:</strong> <?php echo esc_html($registration->company_position); ?></p>
            <p><strong>Clinic Address:</strong> <?php echo esc_html($registration->clinic_address); ?></p>
            <p><strong>Contact Number:</strong> <?php echo esc_html($registration->contact_number); ?></p>
            <p><strong>Main Email:</strong> <?php echo esc_html($registration->main_email); ?></p>
            <p><strong>Website Address:</strong> <?php echo esc_html($registration->website_address); ?></p>
            <p><strong>Type of Training:</strong> <?php echo nl2br(esc_html($registration->type_of_training)); ?></p>
            <p><strong>Method of Delivery:</strong> <?php echo nl2br(esc_html($registration->method_of_delivery)); ?></p>
            <p><strong>Write-Up:</strong> <?php echo nl2br(esc_html($registration->write_up)); ?></p>
            <p><strong>Training Offered:</strong> <?php echo nl2br(esc_html($registration->training_offered)); ?></p>
            <p><strong>Number of Lecturers:</strong> <?php echo esc_html($registration->number_of_lecturers); ?></p>
            <?php if ($registration->logo): ?>
                <p><strong>Logo:</strong></p>
                <img src="<?php echo esc_url($registration->logo); ?>" alt="Logo" style="max-width: 200px;">
            <?php endif; ?>
            <?php if ($registration->training_facility_pictures): ?>
                <p><strong>Training Facility Pictures:</strong></p>
                <?php foreach (explode(',', $registration->training_facility_pictures) as $picture_url): ?>
                    <img src="<?php echo esc_url($picture_url); ?>" alt="Training Facility Picture" style="max-width: 200px; margin-right: 10px;">
                <?php endforeach; ?>
            <?php endif; ?>
        </div>


    <?php else: ?>
            <!-- Main Content Area with Registration Form -->
            
            
        <form action="<?php echo htmlspecialchars($_SERVER['REQUEST_URI']); ?>" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="full_name_applicant">Full Name Applicant:</label>
                <input type="text" id="full_name_applicant" name="full_name_applicant" value="<?php echo isset($_POST['full_name_applicant']) ? esc_attr($_POST['full_name_applicant']) : ''; ?>">
            <div class="error"><?php echo $errors['full_name_applicant'] ?? ''; ?></div>
            

            <!-- Company Position -->
            <div class="form-group">
                <label for="company_position">Company Position:</label>
                <input type="text" id="company_position" name="company_position" value="<?php echo isset($_POST['company_position']) ? esc_attr($_POST['company_position']) : ''; ?>">
                <div class="error"><?php echo $errors['company_position'] ?? ''; ?></div>
            </div>

            <!-- Clinic Address -->
            <div class="form-group">
                <label for="clinic_address">Clinic Address:</label>
                <input type="text" id="clinic_address" name="clinic_address" value="<?php echo isset($_POST['clinic_address']) ? esc_attr($_POST['clinic_address']) : ''; ?>">
                <div class="error"><?php echo $errors['clinic_address'] ?? ''; ?></div>
            </div>

            <!-- Contact Number -->
            <div class="form-group">
                <label for="contact_number">Contact Number:</label>
                <input type="text" id="contact_number" name="contact_number" value="<?php echo isset($_POST['contact_number']) ? esc_attr($_POST['contact_number']) : ''; ?>">
                <div class="error"><?php echo $errors['contact_number'] ?? ''; ?></div>
            </div>

            <!-- Main Email -->
            <div class="form-group">
                <label for="main_email">Main Email:</label>
                <input type="email" id="main_email" name="main_email" value="<?php echo isset($_POST['main_email']) ? esc_attr($_POST['main_email']) : ''; ?>">
                <div class="error"><?php echo $errors['main_email'] ?? ''; ?></div>
            </div>

            <!-- Website Address -->
            <div class="form-group">
                <label for="website_address">Website Address:</label>
                <input type="text" id="website_address" name="website_address" value="<?php echo isset($_POST['website_address']) ? esc_attr($_POST['website_address']) : ''; ?>">
            </div>

            <!-- Logo Upload -->
            <div class="form-group">
                <label for="logo">Logo:</label>
                <input type="file" id="logo" name="logo">
                <div class="error"><?php echo $upload_errors['logo'] ?? ''; ?></div>
            </div>

            <!-- Training Facility Pictures -->
            <div class="form-group">
                <label for="training_facility_pictures">Training Facility Pictures:</label>
                <input type="file" id="training_facility_pictures" name="training_facility_pictures[]" multiple>
            </div>

            <!-- Type of Training -->
            <div class="form-group">
                <label for="type_of_training">Type of Training:</label>
                <textarea id="type_of_training" name="type_of_training"><?php echo isset($_POST['type_of_training']) ? esc_textarea($_POST['type_of_training']) : ''; ?></textarea>
            </div>

            <!-- Method of Delivery -->
            <div class="form-group">
                <label for="method_of_delivery">Method of Delivery:</label>
                <textarea id="method_of_delivery" name="method_of_delivery"><?php echo isset($_POST['method_of_delivery']) ? esc_textarea($_POST['method_of_delivery']) : ''; ?></textarea>
            </div>

            <!-- Write Up -->
            <div class="form-group">
                <label for="write_up">Write Up:</label>
                <textarea id="write_up" name="write_up"><?php echo isset($_POST['write_up']) ? esc_textarea($_POST['write_up']) : ''; ?></textarea>
            </div>

            <!-- Training Offered -->
            <div class="form-group">
                <label for="training_offered">Training Offered:</label>
                <textarea id="training_offered" name="training_offered"><?php echo isset($_POST['training_offered']) ? esc_textarea($_POST['training_offered']) : ''; ?></textarea>
            </div>

            <!-- Number of Lecturers -->
            <div class="form-group">
                <label for="number_of_lecturers">Number of Lecturers:</label>
                <input type="number" id="number_of_lecturers" name="number_of_lecturers" value="<?php echo isset($_POST['number_of_lecturers']) ? esc_attr($_POST['number_of_lecturers']) : 0; ?>">
            </div>

            <!-- Hidden Inputs -->
            <input type="hidden" name="action" value="school_registration">
            <input type="hidden" name="user_id" value="<?php echo get_current_user_id(); ?>">

            <!-- Submit Button -->
            <input type="submit" class="btn btn-primary" value="Submit Registration">

                    
        </form>
</div>

    <?php endif; ?>