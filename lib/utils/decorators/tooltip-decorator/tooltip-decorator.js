'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tooltip = require('./../../../components/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _chainFunctions = require('./../../helpers/chain-functions');

var _chainFunctions2 = _interopRequireDefault(_chainFunctions);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _ether = require('./../../ether');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TooltipDecorator.
 *
 * This decorator attaches a tooltip to a component.
 *
 * == How to use Tooltip decorator in a component:
 *
 * In your file:
 *
 *   import TooltipDecorator from 'carbon/lib/utils/decorators/tooltip-decorator';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = TooltipDecorator(
 *   class MyComponent extends React.Component {
 *     ...
 *   });
 *
 * You must also output the tooltip HTML in your component's render method:
 *
 * e.g.
 *
 * render() {
 *   return (
 *     <div>
 *       { this.tooltipHTML }
 *       ...your components JSX
 *     </div>
 *   );
 * }
 *
 * You must also give the surrounding div of the component a position of 'relative'
 *
 * e.g.
 *
 * render() {
 *   return (
 *     <div className='relative-class'>
 *       { this.tooltipHTML }
 *       ...your component's JSX
 *     </div>
 *   );
 * }
 *
 * The targetted JSX must also have a ref of _target and have the correct componentProps
 *
 * e.g.
 *
 * render() {
 *   return (
 *     <div className='relative-class'>
 *       <span
 *         ref={ (comp) => this._target = comp }
 *         { ...this.componentProps }
 *       />
 *       { this.tooltipHTML }
 *     </div>
 *   );
 * }
 *
 * To activate the tooltip, you must pass a prop of 'tooltipMessage' with some text content.
 *
 * render() {
 *   return (
 *     <MyComponent tooltipMessage='Some Helpful Content' />
 *   )
 * }
 *
 *
 * @method TooltipDecorator
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
var TooltipDecorator = function TooltipDecorator(ComposedComponent) {
  var _class, _temp;

  return _temp = _class = function (_ComposedComponent) {
    _inherits(Component, _ComposedComponent);

    function Component() {
      var _ref;

      _classCallCheck(this, Component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = Component.__proto__ || Object.getPrototypeOf(Component)).call.apply(_ref, [this].concat(args)));

      _this._tooltipTimeout = null;
      _this._memoizedShifts = null;
      _this.state = {
        /**
         * Whether tooltip currently showing
         *
         * @property isVisible
         * @type {Boolean}
         * @default false
         */
        isVisible: false
      };

      _this.onShow = function () {
        _this._tooltipTimeout = setTimeout(function () {
          _this.setState({ isVisible: true });
          _this.positionTooltip();
        }, 100);
      };

      _this.onHide = function () {
        clearTimeout(_this._tooltipTimeout);
        _this.setState({ isVisible: false });
      };

      _this.getTarget = function () {
        return _reactDom2.default.findDOMNode(_this._target);
      };

      _this.getTooltip = function () {
        return _reactDom2.default.findDOMNode(_this._tooltip);
      };

      _this.calculatePosition = function (tooltip, target) {
        if (_this._memoizedShifts) {
          return _this._memoizedShifts;
        }

        var tooltipWidth = tooltip.offsetWidth,
            tooltipHeight = tooltip.offsetHeight,
            pointerDimension = 15,

        // hardcode height & width since span has no dimensions
        pointerOffset = 11,
            targetWidth = target.offsetWidth,
            targetHeight = target.offsetHeight;

        return {
          verticalY: -tooltipHeight - pointerDimension * 0.5,
          verticalCenter: -tooltipWidth * 0.5 + targetWidth * 0.5,
          verticalRight: pointerDimension + pointerOffset - tooltipWidth,
          verticalLeft: -pointerDimension * 0.5,
          rightHorizontal: targetWidth + 0.5 * pointerDimension,
          leftHorizontal: -pointerDimension * 0.5 - tooltipWidth,
          sideTop: -pointerOffset,
          sideBottom: -tooltipHeight + targetHeight + pointerOffset,
          sideCenter: targetHeight * 0.5 - tooltipHeight * 0.5
        };
      };

      _this.positionTooltip = function () {
        if (_this.state.isVisible) {

          var tooltip = _this.getTooltip(),
              target = _this.getTarget();

          if (!tooltip || !target) {
            // Can't find the tooltip or target so hide
            _this.setState({ isVisible: false });
            return;
          }

          var alignment = _this.props.tooltipAlign || 'center',
              position = _this.props.tooltipPosition || 'top',
              shifts = _this.calculatePosition(tooltip, target);

          switch (position) {
            case "top":
              (0, _ether.styleElement)(tooltip, 'top', (0, _ether.append)(shifts.verticalY, 'px'));
              (0, _ether.styleElement)(tooltip, 'right', 'auto');
              (0, _ether.styleElement)(tooltip, 'bottom', 'auto');
              (0, _ether.styleElement)(tooltip, 'left', (0, _ether.append)(shifts['vertical' + (0, _lodash.startCase)(alignment)], 'px'));
              break;

            case "bottom":
              (0, _ether.styleElement)(tooltip, 'top', 'auto');
              (0, _ether.styleElement)(tooltip, 'bottom', (0, _ether.append)(shifts.verticalY, 'px'));
              (0, _ether.styleElement)(tooltip, 'left', (0, _ether.append)(shifts['vertical' + (0, _lodash.startCase)(alignment)], 'px'));
              break;

            case "left":
              (0, _ether.styleElement)(tooltip, 'top', (0, _ether.append)(shifts['side' + (0, _lodash.startCase)(alignment)], 'px'));
              (0, _ether.styleElement)(tooltip, 'bottom', 'auto');
              (0, _ether.styleElement)(tooltip, 'left', (0, _ether.append)(shifts[position + 'Horizontal'], 'px'));
              break;

            case "right":
              (0, _ether.styleElement)(tooltip, 'top', (0, _ether.append)(shifts['side' + (0, _lodash.startCase)(alignment)], 'px'));
              (0, _ether.styleElement)(tooltip, 'bottom', 'auto');
              (0, _ether.styleElement)(tooltip, 'left', (0, _ether.append)(shifts[position + 'Horizontal'], 'px'));
          }
        }
      };

      return _this;
    }

    /**
     * Timeout for firing ajax request
     *
     * @property _tooltipTimeout
     */


    /**
     * Cache the shifts calculations (used for positioning)
     *
     * @property _memoizedShifts
     */


    _createClass(Component, [{
      key: 'componentWillUpdate',


      /**
       * @method componentWillUpdate
       * @return {Void}
       */
      value: function componentWillUpdate(nextProps, nextState) {
        if (_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentWillUpdate', this)) {
          _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentWillUpdate', this).call(this, nextProps, nextState);
        }

        if (nextProps.tooltipMessage != this.props.tooltipMessage || nextProps.tooltipPosition != this.props.tooltipPosition || nextProps.tooltipAlign != this.props.tooltipAlign) {
          this._memoizedShifts = null;
        }
      }

      /**
       * @method componentDidUpdate
       * @return {Void}
       */

    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentDidUpdate', this)) {
          _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentDidUpdate', this).call(this, prevProps);
        }

        if (this.props.tooltipMessage && !this._memoizedShifts && this.state.isVisible) {
          this.positionTooltip();
        }
      }

      /**
       * A lifecycle called immediatly before new props cause a re-render
       * Resets the hover state if active
       *
       * @method componentWillReceiveProps
       */

    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentWillReceiveProps', this)) {
          _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
        }

        if (this.state.isVisible) {
          this.setState({ isVisible: false });
        }
      }

      /**
       * Shows tooltip
       *
       * @method onShow
       * @return {void}
       */


      /**
       * Hides tooltip
       *
       * @method onHide
       * @return {void}
       */


      /**
       * Returns the DOM node of the target.
       *
       * @method getTarget
       * @return {DOM node}
       */


      /**
       * Returns the DOM node of the tooltip.
       *
       * @method getTooltip
       * @return {DOM node}
       */


      /**
       * Calculates position for tooltip, first result cached.
       *
       * @method calculatePosition
       * @param {Object} tooltip
       * @param {Object} target
       * @return {Object} shifts calculated
       */


      /**
       * Positions tooltip relative to target
       *
       * @method positionTooltip
       * @param {Object} tooltip
       * @param {Object} target
       * @return {Void}
       */

    }, {
      key: 'componentProps',


      /**
       * Additional Props for decorated component
       *
       * @method componentProps
       * @return {Object} props
       */
      get: function get() {
        var props = _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentProps', this) || {};

        if (this.props.tooltipMessage) {
          props.onMouseEnter = (0, _chainFunctions2.default)(this.onShow, props.onMouseEnter);
          props.onMouseLeave = (0, _chainFunctions2.default)(this.onHide, props.onMouseLeave);
          props.onFocus = (0, _chainFunctions2.default)(this.onShow, props.onFocus);
          props.onBlur = (0, _chainFunctions2.default)(this.onHide, props.onBlur);
          props.onTouchEnd = this.state.isVisible ? this.onHide : this.onShow;
        }
        return props;
      }

      /**
       * Supplies the HTML for tooltip
       *
       * @method tooltipHTML
       * @return {Object} JSX for tooltip
       */

    }, {
      key: 'tooltipHTML',
      get: function get() {
        var _this2 = this;

        if (this.props.tooltipMessage) {
          return _react2.default.createElement(
            _tooltip2.default,
            {
              align: this.props.tooltipAlign,
              'data-element': 'tooltip',
              isVisible: this.state.isVisible,
              position: this.props.tooltipPosition,
              ref: function ref(comp) {
                return _this2._tooltip = comp;
              }
            },
            this.props.tooltipMessage
          );
        }
      }
    }]);

    return Component;
  }(ComposedComponent), _class.propTypes = (0, _lodash.assign)({}, ComposedComponent.propTypes, {

    /**
     * The message for this tooltip
     *
     * @property
     * @type {String}
     */
    tooltipMessage: _propTypes2.default.string,

    /**
     * The position of this tooltip: top, bottom, left or right
     *
     * @property
     * @default top
     * @type {String}
     */
    tooltipPosition: _propTypes2.default.string,

    /**
     * The alignment of this tooltip: left, right or center
     *
     * @property
     * @default center
     * @type {String}
     */
    tooltipAlign: _propTypes2.default.string
  }), _temp;
};

exports.default = TooltipDecorator;