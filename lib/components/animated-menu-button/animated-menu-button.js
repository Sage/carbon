/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_devices = require('./../../utils/helpers/devices');

/*istanbul ignore next*/
var _devices2 = _interopRequireDefault(_devices);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

/*istanbul ignore next*/
var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var AnimatedMenuButton = function (_React$Component) {
  _inherits(AnimatedMenuButton, _React$Component);

  function AnimatedMenuButton() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, AnimatedMenuButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AnimatedMenuButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.blockBlur = false, _this.state = {
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
      touch: /*istanbul ignore next*/_devices2.default.isTouchDevice()
    }, _this.openHandler = function () {
      /*istanbul ignore next*/_this.setState({ open: true });
      /*istanbul ignore next*/_this.blockBlur = true;
    }, _this.closeHandler = function () {
      /*istanbul ignore next*/_this.setState({ open: false });
      /*istanbul ignore next*/_this.blockBlur = false;
    }, _this.handleBlur = function () {
      if (! /*istanbul ignore next*/_this.blockBlur) {
        /*istanbul ignore next*/_this.setState({ open: false });
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
      var content = /*istanbul ignore next*/void 0;

      // If menu closed, don't render contents
      if (this.state.open === true) {
        content = this.innerHTML;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          this.componentProps,
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: 'add' }),
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_reactAddonsCssTransitionGroup2.default,
            /*istanbul ignore next*/{
              transitionName: 'ui-animated-menu-button',
              transitionEnterTimeout: 500,
              transitionLeaveTimeout: 500 },
            content
          )
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
      return this.props.label ? /*istanbul ignore next*/_react2.default.createElement(
        /*istanbul ignore next*/'span',
        /*istanbul ignore next*/{ key: 'label', className: 'ui-animated-menu-button__label' },
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

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'ui-animated-menu-button__content' },
          contents
        )
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
      return (/*istanbul ignore next*/(0, _classnames2.default)(this.props.className, 'ui-animated-menu-button', /*istanbul ignore next*/'ui-animated-menu-button--' + this.props.size, /*istanbul ignore next*/'ui-animated-menu-button--' + this.props.direction)
      );
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
      /*istanbul ignore next*/
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
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ onClick: this.closeHandler, ref: 'close', key: 'close' },
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: 'close' })
        )
      );
    }
  }]);

  return AnimatedMenuButton;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/AnimatedMenuButton.propTypes = {

  /**
   * The size of the menu.
   *
   * Options: small, smed, medium, mlarge, large
   *
   * @property size
   * @type {String}
   * @default medium
   */
  size: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * The direction in which the menu expands.
   *
   * Options: right, left
   *
   * @property direction
   * @type {String}
   * @default left
   */
  direction: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * A label to display at the top of the expanded menu.
   *
   * @property label
   * @type {String}e
   */
  label: /*istanbul ignore next*/_react2.default.PropTypes.string
};
/*istanbul ignore next*/AnimatedMenuButton.defaultProps = {
  size: 'medium',
  direction: 'left'
};
/*istanbul ignore next*/exports.default = AnimatedMenuButton;