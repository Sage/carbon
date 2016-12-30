import { Sidebar } from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Sidebar,
  key: 'sidebar',
  text: {
    bemClass: 'carbon-sidebar',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Sidebar',
    type: 'modal'
  },
  defaultProps: Sidebar.defaultProps,
  props: Sidebar.propTypes,
  propOptions: {
    position: OptionsHelper.alignBinary(),
    size: OptionsHelper.sizesRestricted()
  }
};

import React from 'react';
let contentElement = React.createElement('div',
  { className: 'demo-stubbed-element',
    children: 'Test element' });

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: [contentElement,contentElement,contentElement,contentElement,contentElement,contentElement],
  enableBackgroundUI: true
});

export default definition;
