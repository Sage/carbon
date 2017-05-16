'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _optionsHelper = require('../../utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _definition3 = require('./tab/definition');

var _definition4 = _interopRequireDefault(_definition3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('tabs', _.Tabs, {
  description: 'Switches between variants of a page or different tables.',
  designerNotes: '\n* switch between variants of a page or different tables (e.g. separate tables showing unread and read emails).\n* There are two position options:\n* __Top - shows the tabs in a line, typically above a Table - best for short lists of tabs.\n* __Left - show the tables in a column, typically to the left of a Table - best for longer lists of tabs.\n* You can also set the left or right alignment of the tabs. This configuration:\n* __Sets the text alignment for \u2018Left\u2019 tabs.\n* __Sets left or right page position for \u2018Top\u2019 tabs.\n* Only use tabs if there\u2019s more than one, and show the content of one tab by default. Avoid multiple rows of tabs, nested tabs, or using vertical and horizontal tabs at the same time.\n  ',
  relatedComponentsNotes: '\n* Navigating the hierarchy of the app? [Try Menu](/components/menu).\n* Positioning your primary navigation? [Try Navigation Bar](/components/navigation-bar).\n* Quickly accessing useful hyperlinks? [Try Animated Menu Button](/components/animated-menu-button).\n',
  type: 'layout',
  associatedDefinitions: [_definition4.default],
  propOptions: {
    align: _optionsHelper2.default.alignBinary,
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
    align: "Sets the alignment of the tab titles. Possible values include: " + _optionsHelper2.default.alignBinary,
    children: "The child elements of Tabs need to be Tab components.",
    onTabChange: "A callback for when a tab is changed. You can use this to manually control tab changing or to fire other events when a tab is changed.",
    position: "The position of the tab title. Possible values include: top, left",
    renderHiddenTabs: "This will ensure hidden tabs are still rendered to the DOM and are hidden with CSS. This allows cross-tab forms to work correctly. You can disable this so React will not render the hidden tabs.",
    selectedTabId: "Allows manual control over the currently selected tab."
  }
});

definition.addChildByDefinition(_definition4.default, {
  tabId: "tab-1",
  title: "Tab 1",
  children: "Content for tab 1"
});

definition.addChildByDefinition(_definition4.default, {
  tabId: "tab-2",
  title: "Tab 2",
  children: "Content for tab 2"
});

exports.default = definition;