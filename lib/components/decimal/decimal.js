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

var _i18n = require('./../../utils/helpers/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _input = require('./../../utils/decorators/input');

var _input2 = _interopRequireDefault(_input);

var _inputLabel = require('./../../utils/decorators/input-label');

var _inputLabel2 = _interopRequireDefault(_inputLabel);

var _inputValidation = require('./../../utils/decorators/input-validation');

var _inputValidation2 = _interopRequireDefault(_inputValidation);

var _ether = require('../../utils/ether');

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

var _logger = require('./../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A decimal widget.
 *
 * == How to use a Decimal in a component:
 *
 * In your file
 *
 *   import Decimal from 'carbon/lib/components/decimal';
 *
 * To render the Decimal:
 *
 *   <Decimal name='myDecimal' />
 *
 * @class Decimal
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
var Decimal = (0, _input2.default)((0, _inputLabel2.default)((0, _inputValidation2.default)((_temp2 = _class = function (_React$Component) {
  _inherits(Decimal, _React$Component);

  function Decimal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Decimal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Decimal.__proto__ || Object.getPrototypeOf(Decimal)).call.apply(_ref, [this].concat(args))), _this), _this._document = document, _this.highlighted = false, _this.verifiedPrecision = function (precision) {
      if (precision > 20) {
        _logger2.default.warn('Decimal precision must not be greater than 20.');
        return 20;
      }
      return precision;
    }, _this.state = {
      /**
       * The formatted value for display
       *
       * @property visibleValue
       * @type {String}
       */
      visibleValue: _i18n2.default.formatDecimal(_this.value, _this.verifiedPrecision(_this.props.precision))
    }, _this.emitOnChangeCallback = function (val) {
      var hiddenField = _this._hiddenInput;
      hiddenField.value = val;

      _this._handleOnChange({ target: hiddenField });
    }, _this.isValidDecimal = function (value, precision) {
      var format = _i18n2.default.format();
      var del = '\\' + format.delimiter;
      var sep = '\\' + format.separator;
      var regex = void 0;
      if (precision > 0) {
        regex = new RegExp('^[-]?\\d*(?:' + del + '?\\d?)*' + sep + '?\\d{0,' + precision + '}$');
      } else {
        regex = new RegExp('^[-]?\\d*(?:' + del + '?\\d?)*$');
      }
      return regex.test(value);
    }, _this.handleVisibleInputChange = function (ev) {
      if (_this.isValidDecimal(ev.target.value, _this.verifiedPrecision(_this.props.precision))) {
        _this.setState({ visibleValue: ev.target.value });
        _this.emitOnChangeCallback(_i18n2.default.unformatDecimal(ev.target.value));
      } else {
        // reset the value
        ev.target.value = _this.state.visibleValue;
        // reset the selection range
        ev.target.setSelectionRange(_this.selectionStart, _this.selectionEnd);
      }
    }, _this.handleBlur = function () {
      var currentValue = void 0;

      if (canConvertToBigNumber(_this.value)) {
        currentValue = _i18n2.default.formatDecimal(_this.value, _this.verifiedPrecision(_this.props.precision));
      } else {
        currentValue = _this.value;
      }

      _this.setState({ visibleValue: currentValue });
      _this.highlighted = false;

      if (_this.value === '') {
        _this.emitOnChangeCallback('0');
      }

      if (_this.props.onBlur) {
        _this.props.onBlur();
      }
    }, _this.handleOnClick = function () {
      // if value is already highlighted then don't re-highlight it
      if (_this.highlighted) {
        _this.highlighted = false;
        return;
      }

      var input = _this._input;
      // only do it if the selection is not within the value
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        input.setSelectionRange(0, input.value.length);
        _this.highlighted = true;
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

  /**
   * Stores the document - allows us to override it different contexts, such as
   * when running tests.
   *
   * @property _document
   * @type {document}
   */


  /**
   * Used within the onClick and onBlur method to
   * check if the current visible input value is
   * highlighted
   *
   * @property highlighted
   * @type {Boolean}
   */


  // Caps precision at 20 to prevent browser issues


  _createClass(Decimal, [{
    key: 'componentWillReceiveProps',


    /**
     * A lifecycle method to update the visible value with a formatted version,
     * only when the field is not the active element.
     *
     * @method componentWillReceiveProps
     * @param {Object} newProps The new props passed down to the component
     * @return {void}
     */
    value: function componentWillReceiveProps(newProps) {
      if (this._document.activeElement !== this._input) {
        var value = newProps.value || 0.00;
        if (canConvertToBigNumber(value)) {
          value = _i18n2.default.formatDecimal(value, this.verifiedPrecision(newProps.precision));
        }
        this.setState({ visibleValue: value });
      }
    }

    /**
     * Callback to update the hidden field on change.
     *
     * @method emitOnChangeCallback
     * @param {String} val The unformatted decimal value
     * @return {void}
     */


    /**
     * Checks that visibleValue is valid decimal.
     * This is a post-processor applied after the value has been updated.
     *
     * @method isValidDecimal
     * @param {String} value new prop value
     * @param {Integer} precision decimal precision
     * @return {Boolean} true if a valid decimal
     */


    /**
     * Handles Change to visible field
     *
     * @method handleVisibleInputChange
     * @param {Object} ev event
     * @return {void}
     */


    /**
     * Updates visible value on blur
     *
     * @method handleBlur
     * @return {void}
     */


    /*
     * Selects visible input text depending on where the user clicks
     *
     * @method handleOnClick
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
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        _extends({ className: this.mainClasses }, (0, _tags2.default)('decimal', this.props)),
        this.labelHTML,
        this.inputHTML,
        _react2.default.createElement('input', _extends({
          ref: function ref(h) {
            _this2._hiddenInput = h;
          }
        }, this.hiddenInputProps)),
        this.validationHTML,
        this.fieldHelpHTML
      );
    }
  }, {
    key: 'value',


    /**
     * Returns the current value or default value.
     *
     * @method value
     * @return {String}
     */
    get: function get() {
      return this.props.value || getDefaultValue(this);
    }

    /**
     * A getter that combines props passed down from the input decorator with
     * textbox specific props.
     *
     * @method inputProps
     * @return {Object} props to apply to input field
     */

  }, {
    key: 'inputProps',
    get: function get() {
      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);

      props.className = this.inputClasses;
      props.name = null;
      props.onBlur = this.handleBlur;
      props.onChange = this.handleVisibleInputChange;
      props.onClick = this.handleOnClick;
      props.onKeyDown = this.handleKeyDown;
      props.value = this.state.visibleValue;
      return props;
    }

    /**
     * A getter for hidden input props.
     *
     * @method hiddenInputProps
     * @return {Object} props to apply to hidden field
     */

  }, {
    key: 'hiddenInputProps',
    get: function get() {
      return {
        name: this.props.name,
        readOnly: true,
        type: 'hidden',
        value: this.props.value,
        'data-element': 'hidden-input'
      };
    }

    /**
     * Uses the mainClasses method provided by the decorator to add additional classes.
     *
     * @method mainClasses
     * @return {String} Main className
     */

  }, {
    key: 'mainClasses',
    get: function get() {
      return 'carbon-decimal';
    }

    /**
     * Uses the inputClasses method provided by the decorator to add additional classes.
     *
     * @method inputClasses
     * @return {String} Input className
     */

  }, {
    key: 'inputClasses',
    get: function get() {
      return 'carbon-decimal__input';
    }
  }]);

  return Decimal;
}(_react2.default.Component), _class.propTypes = {

  // NB align is used in the Input decorator. Removing the prop from here
  // causes an 'uknown prop align on input tag' error, so the
  // react/no-unused-prop-types has been disabled for this prop
  /**
   * Sets the default value alignment
   *
   * @property align
   * @type {String}
   * @default 'right'
   */
  align: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types

  /**
   * Callback function for when the decimal input
   * field blur event fires.
   *
   * @property onBlur
   * @type {Void}
   */
  onBlur: _propTypes2.default.func,

  /**
   * Callback to handle keyDown events.
   *
   * @property onKeyDown
   * @type {Void}
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * Sets the precision of the field
   *
   * @property precision
   * @type {Integer}
   * @default 2
   */
  precision: _propTypes2.default.number,
  /**
   * The value of the Number input element
   *
   * @property value
   * @type {String}
   */
  value: _propTypes2.default.string,

  /**
   * The name of the hidden input element
   *
   * @property name
   * @type {String}
   */
  name: _propTypes2.default.string
}, _class.defaultProps = {
  align: 'right',
  precision: 2
}, _temp2))));

// Private Methods

/**
 * Returns defaultValue for specified scope,
 *
 * @method getDefaultValue
 * @private
 * @param {Object} scope used to get default value of current scope
 * @return {String} default Value
 */
function getDefaultValue(scope) {
  if (typeof scope._hiddenInput !== 'undefined') {
    return scope._hiddenInput.value;
  }
  return scope.props.defaultValue;
}

/**
 * Returns defaultValue for specified scope,
 *
 * @method canConvertToBigNumber
 * @private
 * @param {string} string need to be coverted to BigNumber
 * @return {Boolean}
 */
function canConvertToBigNumber(value) {
  // single `-` sign will raise an exception during formatDecimal()
  // as it cannot be convert to BigNumber()
  return (/^-?(\d+(\.\d+)?|\.\d+|\d+\.)$/.test(value)
  );
}

exports.default = Decimal;