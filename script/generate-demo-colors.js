/**
 * Parses CSS File mapping css variable name to a value
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
 *      { name: 'mycolor', hex: '#FFF' },
 *      { name: 'mycolor2', hex: '#FFF' },
 *   ] },
 *   { name: 'Purple', children: [
 *      { name: '$mypurplecolor', hex: '#FFF' },
 *      { name: '$mypurplecolor2', hex: '#FFF' },
 *   ] }
 * ]
 *
 */

fs = require('fs');

var CONTRAST_THRESHOLD = 0.179;

function readFile(readPath, parseData, writePath, writeData) {
  fs.readFile(readPath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    parseData(data, writePath, writeData);
  });
}

function hexToR(hex) { return parseInt((cutHex(hex)).substring(0,2), 16) }
function hexToG(hex) { return parseInt((cutHex(hex)).substring(2,4), 16) }
function hexToB(hex) { return parseInt((cutHex(hex)).substring(4,6), 16) }
function cutHex(hex) { return (hex.charAt(0)=="#") ? hex.substring(1,7) : h }
function hexToRGBArray(hex) {return [hexToR(hex), hexToG(hex), hexToB(hex)]}

// http://stackoverflow.com/a/3943023/4668477
function luminanace(hex) {
  var a = hexToRGBArray(hex).map(function(v) {
    v /= 255;
    return (v <= 0.03928) ?  v / 12.92 : Math.pow( ((v+0.055)/1.055), 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function fontContrast(hex) {
  return luminanace(hex) > CONTRAST_THRESHOLD ? 'dark' : 'light';
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
      var name = line.replace(/[\s/]/g, '');
      stringData += "  { name: '" + name + "', children: [";

    } else if (line.startsWith('$')) {
      // Replace all white space with a single whitespace and split
      var lineSplit = line.replace(/\s\s+/g, ' ').split(' ');
      var hex = lineSplit[1];
      var contrast = fontContrast(hex);

      stringData += "\n    { name: '" + lineSplit[0] + "', hex: '" + hex + "', fontContrast: '" + contrast + "' },";
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

readFile('src/style-config/base-colors.scss', parseData, 'demo2/utils/generated/colors.js', writeData);
