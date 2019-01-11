'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('textbox', _2.default, {
  description: 'Captures a single line of text.',
  designerNotes: '\n* Use placeholder text to give the user examples of data formats (e.g. AB123456C for a UK National Insurance number).\n* Use prefixes if your data always begins with a certain sequence (e.g. a UK VAT number usually starts with \u2018GB\u2019).\n* If content in a textbox is never editable, think about removing the field border so it appears as static text.\n* You can disable a textbox, but try to avoid this. If you need to, make it clear what the user needs to do in order to activate the textbox.\n* Use wider fields for longer data (e.g. an address line), and narrower fields for shorter data (e.g. a postcode), to give the user a clue about the data expected.\n  ',
  relatedComponentsNotes: '\n* More than a single line of text? [Try Textarea](/components/textarea).\n',
  type: 'form',
  propValues: {
    value: ''
  }
});

definition.isAnInput();

exports.default = definition;