with (meryl) {

   get('/', function(req, resp) {
      resp.redirect('/main');
   });
  
   var currentURL;
   var data = {
      currentPage: function(chunk, context) {
         return (context.current().name.toUpperCase() == currentURL.toUpperCase()) ? "selected" : "";
      },
      pages: [
      {
         name: "Main",
         url: "main"
      },
      {
         name: "Technology", 
         url: "technology"
      },
      {
         name: "Production", 
         url: "production-css_framework.xhtml"
      },
      {
         name: "Research Lab", 
         url: "research.xhtml"
      },
      {
         name: "Community", 
         url: "community.xhtml"
      },
      {
         name: "Market Place", 
         url: "market.xhtml"
      }
      ],
      posts: [{
         key:1, 
         title:"post 1", 
         date: "01/19/10"
      },{
         key:2, 
         title:"post 2", 
         date: "01/14/10"
      },{
         key:3, 
         title:"post 3",
         date: "04/2/10"
      }]
   };

   get('/main', function(req, resp) {
      currentURL = req.url.substr(1);
      resp.renderTemplate('main', data);
   });
  
   get('/technology', function(req, resp) {
      currentURL = req.url.substr(1);
      resp.renderTemplate('technology-web_site', data);
   });
   }

