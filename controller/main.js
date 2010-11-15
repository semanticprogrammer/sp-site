with (meryl) {
   var sys = require('sys');
   get('/', function(req, resp) {
      resp.redirect('/main');
   });
  
   get('/*', function(req, resp) {
      var action = null;
      options.dataStore.currentURL = req.url.substr(1);

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
   }