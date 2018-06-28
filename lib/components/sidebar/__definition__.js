'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _optionsHelper = require('./../../utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _definition__ = require('./sidebar-header/__definition__');

var _definition__2 = _interopRequireDefault(_definition__);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('sidebar', _.Sidebar, {
  description: 'A sidebar overlaid at the right or left of a page.',
  designerNotes: '\n* Useful to perform an action in context without navigating the user to a separate page.\n* Useful if the user might need to refer back to the page behind the sidebar. For example, the user could select from a list of clients on the page, with detailed information on the client loading in the sidebar.\n* Several pre-set widths are available, and the height is always 100%. It\u2019s best to avoid sidebars that are taller than the user\u2019s viewport height, as a scroll would hide some information. Typical user viewport heights can be as little as 650 pixels.\n* Choose whether a dark tint is applied behind the dialog which helps to focus the user on the sidebar, but don\u2019t select this option if the user needs to refer back to the underlying page.\n  ',
  relatedComponentsNotes: '\n* Simple task in context? [Try Dialog](/components/dialog).\n* Complex task that needs more space? [Try Dialog Full Screen](/components/dialog-full-screen).\n ',
  associatedDefinitions: [_definition__2.default],
  propOptions: {
    position: _optionsHelper2.default.alignBinary,
    size: _optionsHelper2.default.sizesFull
  },
  propValues: {
    children: '<SidebarHeader>\n    Header Content\n  </SidebarHeader>\n\n  Main Content'
  },
  propTypes: {
    position: "String",
    size: "String"
  },
  propDescriptions: {
    position: "Sets the position of sidebar, either left or right.",
    size: "Sets the size of the sidebar when open."
  }
});

definition.isAModal();

exports.default = definition;