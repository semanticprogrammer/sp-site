with (meryl) {

  get('/', function(req, resp) {
    resp.redirect('/main');
  });
  

var posts = {posts: [{key:1, title:"post 1", date: "01/19/10"},{key:2, title:"post 2", date: "01/14/10"},{key:3, title:"post 3",date: "04/2/10"}]};

  get('/main', function(req, resp) {
    //var posts = datastore.findPosts();
    resp.render('main', posts);
  });
}

