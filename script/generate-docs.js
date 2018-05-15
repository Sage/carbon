exports.default = function generateDocs() {
  require('ncp').ncp('./docs', './deploy/docs', function() { });
}
