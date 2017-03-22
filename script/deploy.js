var fs = require('fs');

exports.default = function deploy() {
  fs.readFile('./deploy/index.html', 'utf8', function (err, data) {
    data = data.replace(/timestamp/g, Date.now());

    fs.writeFile('./deploy/index.html', data, 'utf8', function (err) {});
  });
}
