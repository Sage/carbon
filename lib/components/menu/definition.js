'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _optionsHelper = require('utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _definition3 = require('./menu-item/definition');

var _definition4 = _interopRequireDefault(_definition3);

var _definition5 = require('./submenu-block/definition');

var _definition6 = _interopRequireDefault(_definition5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('menu', _.Menu, {
  description: 'Navigates the user in the overall hierarchy of your app.',
  designerNotes: '\n* Presents a 2-level navigation hierarchy to the user.\n* The user\u2019s current location is indicated in green. Their hover location is indicated in blue.\n* Place separator rows into any menu to group items of similar meaning.\n* Carbon has Primary and Secondary styles for the menus - these are used to present primary and secondary navigation. A good example is the Sage One Accounting application.\n* More complex navigation patterns such as hamburger menus or mega menus are usually associated with poorer usability test performance, but might still be useful in some situations. Before trying more complex patterns, consider some user research techniques like Card Sorting to reduce the complexity in your information architecture.\n  ',
  relatedComponentsNotes: '\n* Choosing between variants of the same page, or filtering content? [Try Tabs](/components/tabs).\n* Need a container for your primary navigation? [Try Navigation Bar](/components/navigation-bar).\n* Quickly accessing useful hyperlinks? [Try Animated Menu Button](/components/animated-menu-button).\n ',
  associatedDefinitions: [_definition4.default, _definition6.default],
  propOptions: {
    as: _optionsHelper2.default.themesBinary
  },
  propTypes: {
    as: "String"
  },
  propDescriptions: {
    as: "Primary or secondary theme for the menu."
  }
});

definition.addChildByDefinition(_definition4.default, {
  children: "Item One",
  href: "#"
});

definition.addChildByDefinition(_definition4.default, {
  children: '<MenuItem href="#">Sub Menu Item One</MenuItem>\n  <MenuItem href="#">Sub Menu Item Two</MenuItem>',
  href: "#",
  submenu: "Item Two"
});

definition.addChildByDefinition(_definition4.default, {
  children: "Item Third",
  href: "#"
});

definition.addChildByDefinition(_definition4.default, {
  children: "Item Four",
  href: "#"
});

definition.addChildByDefinition(_definition4.default, {
  children: '<MenuItem href="#">Sub Menu Item One</MenuItem>\n  <SubmenuBlock>\n    <MenuItem href="#">Sub Menu Item Two</MenuItem>\n    <MenuItem href="#">Sub Menu Item Three</MenuItem>\n  </SubmenuBlock>\n  <MenuItem href="#">Sub Menu Item Four</MenuItem>\n  <MenuItem href="#">Sub Menu Item Five</MenuItem>\n  <MenuItem href="#" alternate={ true }>Sub Menu Item Six</MenuItem>\n  <MenuItem href="#">Sub Menu Item Seven</MenuItem>\n  <MenuItem href="#" divide={ true }>Sub Menu Item Eight</MenuItem>',
  href: "#",
  submenu: "Item Five",
  submenuDirection: "left"
});

exports.default = definition;