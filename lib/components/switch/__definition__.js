'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('switch', _2.default, {
  description: 'Selects more than one option.',
  designerNotes: '\n*\tSwitches provide a way to efficiently toggle between two states. They are often used on settings pages to switch on and off individual features.\n*\tDisabled or read-only Switches might be difficult for a user to distinguish visually, so try to avoid this.\n*\tConsider \u2018smart default\u2019 selections, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.\n  ',
  relatedComponentsNotes: '\n*\tChoosing more than one option? [Try Checkbox](/components/checkbox).\n*\tChoosing one option from a longer list? [Try Radio Button](/components/radio-button).\n*\tChoosing one option from a very long list? [Try Dropdown](/components/dropdown).\n*\tChoosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle).\n\t',
  type: 'form',
  propValues: {
    value: false
  },
  propTypes: {
    checked: 'Boolean',
    reverse: 'Boolean',
    value: 'Boolean',
    loading: 'Boolean'
  },
  propDescriptions: {
    checked: 'Sets the switch as on.',
    reverse: 'Flips the input and label render order',
    value: 'Set the switch as on.',
    loading: 'When provided will show a spinner in place of the tick or cross while in a loading state.'
  }
});

definition.isAnInput();

exports.default = definition;