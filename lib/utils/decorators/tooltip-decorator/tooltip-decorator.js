/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_tooltip = require('./../../../components/tooltip');

/*istanbul ignore next*/
var _tooltip2 = _interopRequireDefault(_tooltip);

var /*istanbul ignore next*/_chainFunctions = require('./../../helpers/chain-functions');

/*istanbul ignore next*/
var _chainFunctions2 = _interopRequireDefault(_chainFunctions);

var /*istanbul ignore next*/_reactDom = require('react-dom');

/*istanbul ignore next*/
var _reactDom2 = _interopRequireDefault(_reactDom);

var /*istanbul ignore next*/_lodash = require('lodash');

var /*istanbul ignore next*/_ether = require('./../../ether');

/*istanbul ignore next*/
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
var TooltipDecorator = function TooltipDecorator(ComposedComponent) /*istanbul ignore next*/{
  return function (_ComposedComponent) {
    _inherits(Component, _ComposedComponent);

    function /*istanbul ignore next*/Component() {
      /*istanbul ignore next*/
      var _Object$getPrototypeO;

      _classCallCheck(this, Component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      /*istanbul ignore next*/
      var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Component)).call.apply(_Object$getPrototypeO, [this].concat(args)));

      /*istanbul ignore next*/_this._tooltipTimeout = null;
      /*istanbul ignore next*/_this._memoizedShifts = null;
      /*istanbul ignore next*/_this.state = {
        /**
         * Whether tooltip currently showing
         *
         * @property isVisible
         * @type {Boolean}
         * @default false
         */
        isVisible: false
      };
      /*istanbul ignore next*/
      _this.onShow = function () {
        /*istanbul ignore next*/_this._tooltipTimeout = setTimeout(function () {
          /*istanbul ignore next*/_this.setState({ isVisible: true });
          /*istanbul ignore next*/_this.positionTooltip();
        }, 100);
      };

      /*istanbul ignore next*/
      _this.onHide = function () {
        clearTimeout( /*istanbul ignore next*/_this._tooltipTimeout);
        /*istanbul ignore next*/_this.setState({ isVisible: false });
      };

      /*istanbul ignore next*/
      _this.getTarget = function () {
        return (/*istanbul ignore next*/_reactDom2.default.findDOMNode( /*istanbul ignore next*/_this._target)
        );
      };

      /*istanbul ignore next*/
      _this.getTooltip = function () {
        return (/*istanbul ignore next*/_reactDom2.default.findDOMNode( /*istanbul ignore next*/_this._tooltip)
        );
      };

      /*istanbul ignore next*/
      _this.calculatePosition = function (tooltip, target) {
        if ( /*istanbul ignore next*/_this._memoizedShifts) {
          return (/*istanbul ignore next*/_this._memoizedShifts
          );
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

      /*istanbul ignore next*/
      _this.positionTooltip = function () {
        if ( /*istanbul ignore next*/_this.state.isVisible) {
          var tooltip = /*istanbul ignore next*/_this.getTooltip(),
              alignment = /*istanbul ignore next*/_this.props.tooltipAlign || 'center',
              position = /*istanbul ignore next*/_this.props.tooltipPosition || 'top',
              shifts = /*istanbul ignore next*/_this.calculatePosition(tooltip, /*istanbul ignore next*/_this.getTarget());

          switch (position) {
            case "top":
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'top', /*istanbul ignore next*/(0, _ether.append)(shifts.verticalY, 'px'));
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'right', 'auto');
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'bottom', 'auto');
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'left', /*istanbul ignore next*/(0, _ether.append)(shifts[/*istanbul ignore next*/'vertical' + /*istanbul ignore next*/(0, _lodash.startCase)(alignment)], 'px'));
              break;

            case "bottom":
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'top', 'auto');
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'bottom', /*istanbul ignore next*/(0, _ether.append)(shifts.verticalY, 'px'));
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'left', /*istanbul ignore next*/(0, _ether.append)(shifts[/*istanbul ignore next*/'vertical' + /*istanbul ignore next*/(0, _lodash.startCase)(alignment)], 'px'));
              break;

            case "left":
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'top', /*istanbul ignore next*/(0, _ether.append)(shifts[/*istanbul ignore next*/'side' + /*istanbul ignore next*/(0, _lodash.startCase)(alignment)], 'px'));
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'bottom', 'auto');
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'left', /*istanbul ignore next*/(0, _ether.append)(shifts[/*istanbul ignore next*/position + 'Horizontal'], 'px'));
              break;

            case "right":
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'top', /*istanbul ignore next*/(0, _ether.append)(shifts[/*istanbul ignore next*/'side' + /*istanbul ignore next*/(0, _lodash.startCase)(alignment)], 'px'));
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'bottom', 'auto');
              /*istanbul ignore next*/(0, _ether.styleElement)(tooltip, 'left', /*istanbul ignore next*/(0, _ether.append)(shifts[/*istanbul ignore next*/position + 'Horizontal'], 'px'));
          }
        }
      };

      /*istanbul ignore next*/return _this;
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
        if ( /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'componentWillUpdate', this)) {
          /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'componentWillUpdate', this).call(this, nextProps, nextState);
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
        if ( /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'componentDidUpdate', this)) {
          /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'componentDidUpdate', this).call(this, prevProps);
        }

        if (this.props.tooltipMessage && !this._memoizedShifts && this.state.isVisible) {
          this.positionTooltip();
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
        var props = /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'componentProps', this) || {};

        if (this.props.tooltipMessage) {
          props.onMouseEnter = /*istanbul ignore next*/(0, _chainFunctions2.default)(this.onShow, props.onMouseEnter);
          props.onMouseLeave = /*istanbul ignore next*/(0, _chainFunctions2.default)(this.onHide, props.onMouseLeave);
          props.onFocus = /*istanbul ignore next*/(0, _chainFunctions2.default)(this.onShow, props.onFocus);
          props.onBlur = /*istanbul ignore next*/(0, _chainFunctions2.default)(this.onHide, props.onBlur);
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
        /*istanbul ignore next*/
        var _this2 = this;

        if (this.props.tooltipMessage) {
          return (/*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/_tooltip2.default,
              /*istanbul ignore next*/{
                ref: function /*istanbul ignore next*/ref(comp) /*istanbul ignore next*/{
                  return (/*istanbul ignore next*/_this2._tooltip = comp
                  );
                },
                isVisible: this.state.isVisible,
                position: this.props.tooltipPosition,
                align: this.props.tooltipAlign
              },
              this.props.tooltipMessage
            )
          );
        }
      }
    }]);

    return Component;
  }(ComposedComponent);
};

/*istanbul ignore next*/exports.default = TooltipDecorator;