<?php
require_once('../../config.php');

// Set up the Moodle page
$PAGE->set_url(new moodle_url('/local/moddesigner/index.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title('Module Designer');
$PAGE->set_heading('Module Designer');

// Require JavaScript for Vue App
$PAGE->requires->js_call_amd('local_moddesigner/bundle', 'init');

echo $OUTPUT->header();

// Render the Mustache template for mounting Vue
echo $OUTPUT->render_from_template('local_moddesigner/app_mount', []);

echo $OUTPUT->footer();
