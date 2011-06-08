var util = require('util'),
fs = require('fs'),
meryl = require('meryl'),
path = require('path'),
flows = require('streamline/lib/util/flows');

_prepareTemplates = function(_, opts) {
   var files = fs.readdir(opts.templateDir, _);
   var templateName, pattern = new RegExp('\\' + opts.templateExt + '$');
   for (var i = 0; i < files.length; i++) {
      if (pattern.test(files[i])) {
         var data = fs.readFile(path.join(opts.templateDir, files[i]), _);
         templateName = files[i].replace(pattern, '');
         opts.loadTemplateFunc(opts.compileTemplateFunc(data.toString(), templateName));
         console.log(templateName + ' template prepared.');
      }
   }
};

exports.prepareTemplates = function(opts, _) {
   return _prepareTemplates(_, opts);
};


_prepareControllers = function (_, controllerDir) {
   var filenames = fs.readdir(controllerDir, _);
   flows.each(_, filenames, function (_, filename) {
      var data = fs.readFile(path.join(controllerDir, filename),
         _);
      eval(data.toString());
      console.log("'" + filename + "' controller prepared.");
   });
};

exports.prepareControllers = function(controllerSpace, _) {
   return _prepareControllers(_, controllerSpace);
};

_prepareData = function (_, opts) {
   var files = fs.readdir(opts.dataDir, _);
   for (var i = 0; i < files.length; i++) {
      var data = fs.readFile(path.join(opts.dataDir, files[i]), _);
      opts.dataStore = eval(data.toString());
      console.log(util.inspect(opts.dataStore, true, null));
      console.log("'" + filename + "' data prepared.");
   }
};

exports.prepareData = function(opts, _) {
   return _prepareData(_, opts);
};