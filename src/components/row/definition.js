import React from 'react';

import Row from './';

let column = React.createElement('div', { children: 'Test column', className: 'demo-stubbed-element' });
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

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
    gutter: OptionsHelper.sizesFull()
  }
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: [column, column, column],
  gutter: 'medium'
});

export default definition;
