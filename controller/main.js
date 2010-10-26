with (meryl) {

  get('/', function(req, resp) {
    resp.redirect('/main');
  });
  
  get('/main', function(req, resp) {
    var posts = datastore.findPosts();
    resp.render('main', {posts: posts});
  });
}

