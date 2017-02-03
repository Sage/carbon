import { Tabs } from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';
import tabDefinition from './tab/definition';

let definition = new Definition('tabs', Tabs, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'layout',
  propOptions: {
    align: OptionsHelper.alignBinary(),
    position: ['top', 'left']
  },
  hiddenProps: ['selectedTabId', 'renderHiddenTabs', 'onTabChange']
});

definition.addChildByDefinition(tabDefinition, {
  tabId: "tab-1",
  title: "Tab 1",
  children: "Content for tab 1"
});

definition.addChildByDefinition(tabDefinition, {
  tabId: "tab-2",
  title: "Tab 2",
  children: "Content for tab 2"
});

export default definition;
