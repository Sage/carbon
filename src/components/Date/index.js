import React from 'react';
import InputClass from './../../utils/InputClass';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import I18n from "i18n-js";

// TODO: do we need to use moment.js ???

class Date extends InputClass {

  visibleFormat = () => {
    return I18n.t('date.formats.javascript', { defaultValue: "dd/mm/yyyy" }).toUpperCase();
  }

  hiddenFormat = () => {
    return "YYYY-MM-DD";
  }

  formatValue = (val, formatFrom, formatTo) => {
    var date = moment(val, formatFrom);
    return date.format(formatTo);
  }

  formatHiddenValue = (value) => {
  }

  formatVisibleValue = (value) => {
    var value = value || this.props.value || this.getDefaultValue();
    return this.formatValue(value, this.hiddenFormat(), this.visibleFormat());
  }

  getDefaultValue = () => {
    if (this.refs) {
      return this.refs.hidden.getDOMNode().value;
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
    if (document.activeElement != this.refs.visible.getDOMNode()) {
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
    var validDate = moment(ev.target.value, this.visibleFormat()).isValid(),
        newState = { visibleValue: ev.target.value };

    if (validDate) {
      var hiddenValue = this.formatValue(ev.target.value, this.visibleFormat(), this.hiddenFormat());
      newState.viewDate = hiddenValue;
      this.emitOnChangeCallback(hiddenValue);
    }

    this.setState(newState);
  }

  emitOnChangeCallback = (val) => {
    var hiddenField = this.refs.hidden.getDOMNode();
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
    props.dateFormat = this.hiddenFormat();
    props.onChange = this.handleDateSelect;
    props.date = value;
    props.onViewDateChange = (val) => {
      this.setState({ viewDate: val });
    }
    props.viewDate = this.state.viewDate;
    return props;
  }

  customInputProps = (inputProps) => {
    inputProps.onChange = this.handleVisibleInputChange;
    inputProps.onFocus = this.openDatePicker;
    inputProps.onBlur = this.updateVisibleValue;
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
  render = () => {
    var datePicker = "";

    if (this.state.open) {
      datePicker = <DatePicker { ...this.datePickerProps() } />;
    }

    return (
      <div className="ui-date" onClick={ this.handleWidgetClick }>

        <input
          ref="visible"
          { ...this.inputProps() }
        />

        <input
          ref="hidden"
          type="hidden"
          readOnly
          { ...this.hiddenFieldProps() }
        />

        { datePicker }
      </div>
    );
  }

};

export default Date;
