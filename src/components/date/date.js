import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import InputIcon from './../../utils/decorators/input-icon';
// https://github.com/zippyui/react-date-picker
import { MonthView, NavBar } from 'react-date-picker';
import moment from 'moment';
import I18n from "i18n-js";
import Events from './../../utils/helpers/events';
import chainFunctions from './../../utils/helpers/chain-functions';
import { validProps } from '../../utils/ether';


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
const Date = Input(InputIcon(InputLabel(InputValidation(
class Date extends React.Component {

  /**
   * Stores the document - allows us to override it different contexts, such as
   * when running tests.
   *
   * @property _document
   * @type {document}
   */
  _document = document;

  // Required for validProps function
  static propTypes = {
    /**
     * Minimum possible date
     *
     * @property minDate
     * @type {String}
     */
    minDate: React.PropTypes.string,

    /**
     * Maximum possible date
     *
     * @property maxDate
     * @type {String}
     */
    maxDate: React.PropTypes.string
  };

  static defaultProps = {
    /**
     * Sets the default value of the date field
     *
     * @property defaultValue
     * @type {String}
     * @default Today's date
     */
    defaultValue: moment().format("YYYY-MM-DD")
  }

  state = {
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
  }

  /**
   * Manually focus if autoFocus is applied - allows us to prevent the list from opening.
   *
   * @method componentDidMount
   */
  componentDidMount() {
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
  componentWillReceiveProps(props) {
    if (this._document.activeElement != this._input) {
      let value = props.value || props.defaultValue;
      let date = formatVisibleValue(value, this);

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
  componentDidUpdate(prevProps) {
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
  datePickerValueChanged = (prevProps) => {
    return this.blockBlur && this.props.value && prevProps.value !== this.props.value;
  }

  /**
   * Callback to update the hidden field on change.
   *
   * @method emitOnChangeCallback
   * @param {String} val The unformatted decimal value
   * @return {void}
   */
  emitOnChangeCallback = (val) => {
    let hiddenField = this.refs.hidden;
    hiddenField.value = val;

    this._handleOnChange({ target: hiddenField });
  }

  /**
   * Opens the date picker.
   *
   * @method openDatePicker
   * @return {void}
   */
  openDatePicker = () => {
    this._document.addEventListener("click", this.closeDatePicker);
    var value = this.props.value || getDefaultValue(this);
    this.setState({
      open: true,
      viewDate: value
    });
  }

  /**
   * Closes the date picker.
   *
   * @method closeDatePicker
   * @return {void}
   */
  closeDatePicker = () => {
    this._document.removeEventListener("click", this.closeDatePicker);
    this.setState({
      open: false
    });
  }

  /**
   * Updates field with the formatted date value.
   *
   * @method updateVisibleValue
   * @return {void}
   */
  updateVisibleValue = () => {
    let date = formatVisibleValue(this.props.value, this);
    this.setState({
      visibleValue: date
    });
  }

  /**
   * Handles user input and updates date picker appropriately.
   *
   * @method handleVisibleInputChange
   * @param {Object} ev Event
   * @return {void}
   */
  handleVisibleInputChange = (ev) => {
    let input = this._sanitizeDateInput(ev.target.value),
        formats = [visibleFormat()].concat(validFormats()),
        validDate = moment(input, formats, I18n.locale, true).isValid(),
        newState = { visibleValue: ev.target.value };

    // Updates the hidden value after first formatting to default hidden format
    if (validDate) {
      let hiddenValue = formatValue(input, formats, hiddenFormat());
      newState.viewDate = hiddenValue;
      this.emitOnChangeCallback(hiddenValue);
    }
    this.setState(newState);
  }

  /**
   * Prevents propagation so date picker does not close on click inside the widget.
   *
   * @method handleWidgetClick
   * @param {Object} ev event
   * @return {void}
   */
  handleWidgetClick = (ev) => {
    ev.nativeEvent.stopImmediatePropagation();
  }

  /**
   * Sets the value of the input from the date picker.
   *
   * @method handleDateSelect
   * @param {String} val User selected value
   * @return {void}
   */
  handleDateSelect = (val) => {
    this.blockBlur = true;
    this.closeDatePicker();
    this.emitOnChangeCallback(val);
    this.updateVisibleValue();
  }

  /**
   * Updates visible value on blur
   *
   * @method handleBlur
   * @return {void}
   */
  handleBlur = () => {
    this.updateVisibleValue();
  }

  /**
   * Opens the datepicker on focus
   *
   * @method handleFocus
   * @return {void}
   */
  handleFocus = () => {
    if (this.blockFocus) {
      this.blockFocus = false;
    } else {
      this.openDatePicker();
    }
  }



  /**
   * Updates viewDate as hidden input changes.
   *
   * @method handleViewDateChange
   * @param {String} val hidden input value
   * @return {void}
   */
  handleViewDateChange = (val) => {
    this.setState({ viewDate: val });
  }

  /**
   * Handles specific key down events
   *
   * @method handleKeyDown
   * @param {Object} ev Event
   * @return {void}
   */
  handleKeyDown = (ev) => {
    if (Events.isTabKey(ev)) {
      this.closeDatePicker();
    }
  };

  /**
   * A getter that combines props passed down from the input decorator with
   * date specific props.
   *
   * @method inputProps
   * @return {Object} props for the visible input
   */
  get inputProps() {
    let { ...props } = validProps(this);
    props.className = this.inputClasses;
    props.onChange = this.handleVisibleInputChange;
    props.onBlur = this.handleBlur;
    props.value = this.state.visibleValue;
    props.onKeyDown = this.handleKeyDown;

    delete props.autoFocus;
    delete props.defaultValue;

    if (!this.props.readOnly && !this.props.disabled) {
      props.onFocus = chainFunctions(this.handleFocus, props.onFocus);
    }

    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   * @return {Object} props for the hidden input
   */
  get hiddenInputProps() {
    let props = {
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
  get mainClasses() {
    return 'carbon-date';
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return 'carbon-date__input';
  }

  /**
   * Extends the input content to include the input icon.
   *
   * @method additionalInputContent
   * @return {Object} JSX additional content inline with input
   */
  get additionalInputContent() {
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
  get datePickerProps() {
    return {
      date: this.props.value || getDefaultValue(this),
      dateFormat: hiddenFormat(),
      enableHistoryView: false,
      highlightToday: true,
      highlightWeekends: false,
      locale: I18n.locale,
      maxDate: this.props.maxDate,
      minDate: this.props.minDate,
      onChange: this.handleDateSelect,
      ref: (input) => { this.datepicker = input; },
      theme: null,
      weekDayNames: moment.localeData(I18n.locale)._weekdaysMin,
      weekNumbers: false
    };
  }

  /**
   * A getter that returns navbar specific props
   *
   * @method navBarProps
   * @return {Object} props for the navbar
   */
  get navBarProps() {
    return {
      navDateFormat: 'MMMM YYYY',
      arrows: { prev: '‹', next: '›' },
      maxDate: this.props.maxDate,
      minDate: this.props.minDate,
      theme: null
    };
  }


  renderDatePicker() {
    return (
      <MonthView { ...this.datePickerProps }>
        <NavBar { ...this.navBarProps } />
      </MonthView>
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let datePicker = this.state.open ? this.renderDatePicker() : null;

    return (
      <div className={ this.mainClasses } onClick={ this.handleWidgetClick }>

        { this.labelHTML }
        { this.inputHTML }
        <input { ...this.hiddenInputProps } />
        { datePicker }

        { this.fieldHelpHTML }

      </div>
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
  _sanitizeDateInput(input) {
    return input.replace(/[^0-9A-zÀ-ÿ\s\/\.\-]/g, "").replace(/[-.\s]/g, "/").toLowerCase();
  }
}
))));

export default Date;

// Private Methods

/**
 * Formats the visible date using i18n
 *
 * @method visibleFormat
 * @private
 * @return {String} formatted date string
 */
function visibleFormat() {
  return I18n.t('date.formats.javascript', { defaultValue: "DD/MM/YYYY" }).toUpperCase();
}

/**
 * Formats valid for entry
 *
 * @method validFormats
 * @private
 * @return {Array} formatted date strings
 */
function validFormats() {
  return I18n.t('date.formats.inputs', { defaultValue: ["MMM/DD/YY", "DD/MM", "DD/MM/YYYY", "DD/MMM/YYYY", "YYYY/MM/DD"] });
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
  let date = moment(val, formatFrom, I18n.locale, true);
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
