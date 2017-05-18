'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('checkbox', _2.default, {
  description: 'Selects more than one option.',
  designerNotes: '\n* Checkbox provides a way to efficiently select more than one item from a list.\n* Disabled or read-only checkboxes might be difficult for a user to distinguish visually, so try to avoid this.\n* Consider \u2018smart default\u2019 selections, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.\n* Rather than a checkbox to accept legal terms, consider labelling a button \u2018Accept Terms and Continue\u2019 instead.\n  ',
  relatedComponentsNotes: '\n* Choosing one option from a longer list? [Try Radio Button](/components/radio-button).\n* Choosing one option from a very long list? [Try Dropdown](/components/dropdown).\n* Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle).\n ',
  type: 'form',
  propValues: {
    value: false
  },
  propTypes: {
    reverse: 'Boolean'
  },
  propDescriptions: {
    reverse: 'Flips the input and label render order'
  }
});

definition.isAnInput();

exports.default = definition;