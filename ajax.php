<?php
require_once('../../config.php');
use local_moddesigner\output\designerdata;

require_login(); // Ensure the user is logged in
require_sesskey(); // session key

// Rich suggested adding something else here for security but I've forgotton - Tom



echo json_encode(['modules' => DesignerData::moddesigner_get_all_modules()]);