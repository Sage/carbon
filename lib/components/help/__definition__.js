'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _optionsHelper = require('../../utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('help', _2.default, {
  description: 'User assistance or clarification presented by hovering on a question mark icon.',
  designerNotes: '\n  ',
  relatedComponentsNotes: '\n* Tooltip hovering on any Carbon icon? [Try Icon](/components/icon).\n* Tooltip hovering on any component? [Try Tooltip](/components/tooltip).\n ',
  hiddenProps: ['tooltipMessage'],
  propOptions: {
    tooltipPosition: _optionsHelper2.default.positions,
    tooltipAlign: _optionsHelper2.default.alignAroundEdges
  },
  propRequires: {
    tooltipAlign: 'children',
    tooltipPosition: 'children'
  },
  propValues: {
    children: 'This is an example of help.'
  },
  propTypes: {
    children: "Node",
    className: "String",
    href: "String",
    tooltipAlign: "String",
    tooltipPosition: "String",
    tooltipMessage: "N/A"
  },
  propDescriptions: {
    children: "This component supports children.",
    className: "Classes to apply to the component.",
    href: "Set's a href to link this help icon to.",
    tooltipAlign: "Aligns the tooltip.",
    tooltipPosition: "Positions the tooltip with the icon.",
    tooltipMessage: "N/A"
  }
});

exports.default = definition;