import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import { assign } from 'lodash';
import DateInput from '../date';
import DateRangeValidator from '../../../utils/validations/date-range';
import tagComponent from '../../../utils/helpers/tags';
import StyledDateRange from './date-range.style';
import DateHelper from '../../../utils/helpers/date';

class DateRange extends React.Component {
  today = DateHelper.todayFormatted('YYYY-MM-DD');

  isControlled = this.props.value !== undefined;

  startDateInputRef = React.createRef();

  endDateInputRef = React.createRef();

  isBlurBlocked = true;

  state = {
    forceUpdateTriggerToggle: false,
    startDateValue: {
      formattedValue: DateHelper.formatDateToCurrentLocale(this.startDate),
      rawValue: DateHelper.formatValue(this.startDate || this.today)
    },
    endDateValue: {
      formattedValue: DateHelper.formatDateToCurrentLocale(this.endDate),
      rawValue: DateHelper.formatValue(this.endDate || this.today)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.hasUpdated(prevProps)) {
      this.updateValues(this.props.value);
    }
  }

  hasUpdated(prevProps) {
    return (
      this.isControlled && (this.props.value[0] !== prevProps.value[0] || this.props.value[1] !== prevProps.value[1])
    );
  }

  updateValues() {
    this.setState({
      startDateValue: {
        formattedValue: DateHelper.formatDateToCurrentLocale(this.startDate),
        rawValue: DateHelper.formatValue(this.startDate || this.today)
      },
      endDateValue: {
        formattedValue: DateHelper.formatDateToCurrentLocale(this.endDate),
        rawValue: DateHelper.formatValue(this.endDate || this.today)
      }
    });
  }

  /** onChange function -triggers validations on both fields and updates opposing field when one changed. */
  _onChange = (changedDate, ev) => {
    this.setState({ [`${changedDate}Value`]: { ...ev.target.value } },
      () => {
        if (this.props.onChange) {
          const event = this.buildCustomEvent();
          this.props.onChange(event);
        }
      });

    this.setState(prevState => ({
      forceUpdateTriggerToggle: !prevState.forceUpdateTriggerToggle
    }), this.blockBlur());
  }

  _onBlur = () => {
    if (this.isBlurBlocked()) {
      return;
    }

    if (this.props.onBlur) {
      const event = this.buildCustomEvent();
      this.props.onBlur(event);
    }
  }

  isBlurBlocked = () => {
    const startBlocked = (
      this.startDateInputRef.current.isBlurBlocked || this.startDateInputRef.current.inputFocusedViaPicker
    );
    const endBlocked = (
      this.endDateInputRef.current.isBlurBlocked || this.endDateInputRef.current.inputFocusedViaPicker
    );
    return startBlocked || endBlocked;
  }

  buildCustomEvent = () => {
    const { startDateValue, endDateValue } = this.state;
    const { name, id } = this.props;

    return {
      target: {
        ...(name && { name }),
        ...(id && { id }),
        value: [startDateValue, endDateValue]
      }
    };
  }

  /** The startDate value */
  get startDate() {
    const value = this.isControlled ? this.props.value : this.props.defaultValue;

    if (this.props.startDateProps && this.props.startDateProps.value) {
      return this.props.startDateProps.value;
    }

    return value ? value[0] : undefined;
  }

  /** The endDate value */
  get endDate() {
    const value = this.isControlled ? this.props.value : this.props.defaultValue;

    if (this.props.endDateProps && this.props.endDateProps.value) {
      return this.props.endDateProps.value;
    }
    return value ? value[1] : undefined;
  }

  /** The error message for the start message. */
  get startMessage() {
    return this.props.startMessage
      || I18n.t('errors.messages.date_range', { defaultValue: 'Start date must not be later than the end date' });
  }

  /** The error message for the end message. */
  get endMessage() {
    return this.props.endMessage
     || I18n.t('errors.messages.date_range', { defaultValue: 'End date cannot be earlier than the start date' });
  }

  /** Handle focus on start date field */
  focusStart = () => {
    this.blockBlur('start');
    this.endDateInputRef.current.closeDatePicker();
  }

  /** Handle focus on end date field */
  focusEnd = () => {
    this.blockBlur('end');
    this.startDateInputRef.current.closeDatePicker();
  }

  blockBlur = (id) => {
    if (id === 'start') {
      this.startDateInputRef.current.isBlurBlocked = true;
      this.startDateInputRef.current.inputFocusedViaPicker = true;
    } else if (id === 'end') {
      this.endDateInputRef.current.isBlurBlocked = true;
      this.endDateInputRef.current.inputFocusedViaPicker = true;
    }
  }

  startDateProps() {
    return this.dateProps('start', [
      new DateRangeValidator({
        endDate: this.state.endDateValue.rawValue,
        messageText: this.startMessage
      })
    ]);
  }

  endDateProps() {
    return this.dateProps('end', [
      new DateRangeValidator({
        startDate: this.state.startDateValue.rawValue,
        messageText: this.endMessage
      })
    ]);
  }

  dateProps(propsKey, defaultValidations) {
    const dateProps = this.props[`${propsKey}DateProps`] || {};

    const props = assign({}, {
      label: this.props[`${propsKey}Label`],
      labelInline: this.props.labelsInline,
      onChange: this._onChange.bind(null, `${propsKey}Date`),
      onBlur: this._onBlur.bind(null),
      value: this.state[`${propsKey}DateValue`].rawValue
    }, dateProps);

    props.className = dateProps.className;
    props.forceUpdateTriggerToggle = this.state.forceUpdateTriggerToggle;
    props.validations = defaultValidations.concat(dateProps.validations || []);

    return props;
  }

  render () {
    return (
      <StyledDateRange { ...tagComponent('date-range', this.props) } labelsInline={ this.props.labelsInline }>
        <DateInput
          { ...this.startDateProps() } onFocus={ this.focusStart }
          data-element='start-date'
          ref={ this.startDateInputRef }
          isDateRange
        />
        <DateInput
          { ...this.endDateProps() } onFocus={ this.focusEnd }
          data-element='end-date'
          ref={ this.endDateInputRef }
          isDateRange
        />
      </StyledDateRange>
    );
  }
}

DateRange.propTypes = {
  /**
   * Optional label for endDate field
   * eslint is disabled because the prop is used to determine the label in the dateProps function
   */
  endLabel: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  /** Custom callback - receives array of startDate and endDate */
  onChange: PropTypes.func,
  /** Custom callback - receives array of startDate and endDate */
  onBlur: PropTypes.func,
  /** An array containing the value of startDate and endDate */
  value: PropTypes.arrayOf(PropTypes.string),
  /* The default value of the input if it's meant to be used as an uncontrolled component */
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  /**
   * Optional label for startDate field
   * eslint is disabled because the prop is used to determine the label in the dateProps function
   */
  startLabel: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  /** Custom message for startDate field */
  startMessage: PropTypes.string,
  /** Custom message for endDate field */
  endMessage: PropTypes.string,
  /** Display labels inline */
  labelsInline: PropTypes.bool,
  /** Props for the child start Date component */
  startDateProps: PropTypes.shape({ ...DateInput.propTypes, value: PropTypes.string }),
  /** Props for the child end Date component */
  endDateProps: PropTypes.shape({ ...DateInput.propTypes, value: PropTypes.string }),
  /** An optional string prop to provide a name to the component */
  name: PropTypes.string,
  /** An optional string prop to provide an id to the component */
  id: PropTypes.string
};

export default DateRange;
