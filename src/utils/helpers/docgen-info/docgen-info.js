// // takes object and regular expression
const keyMatch = (obj, regex) => {
  const matched = Object.keys(obj).find((key) =>
    key.match(regex) ? obj[key] : null
  );
  return matched ? obj[matched][0] : null;
};

const getDocGenInfo = (obj, regex) => {
  return obj ? keyMatch(obj, regex) : null;
};

export default getDocGenInfo;
