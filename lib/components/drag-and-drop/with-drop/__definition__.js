'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('with-drop', _2.default, {
  props: ['identifier', 'index', 'hover'],
  propTypes: {
    identifier: "String",
    index: "Number",
    hover: "Function"
  },
  requiredProps: ['index'],
  propDescriptions: {
    identifier: "Associates an instance of WithDrag with an instance of WithDrop, so multiple DraggableContexts can work independently.",
    index: "A number to track this item's current index in the collection.",
    hover: "An optional callback triggered when this item is hovered over."
  }
});

exports.default = definition;