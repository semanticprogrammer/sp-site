var sys = require('sys'),
fs = require('fs'),
meryl = require('meryl'),
path = require('path');

exports.prepareTemplate = function(templateName, opts) {
   templateName = templateName || '/';
   templateName = templateName.replace(/\.\./, '.', 'g');
   if (templateName[templateName.length - 1] === '/') {
      templateName += 'index';
   }
   var templatePath = path.join(process.cwd(),
      opts.templateDir, templateName + opts.templateExt);
   var src = null;
   try {
      src = fs.readFileSync(templatePath, __encoding);
   } catch (e) {
      throw 'template not found';
   }
   if (src) {
      opts.loadTemplateFunc(opts.compileTemplateFunc(src, templateName));
   }
};

_prepareTemplates = function(opts, callback) {
   fs.readdir(opts.templateDir, function (err, filenames) {
      if (err) {
         throw err;
      }
      var filesRead = 0, templateName, pattern = new RegExp('\\' + opts.templateExt + '$');
      filenames.forEach(function (filename) {
         if (pattern.test(filename)) {
            fs.readFile(path.join(opts.templateDir, filename), function (err, data) {
               if (err) {
                  throw err;
               }
               templateName = filename.replace(pattern, '');
               opts.loadTemplateFunc(opts.compileTemplateFunc(data.toString(), templateName));
               console.log(templateName + ' template prepared.');
               filesRead += 1;
               if (filenames.length === filesRead) {
                  callback();
               }
            });
         }
      });
   });
};

exports.prepareTemplates = function(opts, _) { return _prepareTemplates(opts, _); };

_prepareControllers = function (controllerDir, callback) {
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
            console.log("'" + filename + "' controller prepared.");
            filesRead += 1;
            if (filenames.length === filesRead) {
               callback();
            }
         });
      });
   });
};

exports.prepareControllers = function(controllerDir, _) { return _prepareControllers(controllerDir, _); };

_prepareData = function (opts, onLoad) {
   fs.readdir(opts.dataDir, function (err, filenames) {
      if (err) {
         throw err;
      }
      var filesRead = 0;
      filenames.forEach(function (filename) {
         fs.readFile(path.join(opts.dataDir, filename), function (err, data) {
            if (err) {
               throw err;
            }
            opts.dataStore = eval(data.toString());
//            opts.dataStore = JSON.parse(data.toString());
            sys.puts(sys.inspect(opts.dataStore));
            console.log("'" + filename + "' data prepared.");
            filesRead += 1;
            if (filenames.length === filesRead) {
               onLoad();
            }
         });
      });
   });
};

exports.prepareData = function(opts, _) { return _prepareData(opts, _); };