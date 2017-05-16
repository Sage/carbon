'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('date-input', _2.default, {
  description: 'Captures a single date.',
  designerNotes: '\n* If the date is likely to be close to today (e.g. an invoice due date), then a datepicker may be useful. If the date is likely to be far in the past (e.g. a date of birth), then it may be better to use separate inputs for day, month, and year.\n* Field focus automatically opens the datepicker, but a user can key in dates too, which many users find more convenient, especially in financial applications.\n* Carbon handles a range of formats, like dd/mm/yyyy, dd/mm/yy, dd/mm, or dd. Configuration can be regional, and copes with space, slash, full stop, or colon as separators.\n  ',
  relatedComponentsNotes: '\n* Entering or picking a start and end date together? [Try Date Range](/components/date-range).\n ',
  type: 'form',
  hiddenProps: ['minDate', 'maxDate'],
  propTypes: {
    minDate: "String",
    maxDate: "String"
  },
  propDescriptions: {
    minDate: "Set a minimum value for date.",
    maxDate: "Set a maximum value for date."
  }
});

definition.isAnInput();

exports.default = definition;