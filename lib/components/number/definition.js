'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('number-input', _2.default, {
  description: 'Captures a whole number (not a decimal or currency value).',
  designerNotes: '\n* Where it\u2019s clear a field only accepts numerals, you could disable entry of other characters. But, remember than for some regions, phone numbers and postcodes might contain dashes, and remember to cater for a minus sign if necessary.\n  ',
  relatedComponentsNotes: '\n* Entering a number including a decimal point? [Try Decimal](/components/decimal).\n* Entering numbers, symbols, and letters, or handling various formats? [Try Textbox](/components/textbox).\n ',

  type: 'form',
  propValues: {
    value: ''
  }
});

definition.isAnInput();

exports.default = definition;