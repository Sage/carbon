/**
 * Parses CSS File mapping css variable name to a value
 * It also determines if the text shown should be light or dark
 * depending on its contrast
 *
 * Example File structure
 * // Grey
 * $mycolor: #FFF
 * $mycolor2: #FFF
 *
 * // Purple
 * $mypurplecolor: #FFF
 * $mypurplecolor2: #FFF
 *
 * Result:
 *
 * export default [
 *   { name: 'Grey', children: [
 *      { name: 'mycolor', hex: '#FFF', fontContrast: 'dark' },
 *      { name: 'mycolor2', hex: '#FFF', fontContrast: 'light' },
 *   ] },
 *   { name: 'Purple', children: [
 *      { name: '$mypurplecolor', hex: '#FFF', fontContrast: 'dark' },
 *      { name: '$mypurplecolor2', hex: '#FFF', fontContrast: 'light' },
 *   ] }
 * ]
 *
 */

fs = require('fs');

var CONTRAST_THRESHOLD = 0.179;
const hexPairSplitRegexp = /[^#]{2}/;
const cssColorSeparatorRegexp = /(\$.+):\s*(?:(.+)\s!default;|(.+);)/;

function readFile(readPath, parseData, writePath, writeData) {
  fs.readFile(readPath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    parseData(data, writePath, writeData);
  });
}

function convertHexToRgbArray(hex) {
  const hexPairs = hex.match(hexPairSplitRegexp);

  return hexPairs.map(hexPair => parseInt(hexPair, 16));
}

// http://stackoverflow.com/a/3943023/4668477
function luminance(hex) {
  const a = convertHexToRgbArray(hex).map(function(v) {
    v /= 255;
    return (v <= 0.03928) ?  v / 12.92 : Math.pow( ((v+0.055)/1.055), 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function fontContrast(hex) {
  return luminance(hex) > CONTRAST_THRESHOLD ? 'dark' : 'light';
}

function parseData(data, writePath, writeData) {
  var lines = data.split('\n');
  var newColorSet;
  var stringData = 'export default [\n';

  lines.forEach((line) => {
    // New color label
    if (line.startsWith('//')) {

      // End color
      if (newColorSet) { stringData += '\n  ] },\n'; }

      // Start new color
      newColorSet = true;
      // Replace slashes and white space with nothing
      const name = line.replace(/[\s/]/g, '');
      stringData += `  { name: '${name}', children: [`;

    } else if (line.startsWith('$')) {
      // Replace colon followed by all white space with a single whitespace and split
      const lineSplit = cssColorSeparatorRegexp.exec(line);
      const name = lineSplit[1];
      const hex = lineSplit[2] || lineSplit[3];
      const contrast = fontContrast(hex);

      stringData += `\n    { name: '${name}', hex: '${hex}', fontContrast: '${contrast}' },`;
    }
  });
  // Close tags
  stringData += "\n] } ];"

  writeData(writePath, stringData);
}

function writeData(writePath, data) {
  fs.writeFile(writePath, data, (err) => {
    if (err) throw err;
  });
}

function run() {
  readFile('src/style-config/base-colors.scss', parseData, 'demo/utils/generated/colors.js', writeData);
}

exports.default = run;
