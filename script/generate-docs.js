exports.default = function generateDocs() {
  require('ncp').ncp('./docs', './demo/assets/docs', function() { });
}
