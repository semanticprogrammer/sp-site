with (meryl) {
   var sys = require('sys'),
   qs = require('querystring');

   get('/', function(req, resp) {
      resp.redirect('/main');
   });
   get('/posts/{id}/edit', function(req, resp) {
      var pattern = new RegExp('\\' + 'edit' + '$');      
      options.dataStore.currentKey = req.params.id;
      var action = null;
      options.dataStore.currentURL = req.url;

      options.dataStore.navigation.forEach(function(element, index, array) {

         if (element.url == options.dataStore.currentURL) {
            //            action = options.actionStore.navigation[options.dataStore.currentURL];
            action = element;
         }
         else if (pattern.test(options.dataStore.currentURL) && pattern.test(element.url)) {
            action = element;
         }
      });
      if (action != null) {
         resp.renderTemplate(action.template, options.dataStore); 
      }      
   });   
   get('/*', function(req, resp) {
      var action = null;
      options.dataStore.currentURL = req.url;

      options.dataStore.navigation.forEach(function(element, index, array) {

         if (element.url == options.dataStore.currentURL) {
            //            action = options.actionStore.navigation[options.dataStore.currentURL];
            action = element;
         }
      });
      if (action != null) {
         resp.renderTemplate(action.template, options.dataStore); 
      }
   });

   post('/posts', function (req, resp) {
      var data = qs.parse(req.postdata.toString());
      if (data) {
         options.dataStore.posts.push(data);
      };
      resp.redirect('/posts');
   });

   get('/posts/{id}', function(req, resp) {    
      });

   put('/posts/{id}', function(req, resp) {
      var data = JSON.parse(req.postdata.toString());
      if (data) {
         options.dataStore.posts.forEach(function(element, index, array) {
            if (element.key == req.params.id) {
               array[index] = data;
            }
         });
      };
      resp.redirect('/posts');        
   });

   meryl['delete']('/posts/{id}', function(req, resp) {
      options.dataStore.posts.forEach(function(element, index, array) {
         if (element.key == req.params.id) {
            array.splice(index, 1);            
         }
      });
   });
   }