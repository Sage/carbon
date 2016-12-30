import SplitButton from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: SplitButton,
  key: 'split-button',
  text: {
    bemClass: 'carbon-split-button',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'SplitButton',
    type: 'action'
  },
  defaultProps: SplitButton.defaultProps,
  props: SplitButton.propTypes,
  propOptions: {
    as: OptionsHelper.themesBinary()
  }
};

import React from 'react';
let contentElement = React.createElement('div',
  { className: 'demo-stubbed-element',
    children: 'Test element' });

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: [contentElement, contentElement],
  text: 'Text'
});

export default definition;
