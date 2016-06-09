'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _utilsCss = require('./../../utils/css');

var _utilsCss2 = _interopRequireDefault(_utilsCss);

var _utilsDecoratorsInput = require('./../../utils/decorators/input');

var _utilsDecoratorsInput2 = _interopRequireDefault(_utilsDecoratorsInput);

var _utilsDecoratorsInputLabel = require('./../../utils/decorators/input-label');

var _utilsDecoratorsInputLabel2 = _interopRequireDefault(_utilsDecoratorsInputLabel);

var ButtonToggle = (0, _utilsDecoratorsInput2['default'])((0, _utilsDecoratorsInputLabel2['default'])((function (_React$Component) {
  _inherits(ButtonToggle, _React$Component);

  function ButtonToggle() {
    _classCallCheck(this, ButtonToggle);

    _get(Object.getPrototypeOf(ButtonToggle.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ButtonToggle, [{
    key: 'render',

    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
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
      return 'ui-button-toggle';
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
      return (0, _classnames2['default'])('ui-button-toggle__input', _utilsCss2['default'].hidden);
    }

    /**
     * Returns the markup for the icon.
     *
     * @method icon
     * @return {Object} JSX
     */
  }, {
    key: 'icon',
    get: function get() {
      if (!this.props.icon) {
        return null;
      }

      var classes = (0, _classnames2['default'])("ui-button-toggle__icon", _defineProperty({}, "ui-button-toggle__icon--large", this.props.iconSize === "large"));

      return _react2['default'].createElement(
        'div',
        { className: classes },
        _react2['default'].createElement(_icon2['default'], { type: this.props.icon })
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
      var _props = this.props;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['children']);

      props.className = this.inputClasses;
      props.type = "radio";
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
      var classes = (0, _classnames2['default'])("ui-button-toggle__label", _defineProperty({}, "ui-button-toggle__label--disabled", this.props.disabled));

      return _react2['default'].createElement(
        'label',
        { htmlFor: this.inputProps.id, className: classes },
        this.icon,
        this.props.children
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Which icon the button should render.
       *
       * @property icon
       * @type {String}
       */
      icon: _react2['default'].PropTypes.string,

      /**
       * Sets the size of the icon (eg. large)
       *
       * @property iconSize
       * @type {String}
       */
      iconSize: _react2['default'].PropTypes.string
    },
    enumerable: true
  }]);

  return ButtonToggle;
})(_react2['default'].Component)));

exports['default'] = ButtonToggle;
module.exports = exports['default'];