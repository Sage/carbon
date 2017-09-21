'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('column', _2.default, {
  type: 'layout',
  propTypes: {
    className: "String",
    columnOffset: "String",
    columnSpan: "String",
    columnAlign: "String",
    children: "Node"
  },
  propDescriptions: {
    className: "Classes to apply to the component.",
    columnOffset: "Offset this column by a certain number of columns.",
    columnSpan: "Span this column by a certain number of columns.",
    columnAlign: "Align the content of this column.",
    children: "This component supports children."
  }
});

exports.default = definition;