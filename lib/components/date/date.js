'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDayPicker = require('react-day-picker');

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _moment = require('react-day-picker/moment');

var _moment2 = _interopRequireDefault(_moment);

require('react-day-picker/lib/style.css');

require('./date.scss');

var _navbar = require('./navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _portal = require('./../portal');

var _portal2 = _interopRequireDefault(_portal);

var _browser = require('./../../utils/helpers/browser');

var _browser2 = _interopRequireDefault(_browser);

var _input = require('./../../utils/decorators/input');

var _input2 = _interopRequireDefault(_input);

var _inputLabel = require('./../../utils/decorators/input-label');

var _inputLabel2 = _interopRequireDefault(_inputLabel);

var _inputValidation = require('./../../utils/decorators/input-validation');

var _inputValidation2 = _interopRequireDefault(_inputValidation);

var _inputIcon = require('./../../utils/decorators/input-icon');

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _events = require('./../../utils/helpers/events');

var _events2 = _interopRequireDefault(_events);

var _date = require('./../../utils/helpers/date');

var _date2 = _interopRequireDefault(_date);

var _date3 = require('./../../utils/validations/date');

var _date4 = _interopRequireDefault(_date3);

var _chainFunctions = require('./../../utils/helpers/chain-functions');

var _chainFunctions2 = _interopRequireDefault(_chainFunctions);

var _ether = require('./../../utils/ether');

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Stores a reference to the current date in the given format,
 * which can be used for default values.
 *
 * @property _today
 * @type {string}
 */
var today = _date2.default.todayFormatted('YYYY-MM-DD');
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
var Date = (0, _input2.default)((0, _inputIcon2.default)((0, _inputLabel2.default)((0, _inputValidation2.default)((_temp = _class = function (_React$Component) {
  _inherits(Date, _React$Component);

  /**
   * Stores the document - allows us to override it different contexts, such as
   * when running tests.
   *
   * @property _document
   * @type {document}
   */

  // Required for validProps function
  function Date(args) {
    _classCallCheck(this, Date);

    var _this = _possibleConstructorReturn(this, (Date.__proto__ || Object.getPrototypeOf(Date)).call(this, args));

    _this._document = document;
    _this.state = {
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
       * @property datePickerValue
       * @type {String}
       * @default null
       */
      datePickerValue: null,

      /**
       * Sets the default value of the decimal field
       *
       * @property visibleValue
       * @type {String}
       * @default value
       */
      visibleValue: _this.formatVisibleValue(_this.props.value)
    };

    _this.datePickerValueChanged = function (prevProps) {
      return _this.blockBlur && _this.props.value && prevProps.value !== _this.props.value;
    };

    _this.emitOnChangeCallback = function (val) {
      var hiddenField = _this.hidden;
      var isValid = _date2.default.isValidDate(val, { sanitize: typeof val === 'string' });
      hiddenField.value = isValid ? _date2.default.formatDateString(val, _this.hiddenFormat()) : val;
      _this._handleOnChange({ target: hiddenField });
    };

    _this.openDatePicker = function () {
      _this._document.addEventListener('click', _this.closeDatePicker);
      _this.setState({ open: true });

      if (_date2.default.isValidDate(_this.props.value)) {
        _this.setState({
          datePickerValue: _date2.default.stringToDate(_this.props.value)
        });
      }
    };

    _this.closeDatePicker = function () {
      _this._document.removeEventListener('click', _this.closeDatePicker);
      _this.setState({
        open: false
      });
    };

    _this.updateVisibleValue = function () {
      var date = _this.formatVisibleValue(_this.props.value);
      _this.setState({
        visibleValue: date
      });
    };

    _this.handleVisibleInputChange = function (ev) {
      var input = _date2.default.sanitizeDateInput(ev.target.value),
          validDate = _date2.default.isValidDate(input),
          newState = { visibleValue: ev.target.value };

      // Updates the hidden value after first formatting to default hidden format
      if (validDate) {
        var hiddenValue = _date2.default.formatValue(input, _this.hiddenFormat());
        newState.datePickerValue = _date2.default.stringToDate(hiddenValue);

        if (_this.datepicker && _this.monthOrYearHasChanged(newState.datePickerValue)) {
          _this.datepicker.showMonth(newState.datePickerValue);
        }

        _this.emitOnChangeCallback(hiddenValue);
      } else {
        _this.emitOnChangeCallback(ev.target.value);
      }
      _this.setState(newState);
    };

    _this.monthOrYearHasChanged = function (newDate) {
      var currentDate = _this.datepicker.state.currentMonth;

      return currentDate.getMonth() !== newDate.getMonth() || currentDate.getYear() !== newDate.getYear();
    };

    _this.handleWidgetClick = function (ev) {
      ev.nativeEvent.stopImmediatePropagation();
    };

    _this.handleDateSelect = function (val, modifiers) {
      if (modifiers.disabled) {
        return;
      }
      _this.blockBlur = true;
      _this.closeDatePicker();
      _this._handleContentChange();
      _this.emitOnChangeCallback(val);
      _this.updateVisibleValue();
    };

    _this.handleBlur = function () {
      _this.updateVisibleValue();
      if (_this.props.onBlur) {
        _this.props.onBlur();
      }
    };

    _this.handleFocus = function () {
      if (_this.blockFocus) {
        _this.blockFocus = false;
      } else {
        _this.openDatePicker();
      }
    };

    _this.handleKeyDown = function (ev) {
      if (_events2.default.isTabKey(ev)) {
        _this.closeDatePicker();
      }
    };

    _this.updateDatePickerPosition = function () {
      _this.setState({ containerStyle: _this.containerStyle });
    };

    _this.window = _browser2.default.getWindow();
    return _this;
  }

  /**
   * Manually focus if autoFocus is applied - allows us to prevent the list from opening.
   *
   * @method componentDidMount
   */


  _createClass(Date, [{
    key: 'componentDidMount',
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
     * @param {Object} nextProps The new props passed down to the component
     * @return {void}
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this._document.activeElement !== this._input) {
        var date = this.formatVisibleValue(nextProps.value);
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
     * Determines if the new date's month or year has changed from the currently selected.
     *
     * @method monthOrYearHasChanged
     * @param {Date}
     * @return {Boolean}
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
     * Handles specific key down events
     *
     * @method handleKeyDown
     * @param {Object} ev Event
     * @return {void}
     */

  }, {
    key: 'disabledDays',


    /**
    * Returns the disabled array of days specified by props maxDate and minDate
    *
    * @method disabledDays
    * @return {Array}
    */
    value: function disabledDays() {
      if (!this.props.minDate && !this.props.maxDate) {
        return null;
      }
      var days = [];
      if (this.props.minDate) {
        days.push({ before: _date2.default.stringToDate(this.props.minDate) });
      }
      if (this.props.maxDate) {
        days.push({ after: _date2.default.stringToDate(this.props.maxDate) });
      }
      return days;
    }

    /**
    * A getter that returns datepicker specific props
    *
    * @method datePickerProps
    * @return {Object}
    */

  }, {
    key: 'getInputBoundingRect',


    /**
     * Returns the bounding rect for the input
     *
     * @method getInputBoundingRect
     * @return {Object}
     */
    value: function getInputBoundingRect() {
      return this._input.getBoundingClientRect();
    }

    /**
     * Returns the style for the DayPicker container
     *
     * @method containerStyle
     * @return {Object}
     */

  }, {
    key: 'renderDatePicker',


    /**
     * Returns the DayPicker component
     *
     * @method renderDatePicker
     * @return {Object} JSX
     */
    value: function renderDatePicker() {
      return this.state.open && _react2.default.createElement(
        _portal2.default,
        { onReposition: this.updateDatePickerPosition },
        _react2.default.createElement(_reactDayPicker2.default, _extends({}, this.datePickerProps, { containerProps: this.containerProps }))
      );
    }
  }, {
    key: 'renderHiddenInput',
    value: function renderHiddenInput() {
      var _this2 = this;

      return _react2.default.createElement('input', _extends({}, this.hiddenInputProps, {
        ref: function ref(node) {
          _this2.hidden = node;
        }
      }));
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
      return _react2.default.createElement(
        'div',
        _extends({
          className: this.mainClasses, onClick: this.handleWidgetClick
        }, (0, _tags2.default)('date', this.props)),
        this.labelHTML,
        this.inputHTML,
        this.renderHiddenInput(),
        this.renderDatePicker(),
        this.fieldHelpHTML
      );
    }

    /**
    * Formats the visible date using i18n
    *
    * @method visibleFormat
    * @return {String} formatted date string
    */

  }, {
    key: 'visibleFormat',
    value: function visibleFormat() {
      return _i18nJs2.default.t('date.formats.javascript', { defaultValue: 'DD/MM/YYYY' }).toUpperCase();
    }

    /**
     * Sets the hidden format
     *
     * @method hiddenFormat
     * @return {String} formatted date string
     */

  }, {
    key: 'hiddenFormat',
    value: function hiddenFormat() {
      return 'YYYY-MM-DD';
    }

    /**
     * Adds delimiters to the value
     *
     * @method formatVisibleValue
     * @param {String} value Unformatted Value
     * @return {String} formatted visible value
     */

  }, {
    key: 'formatVisibleValue',
    value: function formatVisibleValue(value) {
      // Don't sanitize so it accepts the hidden format (with dash separators)
      return _date2.default.formatValue(value || today, this.visibleFormat(), { formats: this.hiddenFormat(), sanitize: false });
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

      props.className = this.inputClasses;
      props.onChange = this.handleVisibleInputChange;
      props.onBlur = this.handleBlur;
      props.value = this.state.visibleValue;
      props.onKeyDown = this.handleKeyDown;
      props.disabled = this.props.disabled;
      props.readOnly = this.props.readOnly;

      delete props.autoFocus;
      delete props.internalValidations;

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
        ref: 'hidden',
        type: 'hidden',
        readOnly: true,
        'data-element': 'hidden-input',
        value: _date2.default.formatValue(this.props.value, this.hiddenFormat())
      };

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
        return this.inputIconHTML('error');
      } else if (this.state.warning) {
        return this.inputIconHTML('warning');
      }
      return this.inputIconHTML('calendar');
    }
  }, {
    key: 'datePickerProps',
    get: function get() {
      var _this3 = this;

      var date = this.state.datePickerValue;

      if (!date) {
        date = this.props.value;
      }

      return {
        disabledDays: this.disabledDays(),
        enableOutsideDays: true,
        fixedWeeks: true,
        initialMonth: this.state.datePickerValue || _date2.default.stringToDate(date),
        inline: true,
        locale: _i18nJs2.default.locale,
        localeUtils: _moment2.default,
        navbarElement: _react2.default.createElement(_navbar2.default, null),
        onDayClick: this.handleDateSelect,
        ref: function ref(input) {
          _this3.datepicker = input;
        },
        selectedDays: [this.state.datePickerValue]
      };
    }

    /**
     * Updates the containerStyle state
     *
     * @method updateDatePickerPosition
     * @return {Void}
     */

  }, {
    key: 'containerStyle',
    get: function get() {
      var inputRect = this.getInputBoundingRect();
      var offsetY = window.pageYOffset;
      return {
        left: inputRect.left,
        top: inputRect.bottom + offsetY
      };
    }

    /**
     * Returns the props for the DayPicker container
     *
     * @method containerProps
     * @return {Object}
     */

  }, {
    key: 'containerProps',
    get: function get() {
      return {
        style: this.state.containerStyle,
        onClick: this.handleWidgetClick
      };
    }
  }]);

  return Date;
}(_react2.default.Component), _class.propTypes = {
  /**
   * Automatically focus on component mount
   *
   * @property autoFocus
   * @type {Boolean}
  */
  autoFocus: _propTypes2.default.bool,

  /**
   * Disable all user interaction.
   *
   * @property disabled
   * @type {boolean}
   */
  disabled: _propTypes2.default.bool,

  /**
   * Used to provide additional validations on composed components.
   *
   * @property internalValidations
   * @type {Array}
   */
  internalValidations: _propTypes2.default.array,

  /**
   * Minimum possible date
   *
   * @property minDate
   * @type {String}
   */
  minDate: _propTypes2.default.string,

  /**
   * Maximum possible date
   *
   * @property maxDate
   * @type {String}
   */
  maxDate: _propTypes2.default.string,

  /**
   * Specify a callback triggered on blur
   *
   * @property onBlur
   * @type {Function}
   */
  onBlur: _propTypes2.default.func,

  /**
   * Display the currently selected value without displaying the input
   *
   * @property readOnly
   * @type {Boolean}
   */
  readOnly: _propTypes2.default.bool,

  /**
   * The current date
   *
   * @property value
   * @type {String}
   */
  value: _propTypes2.default.string
}, _class.defaultProps = {
  /**
   * Sets the default value of the date field
   *
   * @property value
   * @type {String}
   * @default Today's date
   */
  value: today,

  /**
  * Sets validations that should always be found on the component
  *
  * @property internalValidations
  * @type {Array}
  * @default DateValidator
  */
  internalValidations: [new _date4.default()] }, _temp)))));

exports.default = Date;