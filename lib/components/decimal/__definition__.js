'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _optionsHelper = require('./../../utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('decimal', _2.default, {
  description: 'Captures a number with a decimal point, or a currency value.',
  designerNotes: '\n* For currency values, show currency symbols outside the field rather than inserting one for the user dynamically.\n* Carbon offers a Precision configuration, so you can choose how many decimal places to show.\n* Decimals are usually right-aligned, so that the decimal places of numbers presented in rows line up for easy comparison by the user.\n* Even if the user just enters a string of numbers, consider presenting them into a format with the separators which apply in the user\u2019s country (e.g. \xA312,345.67 for the UK, and \u20AC12 345,67 for France).\n* Where it\u2019s clear a field only accepts numerals, you could disable entry of other characters - but remember to cater for a minus sign if necessary.\n  ',
  relatedComponentsNotes: '\n* Entering whole numbers without a decimal point? [Try Number Input](/components/number-input).\n ',
  type: 'form',
  hiddenProps: ['name', 'onBlur', 'onKeyDown'],
  propTypes: {
    align: 'String',
    precision: 'Number'
  },
  propDescriptions: {
    align: 'Sets the alignment of the text within the decimal component',
    precision: 'Sets the precision of the decimal'
  },
  propOptions: {
    align: _optionsHelper2.default.alignBinary
  },
  propValues: {
    value: '0.00'
  }
});

definition.isAnInput();

exports.default = definition;