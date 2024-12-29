<?php
/**
 * Template Name: Therapist Registration
 *
 * @package OceanWP WordPress theme
 */
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);
@ini_set('display_errors', 1);
 
// Check if the user is logged in
if (!is_user_logged_in()) {
    wp_redirect(home_url('/login/')); // Redirect to the login page
    exit;
}
 
// Check if the user has the 'therapist' role
$user = wp_get_current_user();
if (!in_array('therapist', (array) $user->roles)) {
    wp_redirect(home_url()); // Redirect to the home page if not a therapist
    exit;
}
 
require_once(ABSPATH . 'wp-admin/includes/file.php');
 
global $wpdb;
$table_name = $wpdb->prefix . 'therapist_registration';

$user_id = get_current_user_id();
$therapist = $wpdb->get_row(
    $wpdb->prepare(
        "SELECT * FROM $table_name WHERE user_id = %d",
        $user_id
    )
);
 
$errors = [];
$uploaded_file_paths = [];
 
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] === 'therapist_registration') {
    $user_id = get_current_user_id();
    $full_name = sanitize_text_field($_POST['full_name']);
    $clinic_address = sanitize_text_field($_POST['clinic_address']);
    $contact_number = sanitize_text_field($_POST['contact_number']);
    $email = sanitize_email($_POST['email']);
    $website_address = sanitize_text_field($_POST['website_address']);
    $write_up = sanitize_textarea_field($_POST['write_up']);
    $treatments_offered = sanitize_text_field($_POST['treatments_offered']);

    // Validate inputs
    $errors = [];
    if (empty($full_name) || !preg_match("/^[a-zA-Z\s]+$/", $full_name)) {
        $errors['full_name'] = "Full Name is required and should contain only letters and spaces.";
    }
    if (empty($clinic_address)) {
        $errors['clinic_address'] = "Clinic Address is required.";
    }
    if (empty($contact_number) || !preg_match("/^[0-9]+$/", $contact_number)) {
        $errors['contact_number'] = "Contact Number is required and should be a valid number.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Valid email is required.";
    }

    // Handle file uploads
    $uploaded_file_paths = [
        'certification' => [],
        'photo' => null,
        'logo' => null
    ];

    if (!empty($_FILES)) {
        add_filter('upload_dir', 'custom_upload_directory');

        foreach ($_FILES as $file_key => $file_array) {
            if ($file_key === 'certification' && !empty($file_array['name'][0])) { // Multiple files for certification
                $allowed_file_types = ['image/jpeg', 'image/png', 'image/gif'];

                foreach ($file_array['name'] as $key => $name) {
                    $file_type = $file_array['type'][$key];

                    if (in_array($file_type, $allowed_file_types)) {
                        $file = [
                            'name'     => $file_array['name'][$key],
                            'type'     => $file_array['type'][$key],
                            'tmp_name' => $file_array['tmp_name'][$key],
                            'error'    => $file_array['error'][$key],
                            'size'     => $file_array['size'][$key],
                        ];

                        $uploaded_file = wp_handle_upload($file, ['test_form' => false]);

                        if (isset($uploaded_file['url'])) {
                            $uploaded_file_paths['certification'][] = $uploaded_file['url'];
                        } else {
                            $errors['certification'] = "Image upload failed: " . $uploaded_file['error'];
                        }
                    } else {
                        $errors['certification'] = "Invalid file type for $name. Only JPG, PNG, and GIF files are allowed.";
                    }
                }
            } else {
                // For single file fields like 'photo' and 'logo'
                if (!empty($file_array['name'])) {
                    $allowed_file_types = ['image/jpeg', 'image/png', 'image/gif'];
                    $file_type = $file_array['type'];

                    if (in_array($file_type, $allowed_file_types)) {
                        $file = [
                            'name'     => $file_array['name'],
                            'type'     => $file_array['type'],
                            'tmp_name' => $file_array['tmp_name'],
                            'error'    => $file_array['error'],
                            'size'     => $file_array['size'],
                        ];

                        $uploaded_file = wp_handle_upload($file, ['test_form' => false]);

                        if (isset($uploaded_file['url'])) {
                            $uploaded_file_paths[$file_key] = $uploaded_file['url'];
                        } else {
                            $errors[$file_key] = "Image upload failed: " . $uploaded_file['error'];
                        }
                    } else {
                        $errors[$file_key] = "Invalid file type for $file_key. Only JPG, PNG, and GIF files are allowed.";
                    }
                }
            }
        }

        remove_filter('upload_dir', 'custom_upload_directory');
    }

    if (empty($errors)) {
        $wpdb->insert(
            $table_name,
            [
                'user_id' => $user_id,
                'full_name' => $full_name,
                'clinic_address' => $clinic_address,
                'contact_number' => $contact_number,
                'email' => $email,
                'website_address' => $website_address,
                'previous_training_certification' => !empty($uploaded_file_paths['certification']) ? implode(',', $uploaded_file_paths['certification']) : null,
                'photo' => $uploaded_file_paths['photo'],
                'logo' => $uploaded_file_paths['logo'],
                'write_up' => $write_up,
                'treatments_offered' => $treatments_offered,
            ],
            ['%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s']
        );

        wp_redirect(home_url('/therapist-registration'));
    }
}
 
 function custom_upload_directory($upload) {
     $upload['subdir'] = '/therapist/certificates' . $upload['subdir'];
     $upload['path'] = $upload['basedir'] . $upload['subdir'];
     $upload['url'] = $upload['baseurl'] . $upload['subdir'];
     return $upload;
 }
