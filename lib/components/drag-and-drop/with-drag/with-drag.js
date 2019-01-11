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

var _itemTypes = require('../../../utils/helpers/dnd/item-types');

var _itemTypes2 = _interopRequireDefault(_itemTypes);

var _browser = require('../../../utils/helpers/browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WithDrag = function (_React$Component) {
  _inherits(WithDrag, _React$Component);

  function WithDrag() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WithDrag);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WithDrag.__proto__ || Object.getPrototypeOf(WithDrag)).call.apply(_ref, [this].concat(args))), _this), _this.allowTextSelection = function (event) {
      var allowedElements = ['INPUT', 'TEXTAREA', 'SELECT'];
      var nonInputElement = event.target instanceof HTMLElement && allowedElements.indexOf(event.target.tagName) < 0;
      if (nonInputElement || _this.dragging) {
        event.preventDefault();
        return false;
      }
      return true;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WithDrag, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _browser2.default.getWindow().addEventListener('selectstart', this.allowTextSelection);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _browser2.default.getWindow().removeEventListener('selectstart', this.allowTextSelection);
    }

    // In Safari it changes the mouse cursor when dragging because it thinks text is being selected
    // We test if the target is an html element (not text) or if we already know the user is dragging

  }, {
    key: 'render',
    value: function render() {
      // this.props.connectDragSource comes from react-dnd DragSource higher
      // order component, so disable the react/prop-types ESLint rule on the line
      // below
      return this.props.connectDragSource(this.props.children, { // eslint-disable-line react/prop-types
        dropEffect: 'copy'
      });
    }
  }]);

  return WithDrag;
}(_react2.default.Component);

WithDrag.propTypes = {
  /**
   * The component that will have drag enabled
   *
   * @property children
   * @type {Object}
   */
  children: _propTypes2.default.node.isRequired,

  /**
   * A function that returns the dom node being dragged.
   * It not used in this compnent but is passed to CustomDragLayer via the DragLayer higher order component
   * You cannot pass a ref directly as the prop because it is undefined until mounted.
   *
   * @property draggableNode
   * @type {Function}
   */
  /* eslint-disable react/no-unused-prop-types */
  draggableNode: _propTypes2.default.func,
  /* eslint-enable react/no-unused-prop-types */

  // The following prop types are required by react-dnd,
  // and aren't used in this component directly. Therefore
  // disable the ESLint rule react/no-unused-prop-types
  /* eslint-disable react/no-unused-prop-types */
  identifier: _propTypes2.default.string, // identifies an association between WithDrag and WithDrop
  canDrag: _propTypes2.default.func, // an optional callback to determine if this item can be dragged
  beginDrag: _propTypes2.default.func, // an optional callback to trigger when dragging begins
  endDrag: _propTypes2.default.func // an optional callback to trigger when dragging ends
  /* eslint-enable react/no-unused-prop-types */
};
WithDrag.contextTypes = {
  dragAndDropBeginDrag: _propTypes2.default.func,
  dragAndDropEndDrag: _propTypes2.default.func
};


var ItemSource = {
  canDrag: function canDrag(props, monitor) {
    return props.canDrag ? props.canDrag(props, monitor) : true;
  },
  beginDrag: function beginDrag(props, monitor, component) {
    component.dragging = true;
    var beginDrag = props.beginDrag || component.context.dragAndDropBeginDrag;
    return beginDrag(props, monitor, component);
  },
  endDrag: function endDrag(props, monitor, component) {
    component.dragging = false;
    var endDrag = props.endDrag || component.context.dragAndDropEndDrag;
    return endDrag(props, monitor, component);
  }
};

WithDrag = (0, _reactDnd.DragSource)( // eslint-disable-line no-class-assign
_itemTypes2.default.getItemType, ItemSource, function (connect) {
  return {
    connectDragSource: connect.dragSource()
  };
})(WithDrag);

exports.default = WithDrag;