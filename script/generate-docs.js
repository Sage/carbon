exports.default = function generateDocs() {
  require('cpx').copy('./docs/**/*', './deploy/docs');
}
