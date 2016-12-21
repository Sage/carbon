import { _ } from 'lodash';

/**
 * Helper methods for constructing definitions.
 */
let DefinitionHelper = {
  prepareDemoProps: (definition, children) => {
    let childObject = children ? { children: children } : {  };
    let defaultPropsObject = definition.defaultProps ? definition.defaultProps : {  };

    let demoProps = _.assign(childObject, defaultPropsObject);

    for (var prop in definition.props) {
      if (!demoProps[prop]) {
        demoProps[prop] = '';
      }
    }

    return demoProps;
  }
};

export default DefinitionHelper;
