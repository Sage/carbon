import { Tabs } from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

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
    align: OptionsHelper.alignBinary(),
    position: OptionsHelper.positions()
  }
};

import React from 'react';
import tabDefinition from './tab/definition';


let tabs = [];
[1,2,3,4,5,6].forEach((i) => {
  let contentElement = React.createElement('div',
    { className: 'demo-stubbed-element',
      children: `Tab ${i} content block` });
  tabDefinition.demoProps.tabId = `tab-${i}`;
  tabDefinition.demoProps.title = `Test Tab ${i}`;
  tabDefinition.demoProps.children = [contentElement, contentElement, contentElement];
  tabs[i] = React.createElement(tabDefinition.component, tabDefinition.demoProps);
});

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: tabs,
  renderHiddenTabs: false
});

export default definition;
