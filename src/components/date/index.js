import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import InputIcon from './../../utils/decorators/input-icon';
// https://github.com/zippyui/react-date-picker
import DatePicker from 'react-date-picker';
import moment from 'moment';
import I18n from "i18n-js";

/**
 * Decorators
 *
 * The component's decorators may define additional props.
 * Refer to the decorators for more information on required and optional props.
 */
@Input
@InputIcon
@InputLabel
@InputValidation
/**
 * A Date widget.
 *
 * == How to use a Date in a component:
 *
 * In your file
 *
 *  import Date from 'carbon/lib/components/Date';
 *
 * In the render method:
 *
 *  <Date />
 *
 * @class Date
 * @constructor
 */
class Date extends React.Component {

  doc = document;

  static defaultProps = {
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
   * A lifecycle method to update the visible value with a formatted version,
   * only when the field is not the active element.
   *
   * @method componentWillReceiveProps
   * @param {Object} props The new props passed down to the component
   */
  componentWillReceiveProps = (props) => {
    if (document.activeElement != this.refs.visible) {
      let value = props.value || props.defaultValue;
      let date = formatVisibleValue(value, this);

      this.setState({ visibleValue: date });
    }
  }

  /**
   * Callback to update the hidden field on change.
   *
   *@method emitOnChangeCallback
   *@param {String} val The unformatted decimal value
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
   */
  openDatePicker = () => {
    this.doc.addEventListener("click", this.closeDatePicker);
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
   */
  closeDatePicker = () => {
    this.doc.removeEventListener("click", this.closeDatePicker);
    this.setState({
      open: false
    });
  }

  /**
   * Updates field with the formatted date value.
   *
   * @method updateVisibleValue
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
   */
  handleVisibleInputChange = (ev) => {
    // TODO: This needs more thought i18n with multiple options
    let formats = [visibleFormat(), "MMM DD YY", "DD-MM", "DD-MM-YYYY"],
        validDate = moment(ev.target.value, formats).isValid(),
        newState = { visibleValue: ev.target.value };

    // Updates the hidden value after first formatting to default hidden format
    if (validDate) {
      let hiddenValue = formatValue(ev.target.value, formats, hiddenFormat());
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
   */
  handleWidgetClick = (ev) => {
    ev.nativeEvent.stopImmediatePropagation();
  }

  /**
   * Sets the value of the input from the date picker.
   *
   * @method handleDateSelect
   * @param {String} val User selected value
   */
  handleDateSelect = (val) => {
    this.closeDatePicker();
    this.emitOnChangeCallback(val);
    this.updateVisibleValue();
  }

  /**
   * Updates visible value on blur
   *
   * @method handleBlur
   */
  handleBlur = () => {
    this.updateVisibleValue();
  }

  /**
   * Opens the datepicker on focus
   *
   * @method handleFocus
   */
  handleFocus = () => {
    this.openDatePicker();
  }

  /**
   * A getter that returns datepicker specific props
   *
   * @method inputProps
   */
  get datePickerProps() {
    let value = this.props.value || getDefaultValue(this);
    let props = {};
    props.ref = 'datepicker';
    props.weekDayNames = ["S", "M", "T", "W", "T", "F", "S"];
    props.monthFormat = "MMM";
    props.dateFormat = hiddenFormat();
    props.onChange = this.handleDateSelect;
    props.date = value;
    props.onViewDateChange = this.handleViewDateChange;
    props.viewDate = this.state.viewDate;
    return props;
  }

  /**
   * Updates viewDate as hidden input changes.
   *
   * @method handleViewDateChange
   * @param val
   */
  handleViewDateChange = (val) => {
    this.setState({ viewDate: val });
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
   *
   * @method inputProps
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.ref = "visible";
    props.onChange = this.handleVisibleInputChange;
    props.onFocus = this.handleFocus;
    props.onBlur = this.handleBlur;
    props.value = this.state.visibleValue;
    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   */
  get hiddenInputProps() {
    let props = {
      ref: "hidden",
      type: "hidden",
      readOnly: true
    };

    if (typeof this.props.value !== 'undefined') {
      props.value = this.props.value; }
    if (typeof this.props.defaultValue !== 'undefined') {
      props.defaultValue = this.props.defaultValue; }

    return props;
  }

  /**
   * Main Class getter
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return 'ui-date';
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'ui-date__input';
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let datePicker = (this.state.open) ? <DatePicker { ...this.datePickerProps } /> : null;

    return (
      <div className={ this.mainClasses } onClick={ this.handleWidgetClick }>

        { this.labelHTML }
        <input { ...this.inputProps } />
        <input { ...this.hiddenInputProps } />
        { this.inputIconHTML("calendar") }
        { datePicker }
        { this.validationHTML }

      </div>
    );
  }
}

export default Date;

// Private Methods

/**
 * Formats the visible date using i18n
 *
 * @method visibleFormat
 * @private
 */
function visibleFormat() {
  return I18n.t('date.formats.javascript', { defaultValue: "DD MMM YYYY" }).toUpperCase();
}

/**
 * Sets the hidden format
 *
 * @method hiddenFormat
 * @private
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
 */
function formatValue(val, formatFrom, formatTo) {
  let date = moment(val, formatFrom);
  return date.format(formatTo);
}

/**
 * Adds delimiters to the value
 *
 * @method {String} formatVisibleValue
 * @private
 * @param {String} value Unformatted Value
 * @param {String} scope used to get default value of current scope if value doesn't exist
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
 */
function getDefaultValue(scope) {
  if (typeof scope.refs.hidden !== 'undefined') {
    return scope.refs.hidden.value;
  } else {
    return scope.props.defaultValue;
  }
}
