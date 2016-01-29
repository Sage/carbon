'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _utilsHelpersDevices = require('./../../utils/helpers/devices');

var _utilsHelpersDevices2 = _interopRequireDefault(_utilsHelpersDevices);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

/**
 * An AnimatedMenuButton widget.
 *
 * == How to use an AnimatedMenuButton in a component:
 *
 * In your file
 *
 *   import AnimatedMenuButton from 'carbon/lib/components/animated-menu-button';
 *
 * To render a AnimatedMenuButton, pass children to be rendered in the expanded menu:
 *
 *  <AnimatedMenuButton>
 *    <Row>
 *      <div>
 *        <h2 className="title">Foo</h2>
 *          <p><Link href='#'>Bar</Link></p>
 *       </div>
 *     </Row>
 *  </AnimatedMenuButton>
 *
 * @class AnimatedMenuButton
 * @constructor
 */

var AnimatedMenuButton = (function (_React$Component) {
  _inherits(AnimatedMenuButton, _React$Component);

  function AnimatedMenuButton() {
    var _this = this;

    _classCallCheck(this, AnimatedMenuButton);

    _get(Object.getPrototypeOf(AnimatedMenuButton.prototype), 'constructor', this).apply(this, arguments);

    this.blockBlur = false;
    this.state = {
      /**
       * Menu open or closed.
       *
       * @property open
       * @type {Boolean}
       */
      open: false,

      /**
       * Indicates if user currently on touch device
       *
       * @property touch
       * @type {Boolean}
       */
      touch: _utilsHelpersDevices2['default'].isTouchDevice()
    };

    this.openHandler = function () {
      _this.setState({ open: true });
      _this.blockBlur = true;
    };

    this.closeHandler = function () {
      _this.setState({ open: false });
      _this.blockBlur = false;
    };

    this.handleBlur = function () {
      if (!_this.blockBlur) {
        _this.setState({ open: false });
      }
    };
  }

  _createClass(AnimatedMenuButton, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      var content = undefined;

      // If menu closed, don't render contents
      if (this.state.open === true) {
        content = this.innerHTML;
      }

      return _react2['default'].createElement(
        'div',
        this.componentProps,
        _react2['default'].createElement(_icon2['default'], { type: 'add' }),
        _react2['default'].createElement(
          _reactAddonsCssTransitionGroup2['default'],
          {
            transitionName: 'ui-animated-menu-button',
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 500 },
          content
        )
      );
    }
  }, {
    key: 'labelHTML',

    /**
     * Getter for label HTML
     *
     * @method labelHTML
     * @return {HTML} HTML for label.
     */
    get: function get() {
      return this.props.label ? _react2['default'].createElement(
        'span',
        { key: this.props.label, className: 'ui-animated-menu-button__label' },
        this.props.label
      ) : '';
    }

    /**
     * Getter for inner HTML of menu
     *
     * @method innerHTML
     * @return {HTML} HTML for menu contents.
     */
  }, {
    key: 'innerHTML',
    get: function get() {
      var contents = [];

      // If device supports touch, add close icon.
      if (this.state.touch) {
        contents.push(this.closeIcon);
      }

      contents.push(this.labelHTML);
      contents.push(this.props.children);

      return _react2['default'].createElement(
        'div',
        { className: 'ui-animated-menu-button__content' },
        contents
      );
    }

    /**
     * Getter for widget's main classes.
     *
     * @method mainClasses
     * @return {String} Classnames
     */
  }, {
    key: 'mainClasses',
    get: function get() {
      var className = this.props.className ? ' ' + this.props.className : '';

      var classes = 'ui-animated-menu-button ui-animated-menu-button--' + this.props.size + ' ui-animated-menu-button--' + this.props.direction + className;

      return classes;
    }

    /**
     * A getter that returns any supplied custom props along with default props.
     *
     * @method componentProps
     * @return {Object} props including class names & event handlers.
     */
  }, {
    key: 'componentProps',
    get: function get() {
      var props = _objectWithoutProperties(this.props, []);

      props.className = this.mainClasses;
      props.onMouseEnter = this.openHandler;
      props.onMouseLeave = this.closeHandler;
      props.onFocus = this.openHandler;
      props.onBlur = this.handleBlur;
      props.onTouchEnd = this.state.touch ? this.openHandler : null;
      props.ref = 'button';

      return props;
    }

    /**
     * Returns a close icon with touch handler.
     *
     * @method closeIcon
     * @return {HTML} html for close icon
     */
  }, {
    key: 'closeIcon',
    get: function get() {
      return _react2['default'].createElement(
        'div',
        { onClick: this.closeHandler, ref: 'close' },
        _react2['default'].createElement(_icon2['default'], { type: 'close' })
      );
    }
  }], [{
    key: 'propTypes',
    value: {

      /**
       * The size of the menu.
       *
       * Options: small, smed, medium, mlarge, large
       *
       * @property size
       * @type {String}
       * @default medium
       */
      size: _react2['default'].PropTypes.string,

      /**
       * The direction in which the menu expands.
       *
       * Options: right, left
       *
       * @property direction
       * @type {String}
       * @default left
       */
      direction: _react2['default'].PropTypes.string,

      /**
       * A label to display at the top of the expanded menu.
       *
       * @property label
       * @type {String}e
       */
      label: _react2['default'].PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      size: 'medium',
      direction: 'left'
    },
    enumerable: true
  }]);

  return AnimatedMenuButton;
})(_react2['default'].Component);

exports['default'] = AnimatedMenuButton;
module.exports = exports['default'];

/**
 * Determines if the blur event should be prevented.
 *
 * @property blockBlur
 * @type {Boolean}
 * @default false
 */

/**
 * Opens handler on event.
 *
 * @method openHandler
 * @return {void}
 */

/**
  * Closes menu on event.
  *
  * @method closeHandler
  * @return {void}
  */

/**
 * Handles blur of expanded menu.
 *
 * @method handleBlur
 * @return {void}
 */