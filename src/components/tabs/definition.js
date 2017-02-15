import { Tabs } from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';
import tabDefinition from './tab/definition';

let definition = new Definition('tabs', Tabs, {
  type: 'layout',
  associatedDefinitions: [tabDefinition],
  propOptions: {
    align: OptionsHelper.alignBinary,
    position: ['top', 'left']
  },
  hiddenProps: ['selectedTabId', 'renderHiddenTabs'],
  requiredProps: ['children'],
  propTypes: {
    align: "String",
    children: "Node",
    onTabChange: "Function",
    position: "String",
    renderHiddenTabs: "Boolean",
    selectedTabId: "String"
  },
  propDescriptions: {
    align: "Sets the alignment of the tab titles. Possible values include: " + OptionsHelper.alignBinary,
    children: "The child elements of Tabs need to be Tab components.",
    onTabChange: "A callback for when a tab is changed. You can use this to manually control tab changing or to fire other events when a tab is changed.",
    position: "The position of the tab title. Possible values include: top, left",
    renderHiddenTabs: "This will ensure hidden tabs are still rendered to the DOM and are hidden with CSS. This allows cross-tab forms to work correctly. You can disable this so React will not render the hidden tabs.",
    selectedTabId: "Allows manual control over the currently selected tab."
  }
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
