// // takes object and regular expression
const keyMatch = (obj, regex) => {
  const matched = Object.keys(obj).find(key => (key.match(regex) ? obj[key] : null));
  return obj[matched][0] || null;
};

const getDocGenInfo = (obj, regex) => {
  return keyMatch(obj, regex);
};

export default getDocGenInfo;
