'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _optionsHelper = require('../../utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _definition__ = require('./../textbox/__definition__');

var _definition__2 = _interopRequireDefault(_definition__);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('filter', _2.default, {
  propOptions: {
    align: _optionsHelper2.default.alignBinary
  },
  propTypes: {
    align: "String"
  },
  propDescriptions: {
    align: "Align the inputs within the filter."
  }
});

definition.addChildByDefinition(_definition__2.default, {
  fieldHelp: null,
  labelHelp: null
});

definition.addChildByDefinition(_definition__2.default, {
  fieldHelp: null,
  labelHelp: null
});

definition.addChildByDefinition(_definition__2.default, {
  fieldHelp: null,
  labelHelp: null
});

exports.default = definition;