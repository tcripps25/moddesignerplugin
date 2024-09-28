<?php 

function local_myplugin_before_footer() {
    global $PAGE;
    $PAGE->requires->css(new moodle_url('/local/myplugin/style.css'));
}