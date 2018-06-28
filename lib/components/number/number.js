'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _input = require('./../../utils/decorators/input');

var _input2 = _interopRequireDefault(_input);

var _inputLabel = require('./../../utils/decorators/input-label');

var _inputLabel2 = _interopRequireDefault(_inputLabel);

var _inputValidation = require('./../../utils/decorators/input-validation');

var _inputValidation2 = _interopRequireDefault(_inputValidation);

var _ether = require('../../utils/ether');

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var Number = (0, _input2.default)((0, _inputLabel2.default)((0, _inputValidation2.default)((_temp2 = _class = function (_React$Component) {
  _inherits(Number, _React$Component);

  function Number() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Number);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Number.__proto__ || Object.getPrototypeOf(Number)).call.apply(_ref, [this].concat(args))), _this), _this.handleOnChange = function (ev) {
      if (isValidNumber(ev.target.value)) {
        _this._handleOnChange(ev);
      } else {
        // reset the value
        ev.target.value = _this.props.value || null;
        // reset the selection range
        ev.target.setSelectionRange(_this.selectionStart, _this.selectionEnd);
      }
    }, _this.handleKeyDown = function (ev) {
      // track the selection start and end
      _this.selectionStart = ev.target.selectionStart;
      _this.selectionEnd = ev.target.selectionEnd;

      if (_this.props.onKeyDown) {
        // we also send the props so more information can be extracted by the action
        _this.props.onKeyDown(ev, _this.props);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
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
      return _react2.default.createElement(
        'div',
        _extends({ className: this.mainClasses }, (0, _tags2.default)('number', this.props)),
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
      return (0, _classnames2.default)('carbon-number', this.props.className);
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
      return 'carbon-number__input';
    }

    /**
     * Handles Change to input field
     *
     * @method handleOnChange
     * @param {Object} ev event
     * @return {void}
     */


    /*
     * Triggers on key down of the input
     *
     * @method handleKeyDown
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
      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);

      props.className = this.inputClasses;
      props.onChange = this.handleOnChange;
      props.onKeyDown = this.handleKeyDown;
      return props;
    }
  }]);

  return Number;
}(_react2.default.Component), _class.propTypes = {
  /**
   * A custom class name for the component.
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * The value of the Number input element
   *
   * @property value
   * @type {String}
   */
  value: _propTypes2.default.string,

  /**
   * Event handler for the keyDown event
   *
   * @property onKeyDown
   * @type {Function}
   */
  onKeyDown: _propTypes2.default.func }, _temp2))));

/**
 * Checks that the given value is valid number.
 *
 * @method isValidNumber
 * @private
 * @param {String} value number to check validity
 * @return {Boolean} true if value is valid number
 */
function isValidNumber(value) {
  var regex = new RegExp('^[-]?[0-9]*$');
  var result = regex.test(value);

  return result;
}

exports.default = Number;