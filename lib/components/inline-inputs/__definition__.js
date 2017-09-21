'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition__ = require('./../textbox/__definition__');

var _definition__2 = _interopRequireDefault(_definition__);

var _definition__3 = require('./../decimal/__definition__');

var _definition__4 = _interopRequireDefault(_definition__3);

var _definition__5 = require('./../dropdown-filter-ajax/__definition__');

var _definition__6 = _interopRequireDefault(_definition__5);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('inline-inputs', _2.default, {
  description: 'Edits a set of closely related inputs that are grouped together.',
  propTypes: {
    label: 'String',
    children: 'Node',
    className: 'String',
    htmlFor: 'String'
  },
  propValues: {
    label: 'Inline Inputs'
  },
  hiddenProps: ['className', 'htmlFor'],
  propDescriptions: {
    label: 'Label applied to set of inputs',
    htmlFor: 'label for property',
    className: 'Classes applied to the inline inputs component',
    children: 'Supports all inputs as children'
  }
});

var inputProps = {
  fieldHelp: null,
  label: null,
  labelHelp: null
};

definition.addChildByDefinition(_definition__2.default, inputProps);
definition.addChildByDefinition(_definition__4.default, inputProps);
definition.addChildByDefinition(_definition__6.default, inputProps);

exports.default = definition;