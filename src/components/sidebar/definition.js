import { Sidebar } from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

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
    position: DefinitionHelper.alignBinary(),
    size: DefinitionHelper.sizesRestricted()
  }
};

import React from 'react';
let contentElement = React.createElement('div',
  { className: 'demo-stubbed-element',
    children: 'Test element' });

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: [contentElement,contentElement,contentElement,contentElement,contentElement,contentElement],
  enableBackgroundUI: true
});

export default definition;
