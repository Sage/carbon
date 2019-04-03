import React from 'react';
import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import Events from '../../../utils/helpers/events';
import DateHelper from '../../../utils/helpers/date';
import DateValidator from '../../../utils/validations/date';
import { validProps } from '../../../utils/ether';
import tagComponent from '../../../utils/helpers/tags';
import DatePicker from './datePicker.component';
import InputDecoratorBridge from '../input-decorator-bridge';
import StyledDateInput from './date.style';

const isoDateFormat = 'YYYY-MM-DD';
const today = DateHelper.todayFormatted(isoDateFormat);

/**
 * A Date widget.
 *
 * == How to use a Date in a component:
 *
 * In your file
 *
 *   import Date from 'carbon-react/lib/components/Date';
 *
 * To render the Date:
 *
 *   <Date name="myDate" />
 *
 * @class Date
 * @constructor
 * @decorators {Input,InputIcon,InputLabel,InputValidation}
 */
class Date extends React.Component {
  static propTypes = {
    /** Automatically focus on component mount */
    autoFocus: PropTypes.bool,
    /** Disable all user interaction */
    disabled: PropTypes.bool,
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
    /** Display the currently selected value without displaying the input */
    readOnly: PropTypes.bool,
    /** The current date */
    value: PropTypes.string
  };

  static defaultProps = {
    value: today,
    internalValidations: [new DateValidator()]
  };

  // Stores the document - allows us to override it different contexts, such as when running tests.
  _document = document;

  bridge = React.createRef() // this is a reference to the input decorator bridge component

  blurBlocked = false; // stops the blur callback from triggering (closing the list) when we don't want it to

  state = {
    isDatePickerOpen: false,
    selectedDate: null,
    visibleValue: this.formatVisibleValue(this.props.value)
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.blockFocus = true;
      this.input.focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.hasDatePickerValueChanged(prevProps)) {
      this.unblockBlur();
      this.handleBlur(); // TODO validate
    }
  }

  assignInput = (input) => {
    this.input = input.current;
  };

  blockBlur() {
    this.blurBlocked = true;
    this.bridge.current.blockBlur = true; // this is to support the legacy behaviour in the bridge
  }

  unblockBlur() {
    this.blurBlocked = false;
    this.bridge.current.blockBlur = false; // this is to support the legacy behaviour in the bridge
  }

  handleBlur = (ev) => {
    if (this.blurBlocked) return;
    if (this.props.onBlur) this.props.onBlur(ev);
  }

  handleFocus = (ev) => {
    if (this.blockFocus) {
      this.blockFocus = false;
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

  hasDatePickerValueChanged = (prevProps) => {
    return this.blurBlocked && this.props.value && prevProps.value !== this.props.value;
  };

  openDatePicker = () => {
    const isValidDate = DateHelper.isValidDate(this.props.value);

    this.blockBlur();
    this._document.addEventListener('click', this.closeDatePicker);

    if (isValidDate) {
      this.updateDatePickerValue(this.props.value);
    }

    this.setState({ isDatePickerOpen: true });
  };

  closeDatePicker = () => {
    this._document.removeEventListener('click', this.closeDatePicker);
    this.setState((prevState) => {
      return {
        visibleValue: this.formatVisibleValue(prevState.selectedDate),
        isDatePickerOpen: false
      };
    });
  };

  handleDateSelect = (selectedDate, modifiers) => {
    const stringDateIso = DateHelper.formatDateString(selectedDate, isoDateFormat);

    if (modifiers.disabled) return;

    this.blockBlur();
    this.closeDatePicker();
    this.updateVisibleValue(selectedDate);
    this.emitOnChangeCallback(stringDateIso);
  };

  updateVisibleValue = (date) => {
    const formattedDateString = this.formatVisibleValue(date);
    this.setState({ visibleValue: formattedDateString });
  };

  formatVisibleValue(value) {
    // Don't sanitize so it accepts the hidden format (with dash separators)
    return DateHelper.formatValue(value || today, getVisibleFormat(), {
      formats: isoDateFormat,
      sanitize: false
    });
  }

  handleVisibleInputChange = (ev) => {
    const dateWithSlashes = DateHelper.sanitizeDateInput(ev.target.value);
    const isValidDate = DateHelper.isValidDate(dateWithSlashes);
    const isoDateString = DateHelper.formatDateString(dateWithSlashes, isoDateFormat);

    // Updates the hidden value after first formatting to default hidden format
    if (isValidDate) {
      this.updateDatePickerValue(dateWithSlashes);
      this.emitOnChangeCallback(isoDateString);
    }

    this.setState({ visibleValue: ev.target.value });
  };

  updateDatePickerValue = (newValue) => {
    const isoFormattedValue = DateHelper.formatValue(newValue, isoDateFormat);
    const isoDate = DateHelper.stringToDate(isoFormattedValue);

    this.setState({ selectedDate: isoDate });
  };

  emitOnChangeCallback = (stringDate) => {
    this.props.onChange({ target: { value: stringDate } });
  };

  renderDatePicker = (passedProps) => {
    const datePickerProps = {
      inputElement: this.input && this.input.parentElement,
      selectedDate: this.state.selectedDate,
      handleDateSelect: this.handleDateSelect,
      ...passedProps
    };

    return <DatePicker { ...datePickerProps } />;
  }

  render() {
    const isComponentActive = !this.props.disabled && !this.props.readOnly;
    const { ...inputProps } = validProps(this);
    const { minDate, maxDate } = this.props;
    let events = {};

    delete inputProps.autoFocus;
    delete inputProps.internalValidations;

    if (isComponentActive) {
      events = {
        onBlur: this.handleBlur,
        onChange: this.handleVisibleInputChange,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown
      };
    }

    return (
      <StyledDateInput
        onClick={ stopClickPropagation }
        onKeyDown={ this.handleKeyDown }
        role='presentation'
      >
        <InputDecoratorBridge
          inputIcon='calendar'
          value={ this.state.visibleValue }
          inputRef={ this.assignInput }
          ref={ this.bridge }
          { ...this.inputProps }
          { ...tagComponent('date', this.props) }
          { ...events }
        />
        {this.state.isDatePickerOpen && this.renderDatePicker({ minDate, maxDate }) }
      </StyledDateInput>
    );
  }
}

function getVisibleFormat() {
  return I18n.t('date.formats.javascript', { defaultValue: 'DD/MM/YYYY' }).toUpperCase();
}

function stopClickPropagation(ev) {
  ev.nativeEvent.stopImmediatePropagation();
}

export default Date;
