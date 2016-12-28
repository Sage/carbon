import React from 'react';

import Row from './';

let column = React.createElement('div', { children: 'Test column', className: 'demo-stubbed-element' });
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Row,
  key: 'row',
  text: {
    bemClass: 'carbon-row',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Row',
    type: 'layout'
  },
  defaultProps: Row.defaultProps,
  props: Row.propTypes,
  propOptions: {
    gutter: DefinitionHelper.sizesFull()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: [column, column, column],
  gutter: 'medium'
});

export default definition;
