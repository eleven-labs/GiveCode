 (function($) {

        window.Post = Backbone.Model.extend({

            defaults : {
                id : "???",
                title : "hello php",
                code : "<?php echo 'Hello World' ?>",
                keywords : "php, hello"
            },

            initialize : function Doc() {
                console.log('Doc Constructor');
            
                this.bind("invalid", function(model, error){
                    console.log( error );
                });
            },

            validate: function( attributes ){
                if( attributes.title === '') {
                    return "Le titre du document ne peut pas être vide !!!";
                }
            },
            
            getId : function() {
                return this.get('id');
            },
            setId : function(value) {
                this.set({ id : value });
            },
    
            getTitle : function() {
                return this.get('title');
            },
            setTitle : function(value) {
                this.set({ title : value }, {validate: true});
            },
    
            getCode : function() {
                return this.get('code');
            },
            setCode : function(value) {
                this.set({ code : value });
            },
    
            getKeywords : function() {
                return this.get('keywords');
            },
            setKeywords : function(value) {
                this.set({ keywords : value });
            }
        });


 })(jQuery);