'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDnd = require('react-dnd');

var _itemTypes = require('./../../../utils/helpers/dnd/item-types');

var _itemTypes2 = _interopRequireDefault(_itemTypes);

var _text = require('./../../../utils/helpers/text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WithDrop = function (_React$Component) {
  _inherits(WithDrop, _React$Component);

  function WithDrop() {
    _classCallCheck(this, WithDrop);

    return _possibleConstructorReturn(this, (WithDrop.__proto__ || Object.getPrototypeOf(WithDrop)).apply(this, arguments));
  }

  _createClass(WithDrop, [{
    key: 'render',
    value: function render() {
      // this.props.connectDragSource comes from react-dnd DragSource higher
      // order component, so disable the react/prop-types ESLint rule on the line
      // below
      return this.props.connectDropTarget(this.props.children); // eslint-disable-line react/prop-types
    }
  }]);

  return WithDrop;
}(_react2.default.Component);

WithDrop.propTypes = {
  /**
   * The component that will have drop enabled
   *
   * @property children
   * @type {Object}
   */
  children: _propTypes2.default.node.isRequired,

  // The following prop types are required by react-dnd,
  // and aren't used in this component directly. Therefore
  // disable the ESLint rule react/no-unused-prop-types
  /* eslint-disable react/no-unused-prop-types */
  identifier: _propTypes2.default.string, // identifies an association between WithDrag and WithDrop
  index: _propTypes2.default.number.isRequired, // identifies the index for this item
  hover: _propTypes2.default.func, // an optional callback to trigger when the item is hovered
  onDrag: _propTypes2.default.func // an optional callback to trigger when dragging occurs
  /* eslint-enable react/no-unused-prop-types */
};
WithDrop.contextTypes = {
  dragAndDropOnDrag: _propTypes2.default.func,
  dragAndDropHover: _propTypes2.default.func
};


var ItemTarget = {
  hover: function hover(props, monitor, component) {
    _text2.default.clearSelection();
    var hover = props.hover || component.context.dragAndDropHover;
    hover(props, monitor, component);
  }
};

WithDrop = (0, _reactDnd.DropTarget)( // eslint-disable-line no-class-assign
_itemTypes2.default.getItemType, ItemTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
})(WithDrop);

exports.default = WithDrop;