'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _i18n = require('./../../utils/helpers/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _input = require('./../../utils/decorators/input');

var _input2 = _interopRequireDefault(_input);

var _inputLabel = require('./../../utils/decorators/input-label');

var _inputLabel2 = _interopRequireDefault(_inputLabel);

var _inputValidation = require('./../../utils/decorators/input-validation');

var _inputValidation2 = _interopRequireDefault(_inputValidation);

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
 *   <Decimal name="myDecimal" />
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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Decimal.__proto__ || Object.getPrototypeOf(Decimal)).call.apply(_ref, [this].concat(args))), _this), _this._document = document, _this.highlighted = false, _this.state = {
      /**
       * The formatted value for display
       *
       * @property visibleValue
       * @type {String}
       */
      visibleValue: _i18n2.default.formatDecimal(_this.value, _this.props.precision)
    }, _this.emitOnChangeCallback = function (val) {
      var hiddenField = _this.refs.hidden;
      hiddenField.value = val;

      _this._handleOnChange({ target: hiddenField });
    }, _this.isValidDecimal = function (value, precision) {
      var del = void 0,
          regex = void 0,
          sep = void 0,
          format = _i18n2.default.format();
      del = '\\' + format.delimiter;
      sep = '\\' + format.separator;
      regex = precision > 0 ? new RegExp('^[-]?\\d*(?:' + del + '?\\d?)*' + sep + '?\\d{0,' + precision + '}$') : new RegExp('^[-]?\\d*(?:' + del + '?\\d?)*$');
      return regex.test(value);
    }, _this.handleVisibleInputChange = function (ev) {
      if (_this.isValidDecimal(ev.target.value, _this.props.precision)) {
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
        currentValue = _i18n2.default.formatDecimal(_this.value, _this.props.precision);
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
      if (this._document.activeElement != this._input) {
        var value = newProps.value || newProps.defaultValue;
        if (canConvertToBigNumber(value)) {
          value = _i18n2.default.formatDecimal(value, newProps.precision);
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
      return _react2.default.createElement(
        'div',
        { className: this.mainClasses },
        this.labelHTML,
        this.inputHTML,
        _react2.default.createElement('input', this.hiddenInputProps),
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
      var props = _objectWithoutProperties(this.props, []);

      props.className = this.inputClasses;
      props.onChange = this.handleVisibleInputChange;
      props.onClick = this.handleOnClick;
      props.name = null;
      props.onBlur = this.handleBlur;
      props.value = this.state.visibleValue;
      props.onKeyDown = this.handleKeyDown;
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
      var props = {
        ref: "hidden",
        type: "hidden",
        readOnly: true,
        name: this.props.name
      };

      if (typeof this.props.value !== 'undefined') {
        props.value = this.props.value;
      } else {
        props.defaultValue = this.props.defaultValue;
      }

      return props;
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
  /**
   * Sets the default value of the decimal field
   *
   * @property defaultValue
   * @type {String}
   * @default '0.00'
   */
  defaultValue: _react2.default.PropTypes.string,

  /**
   * Sets the default value alignment
   *
   * @property align
   * @type {String}
   * @default 'right'
   */
  align: _react2.default.PropTypes.string,

  /**
   * Sets the pricision of the field
   *
   * @property precision
   * @type {Integer}
   * @default 2
   */
  precision: _react2.default.PropTypes.number
}, _class.defaultProps = {
  defaultValue: '0.00',
  align: "right",
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
  if (typeof scope.refs.hidden !== 'undefined') {
    return scope.refs.hidden.value;
  } else {
    return scope.props.defaultValue;
  }
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
  return (/^-?\d+(\.\d+)?$/.test(value)
  );
}

exports.default = Decimal;