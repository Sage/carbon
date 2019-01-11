'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _definition = require('./../../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _optionsHelper = require('../../../utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('step-sequence-item', _2.default, {
  description: '',
  designerNotes: '',
  relatedComponentsNotes: '',
  propDescriptions: {
    indicator: '',
    children: '',
    status: ''
  },
  propOptions: {
    status: _optionsHelper2.default.steps
  },
  propTypes: {
    ariaLabel: 'String',
    ariaCompleteLabel: 'String',
    ariaCurrentLabel: 'String',
    indicator: 'String',
    children: 'node',
    status: 'String'
  },
  propValues: {
    ariaLabel: 'Step 1 of 5',
    ariaCompleteLabel: 'Complete',
    ariaCurrentLabel: 'Current',
    children: 'Step Label',
    indicator: '1',
    status: 'current'
  }
});

exports.default = definition;