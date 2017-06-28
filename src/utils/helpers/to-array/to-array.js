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
  let result = [];
  const index = str.indexOf('[');

  if (index === -1) {
    // if there are no square brackets
    result.push(str);
  } else {
    if (index > 0) {
      // if the square bracket is not the first character, add the name at the
      // start of the string (not in brackets)
      const name = str.slice(0, index);
      result.push(name);
    }

    // pull out the names in brackets and add to the array
    const nestedNames = str.match(/[^[\]]+(?=])/g);

    result = result.concat(nestedNames);
  }

  return result;
}
