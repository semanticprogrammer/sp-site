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
         //            options.dataStore.currentKey = 1;
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

   //   get('/posts', function(req, resp) {
   //   });

   post('/posts', function (req, resp) {
      sys.puts("OOOOOOO"+ req.postdata.toString());
      var postdataAsObject = qs.parse(req.postdata.toString());
      if (postdataAsObject) {
         sys.puts(sys.inspect(postdataAsObject));
         options.dataStore.posts.push(postdataAsObject);
      };
      resp.redirect('/posts');
   });

   get('/posts/{id}', function(req, resp) {    
      });

   put('/posts/{id}', function(req, resp) {
      sys.puts("UUUUUUU"+ req.postdata.toString().substring(1, req.postdata.toString().length - 1));
      var postdataAsObject = qs.parse(req.postdata.toString().substring(1, req.postdata.toString().length - 2));
      if (postdataAsObject) {
         options.dataStore.posts.forEach(function(element, index, array) {
            if (element.key == req.params.id) {
               sys.puts(sys.inspect(postdataAsObject));
//               for (var property in postdataAsObject) {
//                  sys.puts("property = " + property);
//               }
//               sys.puts("title = " + postdataAsObject.title);
               element.title = postdataAsObject.title;
               //array[index] = postdataAsObject;
            }
         });
      };
      resp.redirect('/posts');        
   });

   meryl['delete']('/posts/{id}', function(req, resp) {
      sys.puts("req.params.id:" + req.params.id);
      options.dataStore.posts.forEach(function(element, index, array) {
         if (element.key == req.params.id) {
            sys.puts("delete element = " + element.key);
            array.splice(index, 1);
         }
      });
      resp.redirect('/posts');
   });
   }