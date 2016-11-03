var ncp = require('ncp').ncp;
var fs = require('fs');

var options = {
  filter: new RegExp('^((?!.js|.json|.scss|.svg|.woff|.ttf).)*$'),
  transform: function(read, write) {
    read.pipe(write);
    var directories = write.path.split("/");
    var newPath = write.path.replace("README", directories[directories.length - 2])
    fs.rename(write.path, newPath, function(err) {
      if (err) {
        return console.error(err);
      }
      console.log('Copied ' + newPath);
    });
  }
};

ncp("./src/components", "./components", options, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('done!');
});
