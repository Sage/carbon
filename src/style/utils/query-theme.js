
const isUpperCase = char => char.toUpperCase() === char;
const toCSSCase = (str) => {
  return str.split('').reduce((acc, char) => {
    const toAdd = isUpperCase(char) ? `-${char.toLowerCase()}` : char;
    return acc + toAdd;
  }, '');
};
const objToCssString = (obj) => {
  return Object.entries(obj).reduce((acc, [attr, value]) => {
    return `${acc} ${toCSSCase(attr)}: ${value};`;
  }, '');
};

export default componentName => (props) => {
  const { theme, ...rest } = props;

  const profile = theme.components[componentName];

  const styleGivenContext = Object.keys(rest).reduce((acc, prop) => {
    const byState = ['states', 'sizes'].reduce((subAcc, key) => ({ ...subAcc, ...profile[key][prop] }), {});
    return acc + objToCssString(byState);
  }, '');

  return styleGivenContext;
};
