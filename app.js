var
  fs = require('fs'),
  path = require('path'),
  connect = require('connect'),
  datastore = require('./datastore'),
  jqtpl = require( "jqtpl" ),
  meryl = require('meryl');

var controllerDir = 'controller',
  viewDir = 'view',
  staticDir = 'public';
  
var opts = {
  templateDir: 'view',
  templateExt: '.html',
  templateFunc: jqtpl.render
};  

datastore.load(function () {

  // Register plugins
  meryl.plug(connect.staticProvider({root: staticDir}), connect.logger());

  // Loads controllers automatically
  var loadControllers = function (controllerDir, onLoad) {
    fs.readdir(controllerDir, function (err, filenames) {
      if (err) {
        throw err;
      }
      var filesRead = 0;
      filenames.forEach(function (filename) {
        fs.readFile(path.join(controllerDir, filename), function (err, data) {
          if (err) {
            throw err;
          }
          eval(data.toString());
          console.log("'" + filename + "' controller loaded.");
          filesRead += 1;
          if (filenames.length === filesRead) {
            onLoad();
          }
        });
      });  
    });  
  };

  // Run Meryl once controllers loaded
  loadControllers(controllerDir, function () {
    meryl.run(opts);
    console.log('listening...');
  });
});

