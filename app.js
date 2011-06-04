var meryl = require('meryl'),
fs = require('fs'),
path = require('path'),
util = require('util'),
connect = require('connect'),
dust = require('dust'),
prepareApp = require('./prepare_app');

var env = JSON.parse(fs.readFileSync('./config/environment.js', 'utf-8'));

var opts = {
   templateDir: env.template.dir,
   templateExt: env.template.ext,
   compileTemplateFunc: dust.compile,
   loadTemplateFunc: dust.loadSource,
   renderTemplateFunc: dust.render,
   dataDir: env.dataDir,
   dataStore: {}
};

meryl
   .plug(connect.favicon(), connect.static(env.staticDir), connect.logger())
   .plug(function (req, resp, next) {
      resp.render = function (templatename, data) {
         opts.renderTemplateFunc(templatename, data, function (err, output) {
            if (err) {
               throw err;
            }
            resp.end(output);
         });
      };
      next();
   });

function start(callback) {
   prepareApp.prepareData(opts);
   prepareApp.prepareTemplates(opts);
   prepareApp.prepareControllers(env.controllerDir, callback);
}

start(function () {
   meryl.run(opts);
   console.log('listening...');
});