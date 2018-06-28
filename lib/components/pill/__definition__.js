'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _optionsHelper = require('./../../utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('pill', _2.default, {
  description: 'A visual indicator which helps the user visually scan for something in common.',
  designerNotes: '\n* An eye catching visual indicator used to help a user visually scan and identify items with something in common from a wider list.\n* A range of colours and visual styles is available.\n* Pills could work particularly well in Tables, for example, to distinguish which invoices are overdue in a long list, or which subscriptions a client has, or to indicate that a feature has \u2018beta\u2019 status.\n ',
  type: 'misc',
  propOptions: {
    as: _optionsHelper2.default.colors
  },
  hiddenProps: ['onClick'],
  propTypes: {
    as: "String",
    children: "Node",
    className: 'String',
    fill: "Boolean",
    onClick: 'Function'
  },
  propValues: {
    children: "Pill"
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + _optionsHelper2.default.colors.join(", "),
    children: "This component supports children.",
    className: "Classes to apply to the component.",
    fill: "Fills the pill background with colour. When fill is false only the border is coloured.",
    onClick: "Callback function for when the pill is clicked"
  }
});

exports.default = definition;