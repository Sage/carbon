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
import withUniqueName from '../../../utils/helpers/with-unique-name';

const defaultDateFormat = 'DD/MM/YYYY';

class BaseDateInput extends React.Component {
  isBlurBlocked = false;

  isOpening = false;

  inputHasFocus = this.props.autoFocus || false;

  isControlled = this.props.value !== undefined;

  adjustedValue = DateHelper.isValidDate(this.props.value) ? this.props.value : DateHelper.todayFormatted();

  initialVisibleValue = this.isControlled ? this.adjustedValue : this.props.defaultValue;

  state = {
    isDatePickerOpen: false,
    /** Date object to pass to the DatePicker */
    selectedDate: DateHelper.stringToDate(this.initialVisibleValue),
    /** Displayed value, format dependent on a region */
    visibleValue: formatDateToCurrentLocale(this.initialVisibleValue)
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.isAutoFocused = true;
      this.input.focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.isControlled && !this.inputHasFocus && this.hasValueChanged(prevProps)) {
      this.updateVisibleValue(this.props.value);
      this.updateSelectedDate(this.props.value);
    } else if (this.isBlurBlocked && this.hasValueChanged(prevProps)) {
      this.isBlurBlocked = false;
      this.handleBlur();
    }
  }

  hasValueChanged = (prevProps) => {
    return this.props.value && prevProps.value !== this.props.value;
  };

  assignInput = (input) => {
    this.input = input.current;
  };

  handleBlur = () => {
    this.inputHasFocus = false;
    const { disabled, readOnly } = this.props;

    if (disabled || readOnly || this.isBlurBlocked) return;

    this.reformatVisibleDate();
  }

  handleFocus = (ev) => {
    this.inputHasFocus = true;
    const { disabled, readOnly } = this.props;

    if (disabled || readOnly) return;

    if (this.isAutoFocused) {
      this.isAutoFocused = false;
    } else {
      this.openDatePicker();
    }

    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }
  };

  handleTabKeyDown = (ev) => {
    if (Events.isTabKey(ev)) {
      this.isOpening = false;
      this.closeDatePicker();
    }
  };

  openDatePicker = () => {
    this.isBlurBlocked = true;
    document.addEventListener('click', this.closeDatePicker);
    this.updateSelectedDate(this.props.value);
    this.setState({ isDatePickerOpen: true });
  };

  reformatVisibleDate = () => {
    const { visibleValue } = this.state;
    if (DateHelper.isValidDate(visibleValue)) {
      this.setState({ visibleValue: formatDateToCurrentLocale(visibleValue) }, () => {
        if (this.props.onBlur) {
          const dateWithSlashes = DateHelper.sanitizeDateInput(visibleValue);
          this.props.onBlur({ target: this.input }, DateHelper.formatValue(dateWithSlashes));
        }
      });
    }
  }

  closeDatePicker = () => {
    if (this.isOpening) {
      this.isOpening = false;
      return;
    }
    document.removeEventListener('click', this.closeDatePicker);
    this.setState({ isDatePickerOpen: false });
  };

  handleDateSelect = (selectedDate) => {
    const stringDateIso = DateHelper.formatDateString(selectedDate);
    this.isBlurBlocked = true;
    this.closeDatePicker();
    this.updateVisibleValue(stringDateIso, true);
  };

  updateVisibleValue = (date, pickerUsed) => {
    const visibleValue = formatDateToCurrentLocale(date);

    this.setState({
      selectedDate: date,
      visibleValue
    }, () => {
      if (pickerUsed) {
        const event = {
          target: this.input
        };
        this.emitOnChangeCallback(event, date);
      }
    });
  };

  handleVisibleInputChange = (ev) => {
    const { disabled, readOnly } = this.props;
    const dateWithSlashes = DateHelper.sanitizeDateInput(ev.target.value);
    const isValidDate = DateHelper.isValidDate(dateWithSlashes);
    let isoDateString;

    if (disabled || readOnly) return;

    this.isBlurBlocked = false;

    if (isValidDate) {
      isoDateString = DateHelper.formatValue(dateWithSlashes);
      this.updateSelectedDate(isoDateString);
      this.emitOnChangeCallback(ev, isoDateString);
    }

    this.setState({ visibleValue: ev.target.value });
  };

  updateSelectedDate = (newValue) => {
    let newDate = DateHelper.stringToDate(newValue);
    const isNewDateInvalid = !newDate.getDate();

    if (isNewDateInvalid) {
      newDate = DateHelper.stringToDate(DateHelper.todayFormatted());
    }

    this.setState({ selectedDate: newDate });
  };

  emitOnChangeCallback = (ev, isoFormattedValue) => {
    if (this.props.onChange) {
      this.props.onChange(ev, isoFormattedValue);
    }
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

  markCurrentDatepicker = () => {
    this.isOpening = true;
  }

  render() {
    const { minDate, maxDate, ...inputProps } = this.props;
    let events = {};
    delete inputProps.autoFocus;
    delete inputProps.defaultValue;
    delete inputProps.value;

    inputProps.validations = concatAllValidations(inputProps);

    events = {
      onBlur: this.handleBlur,
      onChange: this.handleVisibleInputChange,
      onFocus: this.handleFocus,
      onKeyDown: this.handleTabKeyDown
    };

    return (
      <StyledDateInput
        onClick={ this.markCurrentDatepicker }
        role='presentation'
        size={ inputProps.size }
        { ...tagComponent('date', this.props) }
      >
        <Textbox
          { ...inputProps }
          inputIcon='calendar'
          value={ this.state.visibleValue }
          inputRef={ this.assignInput }
          { ...events }
        />
        {this.renderDatePicker({ minDate, maxDate }) }
      </StyledDateInput>
    );
  }
}

function concatAllValidations(props) {
  if (!props.validations) props.validations = [];
  if (typeof props.validations === 'function') props.validations = [props.validations];

  return [...props.validations, ...props.internalValidations];
}

function formatDateToCurrentLocale(value) {
  const visibleFormat = I18n.t('date.formats.javascript', { defaultValue: defaultDateFormat }).toUpperCase();

  return DateHelper.formatValue(value || DateHelper.todayFormatted(), visibleFormat);
}

const DateInput = withUniqueName(BaseDateInput);

BaseDateInput.propTypes = {
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
  /** Name of the input */
  name: PropTypes.string,
  /** The current date YYYY-MM-DD */
  value: PropTypes.string,
  /** Triggers textbox validation when it's boolean value changes */
  forceUpdateTriggerToggle: PropTypes.bool
};

BaseDateInput.defaultProps = {
  internalValidations: [new DateValidator()]
};

export { defaultDateFormat, BaseDateInput };
export default DateInput;
