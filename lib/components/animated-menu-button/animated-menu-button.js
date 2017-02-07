'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _devices = require('./../../utils/helpers/devices');

var _devices2 = _interopRequireDefault(_devices);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  AnimatedMenuButton: {
    displayName: 'AnimatedMenuButton'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/animated-menu-button/animated-menu-button.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

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
var AnimatedMenuButton = _wrapComponent('AnimatedMenuButton')((_temp2 = _class = function (_React$Component) {
  _inherits(AnimatedMenuButton, _React$Component);

  function AnimatedMenuButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AnimatedMenuButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AnimatedMenuButton.__proto__ || Object.getPrototypeOf(AnimatedMenuButton)).call.apply(_ref, [this].concat(args))), _this), _this.blockBlur = false, _this.state = {
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
      touch: _devices2.default.isTouchDevice()
    }, _this.openHandler = function () {
      _this.setState({ open: true });
      _this.blockBlur = true;
    }, _this.closeHandler = function () {
      _this.setState({ open: false });
      _this.blockBlur = false;
    }, _this.handleBlur = function () {
      if (!_this.blockBlur) {
        _this.setState({ open: false });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

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


  _createClass(AnimatedMenuButton, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      var content = void 0;

      // If menu closed, don't render contents
      if (this.state.open === true) {
        content = this.innerHTML;
      }

      return _react3.default.createElement(
        'div',
        this.componentProps,
        _react3.default.createElement(_icon2.default, { type: 'add' }),
        _react3.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          {
            transitionName: 'carbon-animated-menu-button',
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
      return this.props.label ? _react3.default.createElement(
        'span',
        { key: 'label', className: 'carbon-animated-menu-button__label' },
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

      return _react3.default.createElement(
        'div',
        { className: 'carbon-animated-menu-button__content' },
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
      return (0, _classnames2.default)(this.props.className, 'carbon-animated-menu-button', 'carbon-animated-menu-button--' + this.props.size, 'carbon-animated-menu-button--' + this.props.direction);
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
      return _react3.default.createElement(
        'div',
        { onClick: this.closeHandler, ref: 'close', key: 'close' },
        _react3.default.createElement(_icon2.default, { type: 'close' })
      );
    }
  }]);

  return AnimatedMenuButton;
}(_react3.default.Component), _class.propTypes = {

  /**
   * The size of the menu.
   *
   * Options: small, smed, medium, mlarge, large
   *
   * @property size
   * @type {String}
   * @default medium
   */
  size: _react3.default.PropTypes.string,

  /**
   * The direction in which the menu expands.
   *
   * Options: right, left
   *
   * @property direction
   * @type {String}
   * @default left
   */
  direction: _react3.default.PropTypes.string,

  /**
   * A label to display at the top of the expanded menu.
   *
   * @property label
   * @type {String}e
   */
  label: _react3.default.PropTypes.string
}, _class.defaultProps = {
  size: 'medium',
  direction: 'left'
}, _temp2));

exports.default = AnimatedMenuButton;