<?php
/**
 * Get all modules (activities/resources) available in the Moodle installation.
 *
 * @return array An array of modules with their details.
 */

 namespace local_moddesigner\output;

 class DesignerData {
     /**
      * Get all modules (activities/resources) available in the Moodle installation.
      *
      * @return array An array of modules with their details.
      */
     public static function moddesigner_get_all_modules() {
         global $DB;
 
         // Initialize an empty module list
         $module_list = [];
 
         try {
             // Fetch all visible modules from the mdl_modules table
             $modules = $DB->get_records('modules', ['visible' => 1], '', 'id, name, visible');
 
             // Check if the fetch was successful
             if ($modules === false) {
                 throw new \Exception('Failed to fetch records from the database.');
             }
 
             // Loop through each module and format the data
             foreach ($modules as $module) {
                 // Initialize the module data
                 $module_data = [
                     'id' => $module->id,
                     'value' => $module->name,
                     'visible' => $module->visible,
                     'name' => self::get_module_fullname($module->name) // Get the full name from a separate method
                 ];
 
                 // Add the module data to the list
                 $module_list[] = $module_data;
             }
         } catch (\Exception $e) {
             // Log the error message
             error_log('Error fetching modules: ' . $e->getMessage());
             return []; // Return an empty array to avoid breaking the application
         }
 
         return $module_list; // Return the formatted list of modules
     }
 
     /**
      * Get the full name of a module based on its type.
      *
      * @param string $moduleName The name of the module.
      * @return string The full name of the module.
      */
     private static function get_module_fullname($moduleName) {
         // Here you can define how to retrieve or construct the full name based on the module type
         // For example, return a static mapping or fetch from a database if needed
 
         // This is a placeholder implementation. Adjust according to your needs.
         switch ($moduleName) {
             case 'assign':
                 return 'Assignment';
             case 'url':
                 return 'URL';
             case 'h5pactivity':
                 return 'H5P Activity';
             case 'imscp':
                return 'IMSCP';
             case 'lti':
                return 'LTI';
             // Add more cases as needed
             default:
                 return ucfirst($moduleName);
         }
     }
 }