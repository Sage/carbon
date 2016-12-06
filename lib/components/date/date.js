'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;
// https://github.com/zippyui/react-date-picker


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('./../../utils/decorators/input');

var _input2 = _interopRequireDefault(_input);

var _inputLabel = require('./../../utils/decorators/input-label');

var _inputLabel2 = _interopRequireDefault(_inputLabel);

var _inputValidation = require('./../../utils/decorators/input-validation');

var _inputValidation2 = _interopRequireDefault(_inputValidation);

var _inputIcon = require('./../../utils/decorators/input-icon');

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _reactDatePicker = require('react-date-picker');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _events = require('./../../utils/helpers/events');

var _events2 = _interopRequireDefault(_events);

var _chainFunctions = require('./../../utils/helpers/chain-functions');

var _chainFunctions2 = _interopRequireDefault(_chainFunctions);

var _ether = require('../../utils/ether');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Date widget.
 *
 * == How to use a Date in a component:
 *
 * In your file
 *
 *   import Date from 'carbon/lib/components/Date';
 *
 * To render the Date:
 *
 *   <Date name="myDate" />
 *
 * @class Date
 * @constructor
 * @decorators {Input,InputIcon,InputLabel,InputValidation}
 */
var Date = (0, _input2.default)((0, _inputIcon2.default)((0, _inputLabel2.default)((0, _inputValidation2.default)((_temp2 = _class = function (_React$Component) {
  _inherits(Date, _React$Component);

  function Date() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Date);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Date.__proto__ || Object.getPrototypeOf(Date)).call.apply(_ref, [this].concat(args))), _this), _this._document = document, _this.state = {
      /**
       * Sets open state of the datepicker
       *
       * @property open
       * @type {Boolean}
       * @default false
       */
      open: false,

      /**
       * Keeps track of hidden value
       *
       * @property viewDate
       * @type {String}
       * @default null
       */
      viewDate: null,

      /**
       * Sets the default value of the decimal field
       *
       * @property visibleValue
       * @type {String}
       * @default defaultValue
       */
      visibleValue: formatVisibleValue(_this.props.value, _this)
    }, _this.datePickerValueChanged = function (prevProps) {
      return _this.blockBlur && _this.props.value && prevProps.value !== _this.props.value;
    }, _this.emitOnChangeCallback = function (val) {
      var hiddenField = _this.refs.hidden;
      hiddenField.value = val;

      _this._handleOnChange({ target: hiddenField });
    }, _this.openDatePicker = function () {
      _this._document.addEventListener("click", _this.closeDatePicker);
      var value = _this.props.value || getDefaultValue(_this);
      _this.setState({
        open: true,
        viewDate: value
      });
    }, _this.closeDatePicker = function () {
      _this._document.removeEventListener("click", _this.closeDatePicker);
      _this.setState({
        open: false
      });
    }, _this.updateVisibleValue = function () {
      var date = formatVisibleValue(_this.props.value, _this);
      _this.setState({
        visibleValue: date
      });
    }, _this.handleVisibleInputChange = function (ev) {
      var input = _this._sanitizeDateInput(ev.target.value),
          formats = [visibleFormat()].concat(validFormats()),
          validDate = (0, _moment2.default)(input, formats, _i18nJs2.default.locale, true).isValid(),
          newState = { visibleValue: ev.target.value };

      // Updates the hidden value after first formatting to default hidden format
      if (validDate) {
        var hiddenValue = formatValue(input, formats, hiddenFormat());
        newState.viewDate = hiddenValue;
        _this.emitOnChangeCallback(hiddenValue);
      }
      _this.setState(newState);
    }, _this.handleWidgetClick = function (ev) {
      ev.nativeEvent.stopImmediatePropagation();
    }, _this.handleDateSelect = function (val) {
      _this.blockBlur = true;
      _this.closeDatePicker();
      _this.emitOnChangeCallback(val);
      _this.updateVisibleValue();
    }, _this.handleBlur = function () {
      _this.updateVisibleValue();
    }, _this.handleFocus = function () {
      if (_this.blockFocus) {
        _this.blockFocus = false;
      } else {
        _this.openDatePicker();
      }
    }, _this.handleViewDateChange = function (val) {
      _this.setState({ viewDate: val });
    }, _this.handleKeyDown = function (ev) {
      if (_events2.default.isTabKey(ev)) {
        _this.closeDatePicker();
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


  // Required for validProps function


  _createClass(Date, [{
    key: 'componentDidMount',


    /**
     * Manually focus if autoFocus is applied - allows us to prevent the list from opening.
     *
     * @method componentDidMount
     */
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.blockFocus = true;
        this._input.focus();
      }
    }

    /**
     * A lifecycle method to update the visible value with a formatted version,
     * only when the field is not the active element.
     *
     * @method componentWillReceiveProps
     * @param {Object} props The new props passed down to the component
     * @return {void}
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this._document.activeElement != this._input) {
        var value = props.value || props.defaultValue;
        var date = formatVisibleValue(value, this);

        this.setState({ visibleValue: date });
      }
    }

    /**
     * A lifecycle method to check whether the component has been updated
     *
     * @method componentDidUpdate
     * @param {Object} prevProps The previous props passed down to the component
     * @return {void}
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.datePickerValueChanged(prevProps)) {
        this.blockBlur = false;
        this._handleBlur();
      }
    }

    /**
     *  Checks that the datepicker selected value has changed
     *
     * @method datePickerValueChanged
     * @param {Object} prevProps The previous props passed down to the component
     * @return {Boolean}
     */


    /**
     * Callback to update the hidden field on change.
     *
     * @method emitOnChangeCallback
     * @param {String} val The unformatted decimal value
     * @return {void}
     */


    /**
     * Opens the date picker.
     *
     * @method openDatePicker
     * @return {void}
     */


    /**
     * Closes the date picker.
     *
     * @method closeDatePicker
     * @return {void}
     */


    /**
     * Updates field with the formatted date value.
     *
     * @method updateVisibleValue
     * @return {void}
     */


    /**
     * Handles user input and updates date picker appropriately.
     *
     * @method handleVisibleInputChange
     * @param {Object} ev Event
     * @return {void}
     */


    /**
     * Prevents propagation so date picker does not close on click inside the widget.
     *
     * @method handleWidgetClick
     * @param {Object} ev event
     * @return {void}
     */


    /**
     * Sets the value of the input from the date picker.
     *
     * @method handleDateSelect
     * @param {String} val User selected value
     * @return {void}
     */


    /**
     * Updates visible value on blur
     *
     * @method handleBlur
     * @return {void}
     */


    /**
     * Opens the datepicker on focus
     *
     * @method handleFocus
     * @return {void}
     */


    /**
     * Updates viewDate as hidden input changes.
     *
     * @method handleViewDateChange
     * @param {String} val hidden input value
     * @return {void}
     */


    /**
     * Handles specific key down events
     *
     * @method handleKeyDown
     * @param {Object} ev Event
     * @return {void}
     */

  }, {
    key: 'renderDatePicker',
    value: function renderDatePicker() {
      return _react2.default.createElement(
        _reactDatePicker.MonthView,
        this.datePickerProps,
        _react2.default.createElement(_reactDatePicker.NavBar, this.navBarProps)
      );
    }

    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */

  }, {
    key: 'render',
    value: function render() {
      var datePicker = this.state.open ? this.renderDatePicker() : null;

      return _react2.default.createElement(
        'div',
        { className: this.mainClasses, onClick: this.handleWidgetClick },
        this.labelHTML,
        this.inputHTML,
        _react2.default.createElement('input', this.hiddenInputProps),
        datePicker,
        this.fieldHelpHTML
      );
    }

    /**
     * Sanitizes all valid date separators ( . - 'whitespace' ) replacing them
     * with a slash
     *
     * This allows us to compare against one separator in the i18n string. DD/MM/YYYY
     *
     * @method _sanitizeDateInput
     * @private
     * @return {String} sanitized input
     */

  }, {
    key: '_sanitizeDateInput',
    value: function _sanitizeDateInput(input) {
      return input.replace(/[^0-9A-zÀ-ÿ\s\/\.\-]/g, "").replace(/[-.\s]/g, "/").toLowerCase();
    }
  }, {
    key: 'inputProps',


    /**
     * A getter that combines props passed down from the input decorator with
     * date specific props.
     *
     * @method inputProps
     * @return {Object} props for the visible input
     */
    get: function get() {
      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);

      delete props.autoFocus;
      props.className = this.inputClasses;
      props.onChange = this.handleVisibleInputChange;
      props.onBlur = this.handleBlur;
      props.value = this.state.visibleValue;
      props.onKeyDown = this.handleKeyDown;

      if (!this.props.readOnly && !this.props.disabled) {
        props.onFocus = (0, _chainFunctions2.default)(this.handleFocus, props.onFocus);
      }

      return props;
    }

    /**
     * A getter for hidden input props.
     *
     * @method hiddenInputProps
     * @return {Object} props for the hidden input
     */

  }, {
    key: 'hiddenInputProps',
    get: function get() {
      var props = {
        ref: "hidden",
        type: "hidden",
        readOnly: true
      };

      if (typeof this.props.value !== 'undefined') {
        props.value = this.props.value;
      } else {
        props.defaultValue = this.props.defaultValue;
      }

      return props;
    }

    /**
     * Uses the mainClasses method provided by the decorator to add additional classes
     *
     * @method mainClasses
     * @return {String} Main className
     */

  }, {
    key: 'mainClasses',
    get: function get() {
      return 'carbon-date';
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
      return 'carbon-date__input';
    }

    /**
     * Extends the input content to include the input icon.
     *
     * @method additionalInputContent
     * @return {Object} JSX additional content inline with input
     */

  }, {
    key: 'additionalInputContent',
    get: function get() {
      if (!this.state.valid) {
        return this.inputIconHTML("error");
      } else if (this.state.warning) {
        return this.inputIconHTML("warning");
      } else {
        return this.inputIconHTML("calendar");
      }
    }

    /**
     * A getter that returns datepicker specific props
     *
     * @method datePickerProps
     * @return {Object}
     */

  }, {
    key: 'datePickerProps',
    get: function get() {
      var _this2 = this;

      return {
        date: this.props.value || getDefaultValue(this),
        dateFormat: hiddenFormat(),
        enableHistoryView: false,
        highlightToday: true,
        highlightWeekends: false,
        locale: _i18nJs2.default.locale,
        maxDate: this.props.maxDate,
        minDate: this.props.minDate,
        monthFormat: 'MMM',
        onChange: this.handleDateSelect,
        ref: function ref(input) {
          _this2.datepicker = input;
        },
        theme: null,
        weekDayNames: _moment2.default.localeData(_i18nJs2.default.locale)._weekdaysMin,
        weekNumbers: false
      };
    }

    /**
     * A getter that returns navbar specific props
     *
     * @method navBarProps
     * @return {Object} props for the navbar
     */

  }, {
    key: 'navBarProps',
    get: function get() {
      return {
        navDateFormat: 'MMMM YYYY',
        arrows: { prev: '‹', next: '›' },
        theme: null
      };
    }
  }]);

  return Date;
}(_react2.default.Component), _class.propTypes = {}, _class.defaultProps = {
  /**
   * Sets the default value of the date field
   *
   * @property defaultValue
   * @type {String}
   * @default Today's date
   */
  defaultValue: (0, _moment2.default)().format("YYYY-MM-DD")
}, _temp2)))));

