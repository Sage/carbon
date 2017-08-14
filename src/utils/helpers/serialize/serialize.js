/**
 * @method serialize
 * @param {Object}
 * @param {String}
 */
const serialize = (obj, prefix) => {
  const str = [];

  for (const prop in obj) {
    const key = prefix ? `${prefix}[${prop}]` : prop,
        value = obj[prop];

    str.push(
      typeof value === 'object' ? serialize(value, key) : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    );
  }

  return str.join('&');
};

export default serialize;
