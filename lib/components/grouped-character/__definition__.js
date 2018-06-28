'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('grouped-character', _2.default, {
  hiddenProps: ["groups"],
  propTypes: {
    className: "String",
    groups: "Array",
    separator: "String",
    inputWidth: "String",
    value: "String"
  },
  propDescriptions: {
    className: "Classes to apply to the component.",
    groups: "Determine groups of characters e.g. [1, 2, 3] would create the following text in the input 'A-BC-DEF'",
    separator: "Separator to split the character groups. Defaulted to a dash '-'. Must be a non alpha-numeric character",
    inputWidth: "Inline style to set the width of the component. Used if you want the width to match the character length",
    value: "The value of the input"
  },
  propValues: {
    groups: '[2,4,4]'
  }
});

definition.isAnInput();

exports.default = definition;