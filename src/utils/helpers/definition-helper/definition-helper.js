import { _ } from 'lodash';

/**
 * Helper methods for constructing definitions.
 */
let DefinitionHelper = {
  prepareDemoProps: (definition, children, demoDefaults = {}) => {
    let childObject = children ? { children: children } : {  };
    let defaultPropsObject = definition.defaultProps ? definition.defaultProps : {  };

    let demoProps = _.assign(childObject, defaultPropsObject);

    for (var prop in definition.props) {
      if (!demoProps[prop]) {
        demoProps[prop] = '';
      }
      if (demoDefaults[prop]) {
        demoProps[prop] = demoDefaults[prop];
      }
    }

    return demoProps;
  },

  baseSizes: () => {
    return [
      'extra-small',
      'small',
      'medium-small',
      'medium',
      'medium-large',
      'large',
      'extra-large'
    ];
  }
};

export default DefinitionHelper;
