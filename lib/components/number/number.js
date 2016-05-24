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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsDecoratorsInput = require('./../../utils/decorators/input');

var _utilsDecoratorsInput2 = _interopRequireDefault(_utilsDecoratorsInput);

var _utilsDecoratorsInputLabel = require('./../../utils/decorators/input-label');

var _utilsDecoratorsInputLabel2 = _interopRequireDefault(_utilsDecoratorsInputLabel);

var _utilsDecoratorsInputValidation = require('./../../utils/decorators/input-validation');

var _utilsDecoratorsInputValidation2 = _interopRequireDefault(_utilsDecoratorsInputValidation);

/**
 * A number widget. It only allows entering of a whole number with an
 * optional minus sign.
 *
 * == How to use a Number in a component:
 *
 * In your file
 *
 *   import Number from 'carbon/lib/components/number';
 *
 * To render a Number:
 *
 *   <Number name="myNumber" />
 *
 * @class Number
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
var Number = (0, _utilsDecoratorsInput2['default'])((0, _utilsDecoratorsInputLabel2['default'])((0, _utilsDecoratorsInputValidation2['default'])((function (_React$Component) {
  _inherits(Number, _React$Component);

  function Number() {
    var _this = this;

    _classCallCheck(this, Number);

    _get(Object.getPrototypeOf(Number.prototype), 'constructor', this).apply(this, arguments);

    this.handleOnChange = function (ev) {
      if (isValidNumber(ev.target.value)) {
        _this._handleOnChange(ev);
      } else {
        // reset the value
        ev.target.value = _this.props.value || null;
        // reset the selection range
        ev.target.setSelectionRange(_this.selectionStart, _this.selectionEnd);
      }
    };

    this.handleKeyDown = function (ev) {
      // track the selection start and end
      _this.selectionStart = ev.target.selectionStart;
      _this.selectionEnd = ev.target.selectionEnd;

      if (_this.props.onKeyDown) {
        // we also send the props so more information can be extracted by the action
        _this.props.onKeyDown(ev, _this.props);
      }
    };
  }

  _createClass(Number, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        this.labelHTML,
        this.inputHTML,
        this.validationHTML,
        this.fieldHelpHTML
      );
    }
  }, {
    key: 'mainClasses',

    /**
     * Main Class getter
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (0, _classnames2['default'])('ui-number', this.props.className);
    }

    /**
     * Input class getter
     *
     * @method inputClasses
     * @return {String} Input className
     */
  }, {
    key: 'inputClasses',
    get: function get() {
      return 'ui-number__input';
    }

    /**
     * Handles Change to input field
     *
     * @method handleOnChange
     * @param {Object} ev event
     * @return {void}
     */
  }, {
    key: 'inputProps',

    /**
     * A getter that combines props passed down from the input decorator with
     * number specific props.
     *
     * @method inputProps
     * @return {Object} props for the input
     */
    get: function get() {
      var props = _objectWithoutProperties(this.props, []);

      props.className = this.inputClasses;
      props.onChange = this.handleOnChange;
      props.onKeyDown = this.handleKeyDown;
      return props;
    }
  }]);

  return Number;
})(_react2['default'].Component))));

/**
 * Checks that the given value is valid number.
 *
 * @method isValidNumber
 * @private
 * @param {String} value number to check validity
 * @return {Boolean} true if value is valid number
 */
function isValidNumber(value) {
  var regex = undefined,
      result = undefined;
  regex = new RegExp('^[-]?[0-9]*$');
  result = regex.test(value);

  return result;
}

exports['default'] = Number;
module.exports = exports['default'];

/*
 * Triggers on key down of the input
 *
 * @method handleKeyDown
 * @param {Object} ev event
 * @return {void}
 */