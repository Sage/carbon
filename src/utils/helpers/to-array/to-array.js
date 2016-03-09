/**
 * Converts a string of a given format into an array.
 *
 * For example:
 *
 *  "foo[bar][baz]"
 *
 * Will be converted to:
 *
 *  ["foo", "bar", "baz"]
 *
 * @method toArray
 * @param {String}
 * @return {Array}
 */
export default function(str) {
  let result = [],
      index = str.indexOf("[");

  if (index === -1) {
    // if there are no square brackets
    result.push(str);
  } else {
    if (index > 0) {
      // if the square bracket is not the first character
      let name = str.slice(0, index);
      result.push(name);
    }

    let nestedNames = str.match(/[^[\]]+(?=])/g);

    result = result.concat(nestedNames);
  }

  return result;
}
