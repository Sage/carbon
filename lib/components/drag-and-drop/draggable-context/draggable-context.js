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

var _itemTarget = require('./../../../utils/helpers/dnd/item-target');

var _itemTarget2 = _interopRequireDefault(_itemTarget);

var _customDragLayer = require('./../custom-drag-layer');

var _customDragLayer2 = _interopRequireDefault(_customDragLayer);

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
 *   import { DraggableContext, WithDrop, WithDrag } from 'carbon/lib/components/drag-and-drop'
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

  function DraggableContext() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DraggableContext);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DraggableContext.__proto__ || Object.getPrototypeOf(DraggableContext)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      activeIndex: null // {Number} tracks the currently dragged index


      /**
       * Returns this draggable context properties to child components.
       *
       * @method getChildContext
       * @return {void}
       */
    }, _this.handleHover = _itemTarget2.default.onHoverUpDown, _this.handleDrag = function (originalIndex, hoverIndex) {
      _this.setState({ activeIndex: hoverIndex });

      if (typeof originalIndex !== 'undefined') {
        _this.props.onDrag(originalIndex, hoverIndex);
      }
    }, _this.handleBeginDrag = function (props) {
      return _extends({
        index: props.index
      }, props);
    }, _this.handleEndDrag = function () {
      // dragging has ended so remove the active index
      _this.setState({ activeIndex: null });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

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
        { className: 'carbon-draggable-context' },
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
  onDrag: _propTypes2.default.func.isRequired };
DraggableContext.childContextTypes = {
  dragAndDropActiveIndex: _propTypes2.default.number, // Tracks the currently dragged index
  dragAndDropBeginDrag: _propTypes2.default.func, // Callback for when dragging begins
  dragAndDropEndDrag: _propTypes2.default.func, // Callback for when dragging ends
  dragAndDropHover: _propTypes2.default.func, // Callback for when a hover is triggered
  dragAndDropOnDrag: _propTypes2.default.func // Callback for when order is changed
};
DraggableContext.defaultProps = {
  customDragLayer: _react2.default.createElement(_customDragLayer2.default, null)
};
exports.default = (0, _reactDnd.DragDropContext)((0, _reactDndTouchBackend2.default)({ enableMouseEvents: true }))(DraggableContext);