import React from 'react';
import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import Events from '../../../utils/helpers/events';
import DateHelper from '../../../utils/helpers/date';
import DateValidator from '../../../utils/validations/date';
import tagComponent from '../../../utils/helpers/tags';
import DatePicker from './date-picker.component';
import StyledDateInput from './date.style';
import Textbox from '../textbox';

const defaultDateFormat = 'DD/MM/YYYY';
const today = DateHelper.todayFormatted();

class Date extends React.Component {
  static propTypes = {
    ...Textbox.propTypes,
    /** Automatically focus on component mount */
    autoFocus: PropTypes.bool,
    /** Used to provide additional validations on composed components */
    internalValidations: PropTypes.array,
    /** Minimum possible date YYYY-MM-DD */
    minDate: PropTypes.string,
    /** Maximum possible date YYYY-MM-DD */
    maxDate: PropTypes.string,
    /** Specify a callback triggered on blur */
    onBlur: PropTypes.func,
    /** Specify a callback triggered on change */
    onChange: PropTypes.func,
    /** Specify a callback triggered on focus */
    onFocus: PropTypes.func,
    /** The current date YYYY-MM-DD */
    value: PropTypes.string
  };

  static defaultProps = {
    value: today,
    internalValidations: [new DateValidator()]
  };

  isBlurBlocked = false; // stops the blur callback from triggering (closing the list) when we don't want it to

  isInputTyped = false;

  state = {
    isDatePickerOpen: false,
    /** Date object to pass to the DatePicker */
    selectedDate: DateHelper.stringToDate(this.props.value),
    /** Displayed value, format dependent on a region */
    visibleValue: formatDateToCurrentLocale(this.props.value)
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.isAutoFocused = true;
      this.input.focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.isBlurBlocked && this.hasDatePickerValueChanged(prevProps)) {
      this.isBlurBlocked = false;
      this.handleBlur();
    }
  }

  hasDatePickerValueChanged = (prevProps) => {
    return this.props.value && prevProps.value !== this.props.value;
  };

  assignInput = (input) => {
    this.input = input.current;
  };

  handleBlur = (ev) => {
    const { disabled, readOnly } = this.props;

    if (disabled || readOnly || this.isBlurBlocked) return;

    if (this.props.onBlur) this.props.onBlur(ev);

    this.reformatVisibleDate();
  }

  handleFocus = (ev) => {
    const { disabled, readOnly } = this.props;

    if (disabled || readOnly) return;

    if (this.isAutoFocused) {
      this.isAutoFocused = false;
    } else {
      this.openDatePicker();
    }

    if (this.props.onFocus) this.props.onFocus(ev);
  };

  handleTabKeyDown = (ev) => {
    if (Events.isTabKey(ev)) {
      this.closeDatePicker();
    }
  };

  openDatePicker = () => {
    this.isBlurBlocked = true;
    this.isInputTyped = false;
    document.addEventListener('click', this.closeDatePicker);
    this.updateSelectedDate(this.props.value);
    this.setState({ isDatePickerOpen: true });
  };

  reformatVisibleDate = () => {
    const { visibleValue } = this.state;

    if (DateHelper.isValidDate(visibleValue)) {
      this.setState({ visibleValue: formatDateToCurrentLocale(visibleValue) });
    }
  }

  closeDatePicker = () => {
    document.removeEventListener('click', this.closeDatePicker);
    this.setState({ isDatePickerOpen: false });
  };

  handleDateSelect = (selectedDate) => {
    const stringDateIso = DateHelper.formatDateString(selectedDate);

    this.isBlurBlocked = true;
    this.closeDatePicker();
    this.updateVisibleValue(stringDateIso);
    this.emitOnChangeCallback(stringDateIso);
  };

  updateVisibleValue = (date) => {
    const visibleValue = formatDateToCurrentLocale(date);

    if (this.isInputTyped) return;

    this.setState({
      selectedDate: date,
      visibleValue
    });
  };

  handleVisibleInputChange = (ev) => {
    const { disabled, readOnly } = this.props;
    const dateWithSlashes = DateHelper.sanitizeDateInput(ev.target.value);
    const isValidDate = DateHelper.isValidDate(dateWithSlashes);
    let isoDateString;

    if (disabled || readOnly) return;

    this.isInputTyped = false;
    this.isBlurBlocked = false;

    if (isValidDate) {
      isoDateString = DateHelper.formatValue(dateWithSlashes);
      this.updateSelectedDate(isoDateString);
      this.emitOnChangeCallback(isoDateString);
    }

    this.setState({ visibleValue: ev.target.value });
  };

  updateSelectedDate = (newValue) => {
    const isoDate = DateHelper.stringToDate(newValue);

    if (isoDate.getDate()) {
      this.setState({ selectedDate: isoDate });
    } else {
      this.setState({ selectedDate: DateHelper.stringToDate(today) });
    }
  };

  emitOnChangeCallback = (stringDate) => {
    const changePayload = { target: { value: stringDate } };

    if (this.props.onChange) this.props.onChange(changePayload);
  };

  renderDatePicker = (dateRangeProps) => {
    if (!this.state.isDatePickerOpen) return null;

    return (
      <DatePicker
        inputElement={ this.input && this.input.parentElement }
        selectedDate={ this.state.selectedDate }
        handleDateSelect={ this.handleDateSelect }
        { ...dateRangeProps }
      />
    );
  }

  render() {
    const { minDate, maxDate, ...inputProps } = this.props;
    let events = {};
    delete inputProps.autoFocus;

    if (!inputProps.validations) inputProps.validations = [];

    inputProps.validations = inputProps.validations.concat(...inputProps.internalValidations);

    events = {
      onBlur: this.handleBlur,
      onChange: this.handleVisibleInputChange,
      onFocus: this.handleFocus,
      onKeyDown: this.handleTabKeyDown
    };

    return (
      <StyledDateInput
        onClick={ stopClickPropagation }
        role='presentation'
      >
        <Textbox
          { ...inputProps }
          inputIcon='calendar'
          value={ this.state.visibleValue }
          inputRef={ this.assignInput }
          { ...tagComponent('date', this.props) }
          { ...events }
        />
        {this.renderDatePicker({ minDate, maxDate }) }
      </StyledDateInput>
    );
  }
}

function formatDateToCurrentLocale(value) {
  const visibleFormat = I18n.t('date.formats.javascript', { defaultValue: defaultDateFormat }).toUpperCase();

  return DateHelper.formatValue(value || today, visibleFormat);
}

function stopClickPropagation(ev) {
  ev.nativeEvent.stopImmediatePropagation();
}

export { defaultDateFormat };
export default Date;
