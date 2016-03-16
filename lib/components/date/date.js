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

var _utilsDecoratorsInput = require('./../../utils/decorators/input');

var _utilsDecoratorsInput2 = _interopRequireDefault(_utilsDecoratorsInput);

var _utilsDecoratorsInputLabel = require('./../../utils/decorators/input-label');

var _utilsDecoratorsInputLabel2 = _interopRequireDefault(_utilsDecoratorsInputLabel);

var _utilsDecoratorsInputValidation = require('./../../utils/decorators/input-validation');

var _utilsDecoratorsInputValidation2 = _interopRequireDefault(_utilsDecoratorsInputValidation);

var _utilsDecoratorsInputIcon = require('./../../utils/decorators/input-icon');

var _utilsDecoratorsInputIcon2 = _interopRequireDefault(_utilsDecoratorsInputIcon);

// https://github.com/zippyui/react-date-picker

var _reactDatePicker = require('react-date-picker');

var _reactDatePicker2 = _interopRequireDefault(_reactDatePicker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _i18nJs = require("i18n-js");

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _utilsHelpersEvents = require('./../../utils/helpers/events');

var _utilsHelpersEvents2 = _interopRequireDefault(_utilsHelpersEvents);

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
var Date = (0, _utilsDecoratorsInput2['default'])((0, _utilsDecoratorsInputIcon2['default'])((0, _utilsDecoratorsInputLabel2['default'])((0, _utilsDecoratorsInputValidation2['default'])((function (_React$Component) {
  _inherits(Date, _React$Component);

  function Date() {
    var _this = this;

    _classCallCheck(this, Date);

    _get(Object.getPrototypeOf(Date.prototype), 'constructor', this).apply(this, arguments);

    this._document = document;
    this.state = {
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
      visibleValue: formatVisibleValue(this.props.value, this)
    };

    this.emitOnChangeCallback = function (val) {
      var hiddenField = _this.refs.hidden;
      hiddenField.value = val;

      _this._handleOnChange({ target: hiddenField });
    };

    this.openDatePicker = function () {
      _this._document.addEventListener("click", _this.closeDatePicker);
      var value = _this.props.value || getDefaultValue(_this);
      _this.setState({
        open: true,
        viewDate: value
      });
    };

    this.closeDatePicker = function () {
      _this._document.removeEventListener("click", _this.closeDatePicker);
      _this.setState({
        open: false
      });
    };

    this.updateVisibleValue = function () {
      var date = formatVisibleValue(_this.props.value, _this);
      _this.setState({
        visibleValue: date
      });
    };

    this.handleVisibleInputChange = function (ev) {
      // TODO: This needs more thought i18n with multiple options
      var formats = [visibleFormat(), "MMM DD YY", "DD-MM", "DD-MM-YYYY"],
          validDate = (0, _moment2['default'])(ev.target.value, formats).isValid(),
          newState = { visibleValue: ev.target.value };

      // Updates the hidden value after first formatting to default hidden format
      if (validDate) {
        var hiddenValue = formatValue(ev.target.value, formats, hiddenFormat());
        newState.viewDate = hiddenValue;
        _this.emitOnChangeCallback(hiddenValue);
      }
      _this.setState(newState);
    };

    this.handleWidgetClick = function (ev) {
      ev.nativeEvent.stopImmediatePropagation();
    };

    this.handleDateSelect = function (val) {
      _this.closeDatePicker();
      _this.emitOnChangeCallback(val);
      _this.updateVisibleValue();
    };

    this.handleBlur = function () {
      _this.updateVisibleValue();
    };

    this.handleFocus = function () {
      if (_this.blockFocus) {
        _this.blockFocus = false;
      } else {
        _this.openDatePicker();
      }
    };

    this.handleViewDateChange = function (val) {
      _this.setState({ viewDate: val });
    };

    this.handleKeyDown = function (ev) {
      if (_utilsHelpersEvents2['default'].isTabKey(ev)) {
        _this.closeDatePicker();
      }
    };
  }

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
     * Callback to update the hidden field on change.
     *
     * @method emitOnChangeCallback
     * @param {String} val The unformatted decimal value
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
      var datePicker = this.state.open ? _react2['default'].createElement(_reactDatePicker2['default'], this.datePickerProps) : null;

      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses, onClick: this.handleWidgetClick },
        this.labelHTML,
        this.inputHTML,
        _react2['default'].createElement('input', this.hiddenInputProps),
        datePicker,
        this.validationHTML
      );
    }
  }, {
    key: 'datePickerProps',

    /**
     * A getter that returns datepicker specific props
     *
     * @method inputProps
     * @return {Object} props for the datepicker
     */
    get: function get() {
      var value = this.props.value || getDefaultValue(this);
      var props = {};
      props.ref = 'datepicker';
      props.weekDayNames = ["S", "M", "T", "W", "T", "F", "S"];
      props.monthFormat = "MMM";
      props.dateFormat = hiddenFormat();
      props.onChange = this.handleDateSelect;
      props.date = value;
      props.onViewDateChange = this.handleViewDateChange;
      props.viewDate = this.state.viewDate;
      props.minDate = this.props.minDate;
      props.maxDate = this.props.maxDate;
      return props;
    }

    /**
     * Updates viewDate as hidden input changes.
     *
     * @method handleViewDateChange
     * @param {String} val hidden input value
     * @return {void}
     */
  }, {
    key: 'inputProps',

    /**
     * A getter that combines props passed down from the input decorator with
     * textbox specific props.
     *
     * @method inputProps
     * @return {Object} props for the visible input
     */
    get: function get() {
      var _props = this.props;
      var autoFocus = _props.autoFocus;

      var props = _objectWithoutProperties(_props, ['autoFocus']);

      props.className = this.inputClasses;
      props.onChange = this.handleVisibleInputChange;
      props.onBlur = this.handleBlur;
      props.value = this.state.visibleValue;
      props.onKeyDown = this.handleKeyDown;

      if (!this.props.readOnly && !this.props.disabled) {
        props.onFocus = this.handleFocus;
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
      return 'ui-date';
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
      return 'ui-date__input';
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
      return this.inputIconHTML("calendar");
    }
  }], [{
    key: 'defaultProps',
    value: {
      /**
       * Sets the default value of the date field
       *
       * @property defaultValue
       * @type {String}
       * @default Today's date
       */
      defaultValue: (0, _moment2['default'])().format("YYYY-MM-DD")
    },
    enumerable: true
  }]);

  return Date;
})(_react2['default'].Component)))));

exports['default'] = Date;

// Private Methods

/**
 * Formats the visible date using i18n
 *
 * @method visibleFormat
 * @private
 * @return {String} formatted date string
 */
function visibleFormat() {
  return _i18nJs2['default'].t('date.formats.javascript', { defaultValue: "DD MMM YYYY" }).toUpperCase();
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
  var date = (0, _moment2['default'])(val, formatFrom);
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
module.exports = exports['default'];

/**
 * Stores the document - allows us to override it different contexts, such as
 * when running tests.
 *
 * @property _document
 * @type {document}
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
 * Handles specific key down events
 *
 * @method handleKeyDown
 * @param {Object} ev Event
 * @return {void}
 */