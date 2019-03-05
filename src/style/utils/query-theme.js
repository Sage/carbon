
const toKebabCase = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const objToCssString = (obj) => {
  return Object.entries(obj).reduce((acc, [attr, value]) => {
    return `${acc} ${toKebabCase(attr)}: ${value};`;
  }, '');
};

/**
 *
 * A utility for use with styled components
 * to query a global theme object by component name
 * and find the style rules associated with that component, given
 * the state of that component expressed by its current props.
 *
 * Given:
 * /themes/index.js
 * export default {
 *  components: {
 *    myComponent: {
 *      sizes: {
 *        small: { height: '20px'}
 *       },
 *      states: {
 *        active: { backgroundColor: 'blue' }
 *      }
 *      // ...style rules
 *    }
 *  }
 * }
 *
 * /my-component.style.js
 *
 * import styled from 'styled-components';
 * import queryTheme from '../path/to/utils/query-theme';
 *
 * const MyComponentStyle = styled.div`
 *  ${queryComponent('myComponent')}
 * `;
 *
 * export default MyComponentStyle;
 *
 * @param componentName
 * @returns function
 */
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
