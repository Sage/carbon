'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collect = exports.UndecoratedCustomDragLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDnd = require('react-dnd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var collect = function collect(monitor) {
  var item = monitor.getItem();
  return {
    currentOffset: monitor.getSourceClientOffset(),
    item: item,
    draggableNode: item ? item.draggableNode() : null,
    isDragging: monitor.isDragging()
  };
};

var CustomDragLayer = function (_React$Component) {
  _inherits(CustomDragLayer, _React$Component);

  function CustomDragLayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CustomDragLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CustomDragLayer.__proto__ || Object.getPrototypeOf(CustomDragLayer)).call.apply(_ref, [this].concat(args))), _this), _this.createClonedChild = function (props) {
      if (_this._container) {
        _this.width = props.draggableNode.getBoundingClientRect().width;
        _this.clonedChild = props.draggableNode.cloneNode(true);
        _this.clonedChild.style.pointerEvents = 'auto'; // allow the css to define the pointer style
        _this._container.appendChild(_this.clonedChild);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CustomDragLayer, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.isDragging && nextProps.draggableNode && nextProps.draggableNode !== this.props.draggableNode) {
        this.setClonedChildWidth(nextProps);
      }

      if (nextProps.draggableNode && nextProps.isDragging && !this.clonedChild) {
        this.createClonedChild(nextProps);
      } else if (!nextProps.draggableNode && this.clonedChild) {
        this.removeClonedChild();
      }
    }
  }, {
    key: 'getItemStyles',
    value: function getItemStyles(props) {
      var currentOffset = props.currentOffset;

      if (!currentOffset) {
        return { display: 'none' };
      }

      var x = currentOffset.x,
          y = currentOffset.y;

      var transform = 'translate(' + x + 'px, ' + y + 'px)';
      return {
        transform: transform,
        WebkitTransform: transform,
        width: this.width
      };
    }
  }, {
    key: 'setClonedChildWidth',
    value: function setClonedChildWidth(props) {
      this.width = props.draggableNode.getBoundingClientRect().width;
    }
  }, {
    key: 'removeClonedChild',
    value: function removeClonedChild() {
      this._container.removeChild(this.clonedChild);
      this.clonedChild = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'custom-drag-layer' },
        _react2.default.createElement('div', {
          className: 'custom-drag-layer__container',
          ref: function ref(node) {
            _this2._container = node;
          },
          style: this.getItemStyles(this.props)
        })
      );
    }
  }]);

  return CustomDragLayer;
}(_react2.default.Component);

CustomDragLayer.propTypes = {
  /**
   * The dom node being dragged.
   *
   * @property draggableNode
   * @type {Node|Object}
   */
  draggableNode: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.node]),

  /**
   * Determine if the component is being dragged or not.
   *
   * @property isDragging
   * @type {Boolean}
   */
  /* ESLint is not detecting that the prop is called via nextProps */
  /* eslint-disable react/no-unused-prop-types */
  isDragging: _propTypes2.default.bool.isRequired
  /* eslint-enable react/no-unused-prop-types */
};


var UndecoratedCustomDragLayer = CustomDragLayer;
exports.UndecoratedCustomDragLayer = UndecoratedCustomDragLayer;
exports.collect = collect;
exports.default = (0, _reactDnd.DragLayer)(collect)(CustomDragLayer);