exports.default = Date;

// Private Methods

/**
 * Formats the visible date using i18n
 *
 * @method visibleFormat
 * @private
 * @return {String} formatted date string
 */

function visibleFormat() {
  return _i18nJs2.default.t('date.formats.javascript', { defaultValue: "DD/MM/YYYY" }).toUpperCase();
}

/**
 * Formats valid for entry
 *
 * @method validFormats
 * @private
 * @return {Array} formatted date strings
 */
function validFormats() {
  return _i18nJs2.default.t('date.formats.inputs', { defaultValue: ["MMM/DD/YY", "DD/MM", "DD/MM/YYYY", "DD/MMM/YYYY", "YYYY/MM/DD"] });
}

/**
 * Sets the hidden format
 *
 * @method hiddenFormat
 * @private
 * @return {String} formatted date string
 */
function hiddenFormat() {
  return "YYYY-MM-DD";
}

/**
 * Formats the given value to a specified format
 *
 * @method formatValue
 * @private
 * @param {String} val current value
 * @param {String} formatFrom Current format
 * @param {String} formatTo Desired format
 * @return {String} formatted date
 */
function formatValue(val, formatFrom, formatTo) {
  var date = (0, _moment2.default)(val, formatFrom, _i18nJs2.default.locale, true);
  return date.format(formatTo);
}

/**
 * Adds delimiters to the value
 *
 * @method formatVisibleValue
 * @private
 * @param {String} value Unformatted Value
 * @param {String} scope used to get default value of current scope if value doesn't exist
 * @return {String} formatted visible value
 */
function formatVisibleValue(value, scope) {
  value = value || getDefaultValue(scope);
  return formatValue(value, hiddenFormat(), visibleFormat());
}

/**
 * Returns defaultValue for specified scope,
 *
 * @method getDefaultValue
 * @private
 * @param {Object} scope used to get default value of current scope
 * @return {String} default value
 */
function getDefaultValue(scope) {
  if (typeof scope.refs.hidden !== 'undefined') {
    return scope.refs.hidden.value;
  } else {
    return scope.props.defaultValue;
  }
}