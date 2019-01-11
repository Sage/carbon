'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDndTouchBackend = require('react-dnd-touch-backend');

var _reactDndTouchBackend2 = _interopRequireDefault(_reactDndTouchBackend);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _itemTarget = require('../../../utils/helpers/dnd/item-target');

var _itemTarget2 = _interopRequireDefault(_itemTarget);

var _customDragLayer = require('../custom-drag-layer');

var _customDragLayer2 = _interopRequireDefault(_customDragLayer);

var _browser = require('../../../utils/helpers/browser');

var _browser2 = _interopRequireDefault(_browser);

var _scrollableParent = require('../../../utils/helpers/scrollable-parent');

var _scrollableParent2 = _interopRequireDefault(_scrollableParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A draggable context component
 *
 * == How to use a draggable context in a component:
 *
 * In your file
 *
 *   import { DraggableContext, WithDrop, WithDrag } from 'carbon-react/lib/components/drag-and-drop'
 *
 * A draggable context is used to define an area in the page where drag and drop can be used on
 * one or more elements (you also need to use WithDrop and WithDrag):
 *
 *   <DraggableContext onDrag={ onItemMoved }>
 *     <ol>
 *       {
 *         items.map((item, index) => {
 *           return (
 *             <WithDrop index={ index }>
 *               <li>
 *                 <WithDrag><span>{ item.content }</span></WithDrag>
 *               </li>
 *             </WithDrop>
 *           );
 *         })
 *       }
 *     </ol>
 *   </DraggableContext>
 *
 * @class DraggableContext
 * @constructor
 */
var DraggableContext = function (_React$Component) {
  _inherits(DraggableContext, _React$Component);

  function DraggableContext(props) {
    _classCallCheck(this, DraggableContext);

    // Default speed of auto scrolling
    var _this = _possibleConstructorReturn(this, (DraggableContext.__proto__ || Object.getPrototypeOf(DraggableContext)).call(this, props));

    _initialiseProps.call(_this);

    _this.speed = 0;

    // Frame callback ref
    _this.frame = null;

    // Document element to scroll if any
    _this.element = null;
    return _this;
  }

  /**
   * Returns this draggable context properties to child components.
   *
   * @method getChildContext
   * @return {void}
   */


  /**
   * Defines a context object for child components of the draggable context component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property childContextTypes
   * @type {Object}
   */


  _createClass(DraggableContext, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        dragAndDropActiveIndex: this.state.activeIndex,
        dragAndDropBeginDrag: this.handleBeginDrag,
        dragAndDropEndDrag: this.handleEndDrag,
        dragAndDropHover: this.handleHover,
        dragAndDropOnDrag: this.handleDrag
      };
    }

    /**
     * A callback for when hover is triggered
     *
     * @method handleHover
     * @return {Void}
     */


    /**
     * A callback for when auto scroll is triggered
     *
     * @method autoScroll
     * @param {Object} ev event
     * @return {void}
     */


    /**
     * A callback for when a drag is triggered.
     *
     * Stores the hoverIndex in state as activeIndex,
     * and calls this.props.onDrag only if originalIndex
     * is not undefined.
     *
     * @method handleDrag
     * @param {Number} originalIndex (the active item's original index)
     * @param {Number} hoverIndex (the active item's new index
     * @return {Void}
     */


    /**
     * A callback for when dragging begins.
     *
     * Sets state of dragging to true which
     * will trigger the start of auto scroll
     * if it is enabled.
     *
     * @method handleBeginDrag
     * @param {Object} props
     * @return {Void}
     */


    /**
     * A callback for when a drag ends triggered.
     *
     * @method handleEndDrag
     * @return {Void}
     */

  }, {
    key: 'render',


    /**
     * Renders the component
     */
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: 'carbon-draggable-context',
          onMouseMove: this.props.autoScroll && this.state.activeIndex !== null ? this.checkAutoScroll : undefined
        },
        this.props.children,
        this.props.customDragLayer
      );
    }
  }]);

  return DraggableContext;
}(_react2.default.Component);

