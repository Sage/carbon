import SplitButton from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

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
    as: DefinitionHelper.themes()
  }
};

import React from 'react';
let contentElement = React.createElement('div',
  { className: 'demo-stubbed-element',
    children: 'Test element' });

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: [contentElement, contentElement],
  text: 'Text'
});

export default definition;
