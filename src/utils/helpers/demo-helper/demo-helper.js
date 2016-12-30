import { _ } from 'lodash';
import OptionsHelper from '../options-helper';

/**
 * Helper methods for constructing definitions.
 */
let DemoHelper = {
  prepareDemoProps: (definition, demoDefaults = {}) => {
    let demoProps = _.assign({}, definition.defaultProps, demoDefaults);

    for (var prop in definition.props) {
      if (demoProps[prop] === undefined) {
        demoProps[prop] = '';
      }
      if (demoDefaults[prop]) {
        demoProps[prop] = demoDefaults[prop];
      }
    }

    // handle functions
    for (prop in demoProps) {
      if (OptionsHelper.commonEvents().indexOf(prop) >= 0) {
        let functionName = prop;
        demoProps[functionName] = () => {
          alert(`${functionName}() triggered`);
        };
      }
    }

    return demoProps;
  }
};

export default DemoHelper;