DraggableContext.propTypes = {
  /**
   * The element(s) where you want to apply drag
   * and drop functionality
   *
   * @property children
   * @type {Object}
   */
  children: _propTypes2.default.node.isRequired,

  /**
   * Optional CustomDragLayer to use for the ghost row when dragging & dropping
   *
   * @property customDragLayer
   * @type {Object}
   */
  customDragLayer: _propTypes2.default.node,

  /**
   * Callback function for when an item has been dragged
   * e.g. to update data in a store
   */
  onDrag: _propTypes2.default.func.isRequired,

  /**
   * Prop to enable/disable auto scroll on drag
   *
   * @property autoScroll
   * @type {Bool}
   */
  autoScroll: _propTypes2.default.bool };
DraggableContext.childContextTypes = {
  dragAndDropActiveIndex: _propTypes2.default.number, // Tracks the currently dragged index
  dragAndDropBeginDrag: _propTypes2.default.func, // Callback for when dragging begins
  dragAndDropEndDrag: _propTypes2.default.func, // Callback for when dragging ends
  dragAndDropHover: _propTypes2.default.func, // Callback for when a hover is triggered
  dragAndDropOnDrag: _propTypes2.default.func // Callback for when order is changed
};
DraggableContext.defaultProps = {
  customDragLayer: _react2.default.createElement(_customDragLayer2.default, null),
  autoScroll: false
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.state = {
    activeIndex: null // {Number} tracks the currently dragged index
  };
  this.handleHover = _itemTarget2.default.onHoverUpDown;

  this.checkAutoScroll = function (event) {
    if (_this2.state.activeIndex === null) {
      return;
    }

    // constant for the position of the mouse pointer
    // on the y axis
    var clientY = event.clientY;

    var _Browser$getWindow = _browser2.default.getWindow(),
        innerHeight = _Browser$getWindow.innerHeight;
    // constant for the threshold where the auto scroll begins


    var threshold = Math.max(140, innerHeight / 4);

    var speed = 0;
    if (clientY < threshold) {
      // -1 to 0 as we move from 0 to threshold
      speed = -1 + clientY / threshold;
    } else if (clientY > innerHeight - threshold) {
      // 0 to 1 as we move from (innerHeight - threshold) to innerHeight
      speed = 1 - (innerHeight - clientY) / threshold;
    }

    var shouldScroll = _this2.speed === 0 && speed !== 0;
    _this2.speed = speed;
    if (shouldScroll) _this2.startScrolling();
  };

  this.startScrolling = function () {
    if (!_this2.frame) {
      _this2.frame = _browser2.default.getWindow().requestAnimationFrame(_this2.tick);
    }
  };

  this.tick = function () {
    if (!_this2.speed) {
      _this2.frame = null;
      return;
    }

    var window = _browser2.default.getWindow();

    if (!_this2.element) {
      var node = _reactDom2.default.findDOMNode(_this2); // eslint-disable-line  react/no-find-dom-node
      _this2.element = _scrollableParent2.default.searchForScrollableParent(node);
    } else {
      _this2.element.scrollTop += _this2.speed * 10;
    }

    window.scrollTo(0, window.scrollY + _this2.speed * 10);
    _this2.frame = window.requestAnimationFrame(_this2.tick);
  };

  this.handleDrag = function (originalIndex, hoverIndex) {
    _this2.setState({ activeIndex: hoverIndex });

    if (typeof originalIndex !== 'undefined') {
      _this2.props.onDrag(originalIndex, hoverIndex);
    }
  };

  this.handleBeginDrag = function (props) {
    return _extends({
      index: props.index
    }, props);
  };

  this.handleEndDrag = function () {
    // dragging has ended so remove the active index
    _this2.setState({ activeIndex: null });
    _this2.speed = 0;
  };
};

exports.default = (0, _reactDnd.DragDropContext)((0, _reactDndTouchBackend2.default)({ enableMouseEvents: true }))(DraggableContext);