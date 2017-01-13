import React from 'react';
import { assign } from 'lodash';

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
  elemArray: (definition, count, addUnique = null) => {
    let elems = [],
        i = 0;

    for (; i < count; i++) {
      let props = definition.demoProps;
      if (addUnique) {
        props[addUnique] = `${definition.text.name}-${(i+1)}`;
      }

      props.key = i;
      props.className = 'demo-stubbed-element';

      // we need to define then assign to add the key 'displayName' which
      // we need for outputting the demo element as a child in the code builder
      // IE does not recognise function names
      let elem = React.createElement(definition.component, definition.demoProps);
      elems[i] = assign({ displayName: definition.text.name }, elem);
    }

    return elems;
  },

  stubbedFunction: () => {

  }
};

export default DemoHelper;
