'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _input = require('./../../utils/decorators/input');

var _input2 = _interopRequireDefault(_input);

var _ether = require('./../../utils/ether');

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonToggle = (0, _input2.default)((_temp = _class = function (_React$Component) {
  _inherits(ButtonToggle, _React$Component);

  function ButtonToggle() {
    _classCallCheck(this, ButtonToggle);

    return _possibleConstructorReturn(this, (ButtonToggle.__proto__ || Object.getPrototypeOf(ButtonToggle)).apply(this, arguments));
  }

  _createClass(ButtonToggle, [{
    key: 'render',


    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2.default.createElement(
        'div',
        _extends({ className: this.mainClasses }, (0, _tags2.default)('button-toggle', this.props)),
        this.inputHTML
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Main Class getter
     *
     * @method mainClasses
     * @return {void}
     */
    get: function get() {
      return 'carbon-button-toggle';
    }

    /**
     * Uses the inputClasses method provided by the decorator to add additional classes.
     *
     * @method inputClasses
     * @return {String} input className
     */

  }, {
    key: 'inputClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-button-toggle__input');
    }

    /**
     * Returns the markup for the buttonIcon.
     *
     * @method buttonIcon
     * @return {Object} JSX
     */

  }, {
    key: 'buttonIcon',
    get: function get() {
      if (!this.props.buttonIcon) {
        return null;
      }

      var classes = (0, _classnames2.default)('carbon-button-toggle__button-icon', {
        'carbon-button-toggle__button-icon--large': this.props.buttonIconSize === 'large'
      });

      return _react2.default.createElement(
        'div',
        { className: classes, 'data-element': 'icon' },
        _react2.default.createElement(_icon2.default, { type: this.props.buttonIcon })
      );
    }

    /**
     * A getter that combines props passed down from the input decorator with
     * textbox specific props.
     *
     * @method inputProps
     * @return {Object} props for the input
     */

  }, {
    key: 'inputProps',
    get: function get() {
      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);

      delete props.children;
      props.className = 'carbon-button-toggle__input';
      props.type = 'radio';
      if (!props.id) {
        props.id = this._guid;
      }
      return props;
    }

    /**
     * Returns additional content to sit inline with the input.
     *
     * @method additionalInputContent
     * @return {Object} JSX
     */

  }, {
    key: 'additionalInputContent',
    get: function get() {
      var classes = (0, _classnames2.default)('carbon-button-toggle__label', {
        'carbon-button-toggle__label--disabled': this.props.disabled
      });

      return _react2.default.createElement(
        'label',
        { htmlFor: this.inputProps.id, className: classes, 'data-element': 'label' },
        this.buttonIcon,
        this.props.children
      );
    }
  }]);

  return ButtonToggle;
}(_react2.default.Component), _class.propTypes = {
  /**
   * Which buttonIcon the button should render.
   *
   * @property buttonIcon
   * @type {String}
   */
  buttonIcon: _propTypes2.default.string,

  /**
   * Sets the size of the buttonIcon (eg. large)
   *
   * @property buttonIconSize
   * @type {String}
   */
  buttonIconSize: _propTypes2.default.string,

  /**
   * Disable all user interaction.
   *
   * @property disabled
   * @type {boolean}
   */
  disabled: _propTypes2.default.bool,

  /**
   * A required prop. This is what the button will display.
   *
   * @property children
   * @type {Multiple}
   */
  children: _propTypes2.default.node.isRequired
}, _class.safeProps = ['name'], _temp));

exports.default = ButtonToggle;