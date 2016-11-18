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

function readFile(readPath, parseData, writePath, writeData) {
  fs.readFile(readPath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    parseData(data, writePath, writeData);
  });
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
      stringData += "\n    { name: '" + lineSplit[0] + "', hex: '" + lineSplit[1] + "' },"
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