?>

<?php include 'custom_navbar.php'; ?>

<style>
    .registration-container {
        display: flex;
        padding: 20px;
        background-color: #f7f7f7;
    }

    .registration-content {
        flex-grow: 1;
        padding: 40px; /* Increased padding for better spacing */
        margin-left: 500px; /* Ensure content starts after sidebar */
        background-color: #fff; /* Form background like other pages */
        border-radius: 10px; /* Rounded corners for the form */
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
        transition: margin-left 0.3s; /* Smooth transition for content margin */
    }

    .registration-form input[type="submit"] {
        background-color: #4CAF50; /* Green background */
        color: white; /* White text */
        padding: 12px 20px; /* Add some padding */
        border: none; /* Remove border */
        border-radius: 5px; /* Rounded corners */
        cursor: pointer; /* Pointer cursor */
        font-size: 16px; /* Increase font size */
        transition: background-color 0.3s; /* Smooth transition for hover */
        margin-top: 20px; /* Add some space above */
    }

    .registration-form input[type="submit"]:hover {
        background-color: #45a049; /* Darker green on hover */
    }


    .form-group {
        display: flex; /* Use flexbox to arrange label and input in a row */
        align-items: center; /* Center the items vertically */
        margin-bottom: 15px; /* Add some space between fields */
        width: 100%;
        max-width: 500px; /* Adjust as needed */
    }

    .form-group label {
        width: 40%; /* Adjust the label width */
        margin-right: 10px; /* Space between label and input */
        font-weight: bold; /* Make the label bold */
    }

    .form-group input[type="text"],
    .form-group input[type="email"],
    .form-group input[type="file"],
    .form-group textarea {
        flex: 1; /* Make the input fields flexible */
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box; /* Ensures padding is included in width */
        transition: border-color 0.3s; /* Smooth transition for input focus */
    }

    .form-group input[type="text"]:focus,
    .form-group input[type="email"]:focus,
    .form-group input[type="file"]:focus,
    .form-group textarea:focus {
        border-color: #4CAF50; /* Green border on focus */
        outline: none; /* Remove default outline */
    }

    .form-group .error {
        color: red; /* Error messages in red */
        margin-left: 50%; /* Align errors with input fields */
        font-size: 12px;
        margin-top: 5px;
    }

    @media (max-width: 768px) {
        .registration-container {
            flex-direction: column; /* Stack content vertically */
        }

        .sidebar {
            width: 100%; /* Full width sidebar on small screens */
            height: auto; /* Adjust height */
            border-right: none; /* Remove border */
            position: relative; /* Relative positioning */
        }

        .registration-content {
            margin-left: 0; /* Remove left margin */
        }

        .navbar .collapse-btn {
            display: block; /* Show collapse button */
        }
    }

    .error{
        color: red;
    }

