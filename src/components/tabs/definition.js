import { Tabs } from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Tabs,
  key: 'tabs',
  text: {
    bemClass: 'carbon-tabs',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Tabs',
    type: 'layout'
  },
  defaultProps: Tabs.defaultProps,
  props: Tabs.propTypes,
  propOptions: {
    align: DefinitionHelper.alignBinary(),
    position: DefinitionHelper.positions()
  }
};

import React from 'react';
import tabDefinition from './tab/definition';


let tabs = [];
[1,2,3,4,5,6].forEach((i) => {
  let contentElement = React.createElement('div',
    { className: 'demo-stubbed-element',
      children: `Tab ${i} content block` });
  tabDefinition.props.tabId = `tab-${i}`;
  tabDefinition.props.title = `Test Tab ${i}`;
  tabDefinition.props.children = [contentElement, contentElement, contentElement];
  tabs[i] = React.createElement(tabDefinition.component, tabDefinition.props);
});

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: tabs,
  renderHiddenTabs: false
});

export default definition;
