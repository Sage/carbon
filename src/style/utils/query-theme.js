
const isUpper = char => char.toUpperCase() === char;
const camelToDash = (acc, char) => `${acc}${isUpper(char) ? `-${char.toLowerCase()}` : char}`;
const toCSSCase = str => str.split('').reduce(camelToDash, '');

const objToCssString = (obj) => {
  return Object.entries(obj).reduce((acc, [attr, value]) => {
    return `${acc} ${toCSSCase(attr)}: ${value};`;
  }, '');
};

export default componentName => (props) => {
  const { theme, ...rest } = props;
  const profile = theme.components[componentName];
  const styleGivenContext = Object.keys(rest).reduce((acc, prop) => {
    const byState = ['states', 'sizes'].reduce((subAcc, key) => {
      if (!profile[key]) return subAcc;

      if (!rest[prop]) return subAcc;
      return { ...subAcc, ...profile[key][prop] };
    }, {});

    return { ...acc, ...byState };
  }, {});

  const cssString = objToCssString({ ...profile.base, ...styleGivenContext });
  return cssString;
};
