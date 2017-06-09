var gutil = require('gulp-util');
var fs = require('fs');

exports.default = function setConfig(cdn) {
  var jsAssetsConfig = 'demo/config.js';
  var scssAssetsConfig = 'src/style-config/assets.scss';
  var assetPath = '/assets';

  if (cdn) {
    assetPath = 'https://carbon.sage.com/assets';
  }

  var scssAssets = `
  $font-path: "${assetPath}/fonts" !default;
  $image-path: "${assetPath}/images" !default;
  `;

  fs.unlink(jsAssetsConfig, function(err) {
    fs.unlink(scssAssetsConfig, function(err) {
      fs.appendFile(scssAssetsConfig, scssAssets, function (err) {
        if (err) throw err;

        fs.appendFile(jsAssetsConfig, `export default { imagePath: '${assetPath}/images' };`, function (err) {
          if (err) throw err;
          gutil.log(gutil.colors.cyan('Using assets from ') + gutil.colors.green(assetPath));
        });
      });
    });
  });
}
