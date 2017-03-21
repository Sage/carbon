exports.default = function generateDocs() {
  require('ncp').ncp('./docs', './demo/utils/generated/docs', function() { });
}
