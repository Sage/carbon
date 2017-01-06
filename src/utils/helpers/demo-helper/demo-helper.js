import React from 'react';

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
      elems[i] = React.createElement(definition.component, definition.demoProps);
    }

    if (elems.length === 1) {
      elems = elems[0];
    }

    return elems;
  }
};

export default DemoHelper;
