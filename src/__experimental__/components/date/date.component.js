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

const isoDateFormat = 'YYYY-MM-DD';
const defaultDateFormat = 'DD/MM/YYYY';
const today = DateHelper.todayFormatted(isoDateFormat);

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
    /** The current date */
    value: PropTypes.string
  };

  static defaultProps = {
    value: today,
    internalValidations: [new DateValidator()]
  };

  isBlurBlocked = false; // stops the blur callback from triggering (closing the list) when we don't want it to

  state = {
    isDatePickerOpen: false,
    selectedDate: null,
    visibleValue: formatVisibleValue(this.props.value)
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

  handleKeyDown = (ev) => {
    if (Events.isTabKey(ev)) {
      this.closeDatePicker();
    }
  };

  openDatePicker = () => {
    this.isBlurBlocked = true;
    document.addEventListener('click', this.closeDatePicker);
    this.updateDatePickerValue(this.state.visibleValue);
    this.setState({ isDatePickerOpen: true });
  };

  closeDatePicker = () => {
    if (!this.state.isDatePickerOpen) return;

    document.removeEventListener('click', this.closeDatePicker);
    this.setState((prevState) => {
      return {
        visibleValue: formatVisibleValue(prevState.selectedDate),
        isDatePickerOpen: false
      };
    });
  };

  handleDateSelect = (selectedDate) => {
    const stringDateIso = DateHelper.formatDateString(selectedDate, isoDateFormat);

    this.isBlurBlocked = true;
    this.closeDatePicker();
    this.updateVisibleValue(selectedDate);
    this.emitOnChangeCallback(stringDateIso);
  };

  updateVisibleValue = (date) => {
    const visibleValue = formatVisibleValue(date);
    this.setState({ visibleValue });
  };

  handleVisibleInputChange = (ev) => {
    const { disabled, readOnly } = this.props;
    const dateWithSlashes = DateHelper.sanitizeDateInput(ev.target.value);
    const isValidDate = DateHelper.isValidDate(dateWithSlashes);
    const isoDateString = DateHelper.formatDateString(dateWithSlashes, isoDateFormat);

    if (disabled || readOnly) return;

    // Updates the hidden value after first formatting to default hidden format
    if (isValidDate) {
      this.updateDatePickerValue(dateWithSlashes);
      this.emitOnChangeCallback(isoDateString);
    }

    this.setState({ visibleValue: ev.target.value });
  };

  updateDatePickerValue = (newValue) => {
    const isoDate = convertToIsoDate(newValue);

    this.setState({ selectedDate: isoDate });
  };

  emitOnChangeCallback = (stringDate) => {
    const changePayload = { target: { value: stringDate } };

    if (this.props.onChange) this.props.onChange(changePayload);
  };

  renderDatePicker = (dateRangeProps) => {
    const datePickerProps = {
      inputElement: this.input && this.input.parentElement,
      selectedDate: this.state.selectedDate,
      handleDateSelect: this.handleDateSelect,
      ...dateRangeProps
    };

    return <DatePicker { ...datePickerProps } />;
  }

  render() {
    const { minDate, maxDate, ...inputProps } = this.props;
    let events = {};
    delete inputProps.autoFocus;

    events = {
      onBlur: this.handleBlur,
      onChange: this.handleVisibleInputChange,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown
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
        {this.state.isDatePickerOpen && this.renderDatePicker({ minDate, maxDate }) }
      </StyledDateInput>
    );
  }
}

function formatVisibleValue(value) {
  // Don't sanitize so it accepts the hidden format (with dash separators)
  return DateHelper.formatValue(value || today, getVisibleFormat(), {
    formats: isoDateFormat,
    sanitize: false
  });
}

function getVisibleFormat() {
  return I18n.t('date.formats.javascript', { defaultValue: defaultDateFormat }).toUpperCase();
}

function stopClickPropagation(ev) {
  ev.nativeEvent.stopImmediatePropagation();
}

function convertToIsoDate(dateString) {
  const isoFormattedValue = DateHelper.formatValue(dateString, isoDateFormat);
  const isoDate = DateHelper.stringToDate(isoFormattedValue);

  return isoDate;
}

export default Date;
