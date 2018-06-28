'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('preview', _2.default, {
  description: 'Applies a preview loading state animation',
  type: 'miscellaneous',
  propTypes: {
    children: 'Node',
    className: 'String',
    height: 'String',
    lines: 'Number',
    loading: 'Boolean',
    width: 'String'
  },
  propDescriptions: {
    children: 'Child content to render in the component.',
    className: 'Classes to be applied to the component.',
    height: 'A custom height',
    lines: 'The number of lines to render',
    loading: 'Provides more control over when in a loading state.',
    width: 'A custom width'
  }
});

exports.default = definition;