import React from 'react';
import { _ } from 'lodash';
import OptionsHelper from '../options-helper';

let DemoHelper = {
  /**
   * prepares an array of elements from a definition
   *
   * @method elemArray
   * @param {Object} definition
   * @param {Integer} count
   * @param {String} addUnique - will add a prop as named in the variable which will be unique to the element
   * @return {Array} elems
   */
  elemArray: (definition, count, addUnique = '') => {
    console.log(addUnique);
    console.log(typeof addUnique);
    let elems = [],
        i = 1;

    for (; i <= count; i++) {
      let props = definition.demoProps;
      if (typeof addUnique === 'string') {
        if (addUnique !== '') {
          props[addUnique] = `${definition.text.name}-${i}`;
        }
      } else {
        if (addUnique.length > 0) {
          addUnique.forEach((prop) => {
            props[prop] = `${prop}-${i}`;
          });
        }
      }


      props.key = i;
      props.className = 'demo-stubbed-element';
      elems[i] = React.createElement(definition.component, definition.demoProps);
    }

    return elems;
  },

  /**
   * sets up demo props, with over-rides and function stubs
   *
   * @method prepareDemoProps
   * @param {Object} definition
   * @param {Object} demoDefaults - set of over-rides
   * @return {Object} demoProps
   */
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
