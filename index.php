<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 *
 * This file gathers data to index page of Module Designer.
 * 
 * @package    local_moddesigner        // Replace with your plugin type and name
 * @copyright  2024 Tom Cripps <tom.cripps@port.ac.uk>   // Your name and contact
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */



// Moodle config inclusion.
require_once(__DIR__ . '/../../config.php');  // Always include the Moodle config file.
use local_moddesigner\output\helloworld;

// Set up the Moodle page
$PAGE->set_url(new moodle_url('/local/moddesigner/index.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title('Module Designer');
$PAGE->set_heading('');

// This is the inline script that will pass the site root to the Vue app
echo '<script>
    window.MOODLE_SITE_ROOT = "' . $CFG->wwwroot . '";
</script>';

// Require JavaScript for Vue App
$PAGE->requires->js_call_amd('local_moddesigner/bundle');

echo $OUTPUT->header();


// Render the Mustache template for mounting Vue
echo $OUTPUT->render_from_template('local_moddesigner/app_mount', []);

echo $OUTPUT->footer();
