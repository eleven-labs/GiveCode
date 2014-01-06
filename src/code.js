 (function($) {

        window.Post = Backbone.Model.extend({
            
            defaults : {
                id : "???",
                title : "hello php",
                code : "<?php echo 'Hello World' ?>",
                keywords : "php, hello"
            },

            initialize : function Doc() {
                console.log('Post Constructor');
            
                this.bind("invalid", function(model, error){
                    console.log( error );
                });
            },

            validate: function( attributes ){
                if( attributes.title === '') {
                    return "Le titre du document ne peut pas être vide !!!";
                }
                
                if( attributes.code === '') {
                    return "Le code ne peut pas être vide !!!";
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


        window.Posts = Backbone.Collection.extend({
            model : Post,
            
              localStorage : new Store("posts"),
              
            initialize : function() {
                console.log('Post collection Constructor');
            }
        });
        
        window.PostView = Backbone.View.extend({
            el : $('#post-container'),
            initialize : function() {
                this.template = _.template($('#post-template').html());
                
                 /*--- binding ---*/
                _.bindAll(this, 'render');
                this.model.bind('change', this.render);
                /*---------------*/
            },
    
            setModel : function(model) {
            this.model = model;
            return this;
            },
            
            render : function() {
                var renderedContent = this.template(this.model.toJSON());
                $(this.el).html(renderedContent);
                return this;
            }

        });
        
        window.PostsCollectionView = Backbone.View.extend({
        el : $('#posts-collection-container'),

        initialize : function() {
            this.template = _.template($('#posts-collection-template').html());

            /*--- binding ---*/
            _.bindAll(this, 'render');
            this.collection.bind('change', this.render);
            this.collection.bind('add', this.render);
            this.collection.bind('remove', this.render);
            /*---------------*/

        },

        render : function() {
            var renderedContent = this.template({ posts : this.collection.toJSON() });
            $(this.el).html(renderedContent);
            return this;
        }

    });

    window.PostFormView = Backbone.View.extend({
        el : $('#post-form-container'),

        initialize : function() {
            //Nothing to do now
        },
        events : {
            'submit form' : 'addPost'
        },
        addPost : function(e) {
            e.preventDefault();

            this.collection.add({
                id : this.$('.id').val(),
                title : this.$('.title').val(),
                code : this.$('.code').val(),
                keywords : this.$('.keywords').val()
            }, { error : _.bind(this.error, this) });
            this.collection.get(this.$('.id').val()).save();
            this.$('input[type="text"]').val(''); //on vide le form
        },
        error : function(model, error) {
            console.log(model, error);
            return this;
        }

    });
    
    window.PostsRouter = Backbone.Router.extend({

        initialize : function() {
            /* 1- Création d'une collection */
            this.posts = new Posts();
            /* 2- Chargement de la collection */
            this.posts.fetch();

            /* 3- Création des vues + affichage */
            this.postFormView = new PostFormView({ collection : this.posts });
            this.postsView = new PostsCollectionView({ collection : this.posts });
            this.postsView.render();

            /* 4- Click sur un lien */
            this.route("post/:id", "post", function(id){
                pv = new PostView({model:  this.posts.get(id)});
                pv.render();
               
            });
            
            
        },
        
        routes : {
            "" : "root",
            "about" : "about"
        },

        root : function() { console.log('Vous êtes à la racine');},
        about : function() { console.log('A propos : ceci est un tutorial BackBone');}

    });


 })(jQuery);