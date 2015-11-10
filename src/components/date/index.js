import React from 'react';
import Input from './../../utils/input';
import InputValidation from './../../utils/input-validation';
import InputIcon from './../../utils/input/icon';
// https://github.com/zippyui/react-date-picker
import DatePicker from 'react-date-picker';
import moment from 'moment';
import I18n from "i18n-js";

// TODO: do we need to use moment.js ???

class DateComponent extends React.Component {

  static defaultProps = {
    defaultValue: moment().format("YYYY-MM-DD")
  }

  visibleFormat = () => {
    return I18n.t('date.formats.javascript', { defaultValue: "DD MMM YYYY" }).toUpperCase();
  }

  hiddenFormat = () => {
    return "YYYY-MM-DD";
  }

  formatValue = (val, formatFrom, formatTo) => {
    var date = moment(val, formatFrom);
    return date.format(formatTo);
  }

  formatVisibleValue = (value) => {
    value = value || this.props.value || this.getDefaultValue();
    return this.formatValue(value, this.hiddenFormat(), this.visibleFormat());
  }

  getDefaultValue = () => {
    if (this.refs.hidden) {
      return this.refs.hidden.value;
    } else {
      return this.props.defaultValue;
    }
  }

  state = {
    open: false,
    viewDate: null,
    visibleValue: this.formatVisibleValue()
  }

  componentWillReceiveProps = (props) => {
    if (document.activeElement != this.refs.visible) {
      var value = props.value || props.defaultValue;
      var date = this.formatVisibleValue(value);
      this.setState({
        visibleValue: date
      });
    }
  }

  /**
   * Handles user input and updates date picker appropriately.
   *
   * @method handleVisibleInputChange
   */
  handleVisibleInputChange = (ev) => {
    var formats = [this.visibleFormat(), "MMM DD YY", "MM-DD-YYYY", "DD-MM", "DD-MM-YYYY"],
        validDate = moment(ev.target.value, formats).isValid(),
        newState = { visibleValue: ev.target.value };

    if (validDate) {
      var hiddenValue = this.formatValue(ev.target.value, formats, this.hiddenFormat());
      newState.viewDate = hiddenValue;
      this.emitOnChangeCallback(hiddenValue);
    }

    this.setState(newState);
  }

  emitOnChangeCallback = (val) => {
    var hiddenField = this.refs.hidden;
    hiddenField.value = val;

    if (this.props.onChange) {
      this.props.onChange({
        target: hiddenField
      }, this.props);
    }
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

  /**
   * Opens the date picker.
   *
   * @method openDatePicker
   */
  openDatePicker = () => {
    document.addEventListener("click", this.closeDatePicker);
    var value = this.props.value || this.getDefaultValue();
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

  /**
   * Prevents propagation so date picker does not close click inside the widget.
   *
   * @method handleWidgetClick
   */
  handleWidgetClick = (ev) => {
    ev.nativeEvent.stopImmediatePropagation();
  }

  updateVisibleValue = () => {
    var date = this.formatVisibleValue();
    this.setState({
      visibleValue: date
    });
  }

  /**
   * Define properties for the date picker.
   *
   * @method datePickerProps
   */
  datePickerProps = () => {
    var value = this.props.value || this.getDefaultValue();
    var props = {};
    props.weekDayNames = ["S", "M", "T", "W", "T", "F", "S"];
    props.monthFormat = "MMM";
    props.dateFormat = this.hiddenFormat();
    props.onChange = this.handleDateSelect;
    props.date = value;
    props.onViewDateChange = (val) => {
      this.setState({ viewDate: val });
    };
    props.viewDate = this.state.viewDate;
    return props;
  }

  handleBlur = () => {
    this.updateVisibleValue();
    this.props.validation.handleBlur();
  }

  handleFocus = () => {
    this.openDatePicker();
    this.props.validation.handleFocus();
  }

  customInputProps = () => {
    var inputProps = this.props.input.inputProps();
    inputProps.onChange = this.handleVisibleInputChange;
    inputProps.onFocus = this.handleFocus;
    inputProps.onBlur = this.handleBlur;
    inputProps.value = this.state.visibleValue;
    return inputProps;
  }

  hiddenFieldProps = () => {
    var props = {};

    if (this.props.value) {
      props.value = this.props.value;
    }

    if (this.props.defaultValue) {
      props.defaultValue = this.props.defaultValue;
    }

    return props;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    var datePicker = "";

    if (this.state.open) {
      datePicker = <DatePicker { ...this.datePickerProps() } />;
    }

    var mainClasses = 'ui-date' +
        this.props.input.mainClasses() +
        this.props.validation.mainClasses();

    var inputClasses = "ui-date__input" +
        this.props.input.inputClasses() +
        this.props.validation.inputClasses();

    return (
      <div className={ mainClasses } onClick={ this.handleWidgetClick }>

        { this.props.input.labelHTML() }

        <input
          className={ inputClasses }
          ref="visible"
          { ...this.customInputProps() }
        />

        { this.props.icon.inputIconHTML("calendar", this.customInputProps().id) }

        <input
          ref="hidden"
          type="hidden"
          readOnly
          { ...this.hiddenFieldProps() }
        />

        { datePicker }

        { this.props.validation.errorMessageHTML() }

      </div>
    );
  }

}

export default InputIcon(InputValidation(Input(DateComponent)));
