'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _optionsHelper = require('../../utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _ = require('./');

var _definition__ = require('./step-sequence-item/__definition__');

var _definition__2 = _interopRequireDefault(_definition__);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('step-sequence', _.StepSequence, {
  description: '',
  designerNotes: '',
  relatedComponentsNotes: '',
  propDescriptions: {
    orientation: ''
  },
  propOptions: {
    orientation: _optionsHelper2.default.orientation
  },
  propTypes: {
    orientation: 'String'
  },
  propValues: {
    orientation: 'horizontal'
  }
});

exports.default = definition;


definition.addChildByDefinition(_definition__2.default, {
  ariaLabel: 'Step 1 of 5',
  children: 'Name',
  indicator: '1',
  status: 'complete'
});
definition.addChildByDefinition(_definition__2.default, {
  ariaLabel: 'Step 2 of 5',
  children: 'Delivery Address',
  indicator: '2',
  status: 'complete'
});
definition.addChildByDefinition(_definition__2.default, {
  ariaLabel: 'Step 3 of 5',
  children: 'Delivery Details',
  indicator: '3',
  status: 'current'
});
definition.addChildByDefinition(_definition__2.default, {
  ariaLabel: 'Step 4 of 5',
  children: 'Payment',
  indicator: '4',
  status: 'incomplete'
});
definition.addChildByDefinition(_definition__2.default, {
  ariaLabel: 'Step 5 of 5',
  children: 'Confirm',
  indicator: '5',
  status: 'incomplete'
});