import { Tabs } from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';
import tabDefinition from './tab/__definition__';

let definition = new Definition('tabs', Tabs, {
  description: `Switches between variants of a page or different tables.`,
  designerNotes: `
* switch between variants of a page or different tables (e.g. separate tables showing unread and read emails).
* There are two position options:
* __Top - shows the tabs in a line, typically above a Table - best for short lists of tabs.
* __Left - show the tables in a column, typically to the left of a Table - best for longer lists of tabs.
* You can also set the left or right alignment of the tabs. This configuration:
* __Sets the text alignment for ‘Left’ tabs.
* __Sets left or right page position for ‘Top’ tabs.
* Only use tabs if there’s more than one, and show the content of one tab by default. Avoid multiple rows of tabs, nested tabs, or using vertical and horizontal tabs at the same time.
  `,
  relatedComponentsNotes: `
* Navigating the hierarchy of the app? [Try Menu](/components/menu).
* Positioning your primary navigation? [Try Navigation Bar](/components/navigation-bar).
* Quickly accessing useful hyperlinks? [Try Animated Menu Button](/components/animated-menu-button).
`,
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
    selectedTabId: "String",
    changeUrl: "Boolean"
  },
  propDescriptions: {
    align: "Sets the alignment of the tab titles. Possible values include: " + OptionsHelper.alignBinary,
    children: "The child elements of Tabs need to be Tab components.",
    onTabChange: "A callback for when a tab is changed. You can use this to manually control tab changing or to fire other events when a tab is changed.",
    position: "The position of the tab title. Possible values include: top, left",
    renderHiddenTabs: "This will ensure hidden tabs are still rendered to the DOM and are hidden with CSS. This allows cross-tab forms to work correctly. You can disable this so React will not render the hidden tabs.",
    selectedTabId: "Allows manual control over the currently selected tab.",
    changeUrl: "Add tab ID to URL on tab change."
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
