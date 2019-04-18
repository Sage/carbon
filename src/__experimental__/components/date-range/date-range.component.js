import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import { assign } from 'lodash';
import classNames from 'classnames';
import Date from '../date';
import DateRangeValidator from '../../../utils/validations/date-range';
import DateHelper from '../../../utils/helpers/date';
import tagComponent from '../../../utils/helpers/tags';
import StyledDateRange from './date-range.style';

class DateRange extends React.Component {
  static propTypes = {
    /**
     * Optional label for endDate field
     * eslint is disabled because the prop is used to determine the label in the dateProps function
     */
    endLabel: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

    /**
     * Custom callback - receives array of startDate and endDate
     */
    onChange: PropTypes.func.isRequired,

    /**
     * An array containing the value of startDate and endDate
     */
    value: PropTypes.array.isRequired,

    /**
     * Optional label for startDate field
     * eslint is disabled because the prop is used to determine the label in the dateProps function
     */
    startLabel: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

    /**
     * Custom message for startDate field
     */
    startMessage: PropTypes.string,

    /**
     * Custom message for endDate field
     */
    endMessage: PropTypes.string,

    /**
     * Display labels inline
     */
    labelsInline: PropTypes.bool,

    /**
     * Props for the child start Date component
     */
    startDateProps: PropTypes.shape({ ...Date.propTypes, value: PropTypes.string }),

    /**
     * Props for the child end Date component
     */
    endDateProps: PropTypes.shape({ ...Date.propTypes, value: PropTypes.string })
  };

  /**
   * onChange function -triggers validations on both fields and updates opposing field when one changed.
   */
  _onChange = (changedDate, ev) => {
    const newValue = ev.target.value;

    if (changedDate === 'startDate') {
      this.props.onChange([newValue, this.endDate]);
    }

    if (changedDate === 'endDate') {
      this.props.onChange([this.startDate, newValue]);
    }

    // Triggers validations on both fields
    if (DateHelper.isValidDate(newValue)) {
      this._startDate.handleBlur();
      this._endDate.handleBlur();
    }
  }

  /**
   * The startDate value
   */
  get startDate() {
    if (this.props.startDateProps && this.props.startDateProps.value) {
      return this.props.startDateProps.value;
    }
    return this.props.value[0];
  }

  /**
   * The endDate value
   */
  get endDate() {
    if (this.props.endDateProps && this.props.endDateProps.value) {
      return this.props.endDateProps.value;
    }
    return this.props.value[1];
  }

  /**
   * The error message for the start message.
   */
  get startMessage() {
    return this.props.startMessage
      || I18n.t('errors.messages.date_range', { defaultValue: 'Start date must not be later than the end date' });
  }

  /**
   * The error message for the end message.
   */
  get endMessage() {
    return this.props.endMessage
     || I18n.t('errors.messages.date_range', { defaultValue: 'End date cannot be earlier than the start date' });
  }


  /**
   * Handle focus on start date field
   */
  focusStart = () => {
    this._endDate.closeDatePicker();
  }

  /**
   * Handle focus on end date field
   */
  focusEnd = () => {
    this._startDate.closeDatePicker();
  }

  /**
   * The startDate props
   */
  startDateProps() {
    return this.dateProps('start', [
      new DateRangeValidator({
        endDate: this.endDate,
        messageText: this.startMessage
      })
    ]);
  }

  /**
   * The endDate props
   */
  endDateProps() {
    return this.dateProps('end', [
      new DateRangeValidator({
        startDate: this.startDate,
        messageText: this.endMessage
      })
    ]);
  }

  /**
   * The startDate/endDate props
   */
  dateProps(propsKey, defaultValidations) {
    const dateProps = this.props[`${propsKey}DateProps`] || {};

    const props = assign({}, {
      label: this.props[`${propsKey}Label`],
      labelInline: this.props.labelsInline,
      onChange: this._onChange.bind(null, `${propsKey}Date`),
      ref: (c) => { this[`_${propsKey}Date`] = c; },
      value: this[`${propsKey}Date`]
    }, dateProps);

    props.className = classNames(
      dateProps.className
    );

    props.validations = defaultValidations.concat(dateProps.validations || []);
    return props;
  }

  render () {
    return (
      <StyledDateRange { ...tagComponent('date-range', this.props) }>
        <Date
          { ...this.startDateProps() } onFocus={ this.focusStart }
          data-element='start-date'
        />
        <Date
          { ...this.endDateProps() } onFocus={ this.focusEnd }
          data-element='end-date'
        />
      </StyledDateRange>
    );
  }
}

export default DateRange;
