var
sys = require('sys'),
fs = require('fs'),
path = require('path'),
connect = require('connect'),
//  datastore = require('./datastore'),
dust = require('dust'),
meryl = require('meryl'),
prepareApp = require('./prepare_app');

var 
controllerDir = 'controller',
viewDir = 'view',
staticDir = 'public';
  
var opts = {
   templateDir: 'view',
   templateExt: '.html',
   compileTemplateFunc: dust.compile,
   loadTemplateFunc: dust.loadSource,
   renderTemplateFunc: dust.render,
   dataDir: 'data',
   dataStore: {}
};

// Register plugins
meryl.plug(connect.staticProvider({
   root: staticDir
}), connect.logger());

prepareApp.prepareTemplates(opts,  function () {
   console.log('Finished preparing templates.');
});

// Run Meryl once controllers loaded
prepareApp.prepareControllers(controllerDir, function () {
   prepareApp.prepareData(opts, function () {
      console.log('Finished preparing data...');
   meryl.run(opts);
   console.log('listening...');
   });
});

//datastore.load(function () {
//
//  // Register plugins
//  meryl.plug(connect.staticProvider({root: staticDir}), connect.logger());
//
//  // Loads controllers automatically
//  var loadControllers = function (controllerDir, onLoad) {
//    fs.readdir(controllerDir, function (err, filenames) {
//      if (err) {
//        throw err;
//      }
//      var filesRead = 0;
//      filenames.forEach(function (filename) {
//        fs.readFile(path.join(controllerDir, filename), function (err, data) {
//          if (err) {
//            throw err;
//          }
//          eval(data.toString());
//          console.log("'" + filename + "' controller loaded.");
//          filesRead += 1;
//          if (filenames.length === filesRead) {
//            onLoad();
//          }
//        });
//      });
//    });
//  };
//
//  // Run Meryl once controllers loaded
//  loadControllers(controllerDir, function () {
//    meryl.run(opts);
//    console.log('listening...');
//  });
//});
//
