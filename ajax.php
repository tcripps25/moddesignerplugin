<?php
require_once('../../config.php');
use local_moddesigner\output\designerdata;

require_login(); // Ensure the user is logged in
require_sesskey();

echo json_encode(['modules' => DesignerData::moddesigner_get_all_modules()]);