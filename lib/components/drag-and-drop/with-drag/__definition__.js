'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('with-drag', _2.default, {
  props: ['identifier', 'canDrag', 'beginDrag', 'endDrag'],
  propTypes: {
    identifier: "String",
    canDrag: "Function",
    beginDrag: "Function",
    endDrag: "Function"
  },
  propDescriptions: {
    identifier: "Associates an instance of WithDrag with an instance of WithDrop, so multiple DraggableContexts can work independently.",
    canDrag: "An optional callback which can be used to determine if this item is draggable.",
    beginDrag: "An optional callback triggered when dragging begins.",
    endDrag: "An optional callback triggered when dragging ends."
  }
});

exports.default = definition;