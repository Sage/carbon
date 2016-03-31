/**
 * Serializes a JS object into a string. For example, given the object:
 *
 *   {
 *     foo: "abc",
 *     bar: {
 *       qux: "xyz"
 *     }
 *  }
 *
 * it would return:
 *
 *   "foo=abc&bar%5Bqux%5D=xyz" // decoded: "foo=abc&bar[qux]=xyz"
 *
 * @method serialize
 * @param {Object}
 * @param {String}
 */
let serialize = (obj, prefix) => {
  let str = [];

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      let key = prefix ? prefix + "[" + prop + "]" : prop,
          value = obj[prop];

      str.push(
        typeof value == "object" ?
          serialize(value, key) :
          encodeURIComponent(key) + "=" + encodeURIComponent(value)
      );
    }
  }

  return str.join("&");
}

export default serialize;
