'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('table-subheader', _2.default, {
  propTypes: {
    align: "String",
    name: "String",
    sortable: "Boolean"
  },
  propDescriptions: {
    align: "Aligns the text in the cell. Can be set to left, center or right.",
    name: "This will normally match the key for data displayed in this column, it is used to identify the sort column in the table.",
    sortable: "Turn sortable on/off for this column."
  }
});

exports.default = definition;