'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('slide', _2.default, {
  props: ['children'],
  propTypes: {
    children: 'Node'
  },
  propDescriptions: {
    children: 'This component supports children.'
  }
});

exports.default = definition;