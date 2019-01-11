'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('page', _2.default, {
  props: ['children', 'title'],
  propTypes: {
    title: 'Node',
    children: 'Node'
  },
  propDescriptions: {
    title: 'The title for the page, normally a Heading component.',
    children: 'This component supports children.'
  }
});

exports.default = definition;