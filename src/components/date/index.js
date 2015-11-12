import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import InputIcon from './../../utils/decorators/input-icon';
// https://github.com/zippyui/react-date-picker
import DatePicker from 'react-date-picker';
import moment from 'moment';
import I18n from "i18n-js";

@Input
@InputIcon
@InputLabel
@InputValidation
class DateComponent extends React.Component {

  static defaultProps = {
    defaultValue: moment().format("YYYY-MM-DD")
  }

  state = {
    open: false,
    viewDate: null,
    visibleValue: formatVisibleValue(this.props.value, this)
  }

  componentWillReceiveProps = (props) => {
    if (document.activeElement != this.refs.visible) {
      var value = props.value || props.defaultValue;
      var date = formatVisibleValue(value, this);

      this.setState({
        visibleValue: date
      });
    }
  }

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
    document.addEventListener("click", this.closeDatePicker);
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
    document.removeEventListener("click", this.closeDatePicker);
    this.setState({
      open: false
    });
  }

  updateVisibleValue = () => {
    var date = formatVisibleValue(this.props.value, this);
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
    var formats = [visibleFormat(), "MMM DD YY", "MM-DD-YYYY", "DD-MM", "DD-MM-YYYY"],
        validDate = moment(ev.target.value, formats).isValid(),
        newState = { visibleValue: ev.target.value };

    if (validDate) {
      var hiddenValue = formatValue(ev.target.value, formats, hiddenFormat());
      newState.viewDate = hiddenValue;
      this.emitOnChangeCallback(hiddenValue);
    }

    this.setState(newState);
  }

  /**
   * Prevents propagation so date picker does not close click inside the widget.
   *
   * @method handleWidgetClick
   */
  handleWidgetClick = (ev) => {
    ev.nativeEvent.stopImmediatePropagation();
  }

  /**
   * Sets the value of the input from the date picker.
   *
   * @method handleDateSelect
   */
  handleDateSelect = (val) => {
    this.closeDatePicker();
    this.emitOnChangeCallback(val);
    this.updateVisibleValue();
  }

  handleBlur = () => {
    this.updateVisibleValue();
  }

  handleFocus = () => {
    this.openDatePicker();
  }

  get datePickerProps() {
    var value = this.props.value || getDefaultValue(this);
    var props = {};
    props.weekDayNames = ["S", "M", "T", "W", "T", "F", "S"];
    props.monthFormat = "MMM";
    props.dateFormat = hiddenFormat();
    props.onChange = this.handleDateSelect;
    props.date = value;
    props.onViewDateChange = (val) => {
      this.setState({ viewDate: val });
    };
    props.viewDate = this.state.viewDate;
    return props;
  }

  get inputProps() {
    var { ...props } = this.props;
    props.className = this.inputClasses;
    props.ref = "visible";
    props.onChange = this.handleVisibleInputChange;
    props.onFocus = this.handleFocus;
    props.onBlur = this.handleBlur;
    props.value = this.state.visibleValue;
    return props;
  }

  get hiddenInputProps() {
    var props = {
      ref: "hidden",
      type: "hidden",
      readOnly: true
    };

    if (this.props.value) { props.value = this.props.value; }
    if (this.props.defaultValue) { props.defaultValue = this.props.defaultValue; }

    return props;
  }

  get mainClasses() {
    return 'ui-date';
  }

  get inputClasses() {
    return 'ui-date__input';
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    var datePicker = (this.state.open) ? <DatePicker { ...this.datePickerProps } /> : null;


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

export default DateComponent;

// @private

function visibleFormat() {
  return I18n.t('date.formats.javascript', { defaultValue: "DD MMM YYYY" }).toUpperCase();
};

function hiddenFormat() {
  return "YYYY-MM-DD";
};

function formatValue(val, formatFrom, formatTo) {
  var date = moment(val, formatFrom);
  return date.format(formatTo);
}

function formatVisibleValue(value, scope) {
  value = value || getDefaultValue(scope);
  return formatValue(value, hiddenFormat(), visibleFormat());
}

function getDefaultValue(scope) {
  if (scope.refs.hidden) {
    return scope.refs.hidden.value;
  } else {
    return scope.props.defaultValue;
  }
}