</style>

<div class="registration-container">
    <div class="registration-content">
        <div class="registration-form">
            <h1>Therapist Registration</h1>
            <?php if ($therapist): ?>
        <p><strong>Full Name:</strong> <?php echo esc_html($therapist->full_name); ?></p>
        <p><strong>Clinic Address:</strong> <?php echo esc_html($therapist->clinic_address); ?></p>
        <p><strong>Contact Number:</strong> <?php echo esc_html($therapist->contact_number); ?></p>
        <p><strong>Email:</strong> <?php echo esc_html($therapist->email); ?></p>
        <p><strong>Website Address:</strong> <?php echo esc_html($therapist->website_address); ?></p>

        <?php if ($therapist->photo): ?>
            <p><strong>Photo:</strong></p>
            <img src="<?php echo esc_url($therapist->photo); ?>" alt="Photo" style="height: 200px;width:200px">
        <?php endif; ?>

        <?php if ($therapist->logo): ?>
            <p><strong>Logo:</strong></p>
            <img src="<?php echo esc_url($therapist->logo); ?>" alt="Logo"  style="height: 200px;width:200px">
        <?php endif; ?>

        <?php if ($therapist->previous_training_certification): ?>
            <p><strong>Previous Training / Certification:</strong></p>
            <?php foreach (explode(',', $therapist->previous_training_certification) as $certification_url): ?>
                <img src="<?php echo esc_url($certification_url); ?>" alt="Certification" style="max-width: 200px; margin-right: 10px;">
            <?php endforeach; ?>
        <?php endif; ?>

        <p><strong>Their Write Up:</strong></p>
        <p><?php echo nl2br(esc_html($therapist->write_up)); ?></p>

        <p><strong>Treatments Offered:</strong> <?php echo esc_html($therapist->treatments_offered); ?></p>

    <?php else: ?>

            <form action="<?php echo htmlspecialchars($_SERVER['REQUEST_URI']); ?>" method="post" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="full_name">Full Name:</label>
                    <input type="text" id="full_name" name="full_name">
                </div>
                <div class="error"><?php echo $errors['full_name'] ?? ''; ?></div>

                <div class="form-group">
                    <label for="clinic_address">Clinic Address:</label>
                    <input type="text" id="clinic_address" name="clinic_address">
                </div>
                <div class="error"><?php echo $errors['clinic_address'] ?? ''; ?></div>

                <div class="form-group">
                    <label for="contact_number">Contact Number:</label>
                    <input type="text" id="contact_number" name="contact_number">
                </div>
                <div class="error"><?php echo $errors['contact_number'] ?? ''; ?></div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email">
                </div>
                <div class="error"><?php echo $errors['email'] ?? ''; ?></div>

                <div class="form-group">
                    <label for="website_address">Website Address:</label>
                    <input type="text" id="website_address" name="website_address">
                </div>

                <div class="form-group">
                    <label for="certification">Previous Training / Certification:</label>
                    <input type="file" id="certification" name="certification[]" multiple>
                </div>
                <div class="error"><?php echo $errors['certification'] ?? ''; ?></div>

                <div class="form-group">
                    <label for="photo">Photo:</label>
                    <input type="file" id="photo" name="photo" >
                </div>

                <div class="form-group">
                    <label for="logo">Their Logo:</label>
                    <input type="file" id="logo" name="logo">
                </div>

                <div class="form-group">
                    <label for="write_up">Their Write Up:</label>
                    <textarea id="write_up" name="write_up"></textarea>
                </div>

                <div class="form-group">
                    <label for="treatments_offered">Treatments Offered:</label>
                    <input type="text" id="treatments_offered" name="treatments_offered">
                </div>

                <input type="hidden" name="action" value="therapist_registration">
                <input type="hidden" name="user_id" value="<?php echo get_current_user_id(); ?>">

                <!-- Submit Button -->
                <input type="submit" class="btn btn-primary" value="Submit Registration">
            </form>
        <?php endif; ?>
        </div>
    </div>
</div>

<?php wp_footer(); ?>
</body>
</html>