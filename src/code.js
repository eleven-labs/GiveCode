 (function($) {

        window.Post = Backbone.Model.extend({

            defaults : {
                id : "???",
                title : "hello php",
                code : "<?php echo 'Hello World' ?>",
                keywords : "php, hello"
            },

            initialize : function Post() {
                console.log('Post Constructor');
            }
        });


 })(jQuery);