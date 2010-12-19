with (meryl) {
   var sys = require('sys'),
   qs = require('querystring');

   get('/', function(req, resp) {
      resp.redirect('/main');
   });
   get('/*', function(req, resp) {
      var action = null;
      options.dataStore.currentURL = req.url;

      options.dataStore.navigation.forEach(function(element, index, array) {
         if (element.url == options.dataStore.currentURL) {
                        sys.puts("element.url = " + element.url);
            //            action = options.actionStore.navigation[options.dataStore.currentURL];
            action = element;
         }
      });
      if (action != null) {
         sys.puts("action.template = " + action.template);
         resp.renderTemplate(action.template, options.dataStore); 
      }
   });

   //   get('/posts', function(req, resp) {
   //   });

   post('/posts', function(req, resp) {
      var postdataAsObject = qs.parse(req.postdata.toString());
      if (postdataAsObject && postdataAsObject.post) {
         options.dataStore.posts.push(postdataAsObject);
      }
      resp.redirect('/posts');
   });

   get('/posts/{id}', function(req, resp) {
      });

   get('/posts/{id}/edit', function(req, resp) {
      });

   put('/posts/{id}', function(req, resp) {
      });

   meryl['delete']('/posts/{id}', function(req, resp) {
      sys.puts("req.params.id:" + req.params.id);
      options.dataStore.posts.forEach(function(element, index, array) {
         if (element.key == req.params.id) {
            sys.puts("delete element = " + element.key);
            delete element;
         }
      });
   });
   }