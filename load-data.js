var
sys = require("sys"),
fs = require('fs'),
path = require('path'),
connect = require('connect'),
datastore = require('./datastore'),
meryl = require('meryl');

var 
controllerDir = 'controller',
viewDir = 'view',
staticDir = 'public';
dataDir = 'data';
dbName = 'sp-site';

var Db = require('mongodb').Db,
Connection = require('mongodb').Connection,
Server = require('mongodb').Server,
BSON = require('mongodb').BSONNative;

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

sys.puts("Connecting to " + host + ":" + port);
var db = new Db(dbName, new Server(host, port, {}), {
   native_parser:true
});
db.open(function(err, db) {
   meryl.plug(connect.staticProvider({
      root: staticDir
   }), connect.logger());
     
   // Loads data automatically
   var loadData = function (dataDir, onLoad) {
      fs.readdir(dataDir, function (err, filenames) {
         if (err) {
            throw err;
         }
         var filesRead = 0;
         filenames.forEach(function (filename) {
            fs.readFile(path.join(dataDir, filename), function (err, data) {
               if (err) {
                  throw err;
               }
               db.collection(filename, function(err, collection) {
                  sys.puts(sys.inspect(data.toString()));
                  collection.insert(data.toString());
                  collection.count(function(err, count) {
                     sys.puts("There are " + count + " records in the " + filename + " collection. Here they are:");
                     collection.find(function(err, cursor) {
                        cursor.each(function(err, item) {
                           if(item != null) {
                              sys.puts(sys.inspect(item));
//                              sys.puts("created at " + new Date(item._id.generationTime) + "\n")
                           }
                        // Null signifies end of iterator
                        });
                     });          
                  });
               });                  
               //          eval(data.toString());
               console.log("'" + filename + "' data loaded.");
               filesRead += 1;
               if (filenames.length === filesRead) {
                  onLoad();
               }
            });  
         });  
      });
   };
   loadData(dataDir, function () {
      console.log('Finished load data.');
   });
});