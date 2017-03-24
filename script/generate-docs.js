exports.default = function generateDocs() {
  require('ncp').ncp('./docs', './deploy/assets/docs', function() { });
}
