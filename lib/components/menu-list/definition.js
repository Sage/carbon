'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _definition3 = require('./menu-list-item/definition');

var _definition4 = _interopRequireDefault(_definition3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('menu-list', _.MenuList, {
  description: 'A set of related items that can be shown or hidden.',
  designerNotes: '\n* Children can be shown or hidden by clicking their title.\n* Useful to create simple accordion or menu patterns.\n  ',
  relatedComponentsNotes: '\n* Navigating the hierarchy of the app? [Try Menu](/components/menu).\n* Quickly accessing useful hyperlinks? [Try Animated Menu Button](/components/animated-menu-button).\n* Choosing between variants of the same page, or filtering content? [Try Tabs](/components/tabs).\n ',
  associatedDefinitions: [_definition4.default],
  hiddenProps: ["filter"],
  propRequires: {
    collapsible: "title"
  },
  propTypes: {
    filter: "Boolean",
    title: "String",
    collapsible: "Boolean",
    className: "String",
    children: "Node"
  },
  propDescriptions: {
    filter: "Enable a filter for the menu. When this is enabled each menu item requires a name prop.",
    title: "Define a title for the menu, if this is defined then the menu can be collapsible.",
    collapsible: "Turns collapsible on/off.",
    className: "Classes for the component.",
    children: "This component supports children."
  }
});

definition.addChildByDefinition(_definition4.default, {
  children: "Menu Item One"
});

definition.addChildByDefinition(_definition4.default, {
  children: '<MenuList title="Menu Item Two" filter={ true }>\n    <MenuListItem name="First Sub Item">\n      First Sub Item\n    </MenuListItem>\n    <MenuListItem name="Second Sub Item">\n      Second Sub Item\n    </MenuListItem>\n    <MenuListItem name="Third Sub Item">\n      Third Sub Item\n    </MenuListItem>\n  </MenuList>'
});

definition.addChildByDefinition(_definition4.default, {
  children: "Menu Item Three"
});

definition.addChildByDefinition(_definition4.default, {
  children: "Menu Item Four"
});

exports.default = definition;