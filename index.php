<?php
require_once('../../config.php');

// Set up the Moodle page
$PAGE->set_url(new moodle_url('/local/moddesigner/index.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title('Module Designer');
$PAGE->set_heading('Module Designer');

// Require JavaScript for Vue App
$PAGE->requires->js_call_amd('local_moddesigner/designer', 'init');

echo $OUTPUT->header();

// Vue mount point
echo '<div id="app"></div>';

echo $OUTPUT->footer();
