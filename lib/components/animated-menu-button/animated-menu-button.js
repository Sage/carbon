'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _icon = require('components/icon');

var _icon2 = _interopRequireDefault(_icon);

var _tags = require('../../utils/helpers/tags');

var _devices = require('utils/helpers/devices');

var _devices2 = _interopRequireDefault(_devices);

var _ether = require('utils/ether');

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
var AnimatedMenuButton = _wrapComponent('AnimatedMenuButton')((_temp = _class = function (_React$Component) {
  _inherits(AnimatedMenuButton, _React$Component);

  function AnimatedMenuButton() {
    var _ref;

    _classCallCheck(this, AnimatedMenuButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /**
     * Determines if the blur event should be prevented.
     *
     * @property blockBlur
     * @type {Boolean}
     * @default false
     */
    var _this = _possibleConstructorReturn(this, (_ref = AnimatedMenuButton.__proto__ || Object.getPrototypeOf(AnimatedMenuButton)).call.apply(_ref, [this].concat(args)));

    _this.state = {
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
    };
    _this.blockBlur = false;

    _this.closeHandler = _this.closeHandler.bind(_this);
    _this.closeIcon = _this.closeIcon.bind(_this);
    _this.componentProps = _this.componentProps.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.innerHTML = _this.innerHTML.bind(_this);
    _this.labelHTML = _this.labelHTML.bind(_this);
    _this.mainClasses = _this.mainClasses.bind(_this);
    _this.openHandler = _this.openHandler.bind(_this);
    return _this;
  }

  _createClass(AnimatedMenuButton, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      var content = void 0;

      if (this.state.open) {
        content = this.innerHTML();
      }

      return _react3.default.createElement(
        'div',
        _extends({}, this.componentProps(), (0, _tags.tagComponent)('animated-menu-button', this.props)),
        _react3.default.createElement(_icon2.default, { type: 'add', 'data-element': 'open' }),
        _react3.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          {
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 500,
            transitionName: 'carbon-animated-menu-button'
          },
          content
        )
      );
    }

    /**
     * Getter for label HTML
     *
     * @method labelHTML
     * @return {HTML} HTML for label.
     */

  }, {
    key: 'labelHTML',
    value: function labelHTML() {
      if (this.props.label) {
        return _react3.default.createElement(
          'span',
          {
            className: 'carbon-animated-menu-button__label',
            'data-element': 'label',
            key: 'label'
          },
          this.props.label
        );
      }
      return '';
    }

    /**
     * Getter for inner HTML of menu
     *
     * @method innerHTML
     * @return {HTML} HTML for menu contents.
     */

  }, {
    key: 'innerHTML',
    value: function innerHTML() {
      var contents = [];

      // If device supports touch, add close icon.
      if (this.state.touch) {
        contents.push(this.closeIcon());
      }

      contents.push(this.labelHTML());
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
    value: function mainClasses() {
      return (0, _classnames2.default)(this.props.className, 'carbon-animated-menu-button', 'carbon-animated-menu-button--' + this.props.direction, 'carbon-animated-menu-button--' + this.props.size);
    }

    /**
     * A getter that returns any supplied custom props along with default props.
     *
     * @method componentProps
     * @return {Object} props including class names & event handlers.
     */

  }, {
    key: 'componentProps',
    value: function componentProps() {
      var _this2 = this;

      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);

      delete props['data-element'];
      delete props['data-role'];

      props.className = this.mainClasses();
      props.onBlur = this.handleBlur;
      props.onFocus = this.openHandler;
      props.onMouseEnter = this.openHandler;
      props.onMouseLeave = this.closeHandler;
      props.onTouchEnd = this.state.touch ? this.openHandler : null;
      props.ref = function (comp) {
        _this2._button = comp;
      };
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
    value: function closeIcon() {
      var _this3 = this;

      return _react3.default.createElement(
        'div',
        {
          'data-element': 'close',
          key: 'close',
          onClick: this.closeHandler,
          ref: function ref(comp) {
            _this3._closeIcon = comp;
          }
        },
        _react3.default.createElement(_icon2.default, { type: 'close' })
      );
    }

    /**
     * Opens handler on event.
     *
     * @method openHandler
     * @return {void}
     */

  }, {
    key: 'openHandler',
    value: function openHandler() {
      this.setState({ open: true });
      this.blockBlur = true;
    }

    /**
     * Closes menu on event.
     *
     * @method closeHandler
     * @return {void}
     */

  }, {
    key: 'closeHandler',
    value: function closeHandler() {
      this.setState({ open: false });
      this.blockBlur = false;
    }

    /**
     * Handles blur of expanded menu.
     *
     * @method handleBlur
     * @return {void}
     */

  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      if (!this.blockBlur) {
        this.setState({ open: false });
      }
    }
  }]);

  return AnimatedMenuButton;
}(_react3.default.Component), _class.propTypes = {

  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * The direction in which the menu expands.
   *
   * Options: right, left
   *
   * @property direction
   * @type {String}
   * @default left
   */
  direction: _propTypes2.default.string,

  /**
   * A label to display at the top of the expanded menu.
   *
   * @property label
   * @type {String}e
   */
  label: _propTypes2.default.string,

  /**
   * The size of the menu.
   *
   * Options: small, smed, medium, mlarge, large
   *
   * @property size
   * @type {String}
   * @default medium
   */
  size: _propTypes2.default.string
}, _class.defaultProps = {
  direction: 'left',
  size: 'medium'
}, _temp));

exports.default = AnimatedMenuButton;