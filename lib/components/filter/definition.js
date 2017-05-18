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

var _definition3 = require('./../textbox/definition');

var _definition4 = _interopRequireDefault(_definition3);

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

definition.addChildByDefinition(_definition4.default, {
  fieldHelp: null,
  labelHelp: null
});

definition.addChildByDefinition(_definition4.default, {
  fieldHelp: null,
  labelHelp: null
});

definition.addChildByDefinition(_definition4.default, {
  fieldHelp: null,
  labelHelp: null
});

exports.default = definition;