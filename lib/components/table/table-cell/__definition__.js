'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('table-cell', _2.default, {
  propTypes: {
    align: "String",
    action: "Boolean",
    children: "Node",
    className: "String"
  },
  propDescriptions: {
    align: "Aligns the text in the cell. Can be set to left, center or right.",
    action: "Defines if this cell is used for actions, such as the delete or select action (it makes the column more narrow).",
    children: "This component supports children.",
    className: "Classes to apply to the component."
  }
});

exports.default = definition;