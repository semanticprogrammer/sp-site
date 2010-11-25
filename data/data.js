opts.dataStore = {
   data: function(chunk, context, bodies, params) {
      if (params.expr) {
         params.expr = 'user.bigName';
         return 'EXPRESSION FOUND!!!';
      }
      return '!!!!!!!!!!!!!';
   },
   currentURL: '',
   currentPage: function(chunk, context) {
      return (context.current().url.toUpperCase() == context.get('currentURL').toUpperCase()) ? "selected" : "";
   },
   navigation: [
      {
         url: '/main',
         name: 'Main',
         template: 'main',
         topMenu: 'yes'
      },
      {
         url: '/technology',
         name: 'Technology',
         template: 'technology_web_site',
         topMenu: 'yes'
      },
      {
         url: '/mydata',
         name: 'My Data',
         template: 'my_data',
         topMenu: 'yes'
      },
      {
         url: '/posts',
         name: 'Posts',
         template: 'posts'
      }
   ],
   myData: [
      {
         url: '/navigation',
         name: 'Navigation'
      },
      {
         url: '/mydata',
         name: 'My Data'
      },
      {
         url: '/posts',
         name: 'Posts'
      }],
   pages: [
      {
         name: "Main",
         url: "main",
         template: "main"
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