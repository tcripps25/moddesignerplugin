define(['jquery'], function($) {
    return {
        init: function() {
            // Mount the Vue app here
            $('#app').html('<div id="vue-root"></div>');
            require(['local_moddesigner/vueapp_bundle'], function(VueAppBundle) {
                VueAppBundle.default();
            });
        }
    };
});
