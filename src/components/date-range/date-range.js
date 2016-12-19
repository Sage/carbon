import React, { PropTypes } from 'react';
import I18n from 'i18n-js';
import Date from './../date';
import DateRangeValidator from './../../utils/validations/date-range';
import { assign } from 'lodash';

class DateRange extends React.Component {
  static propTypes = {

    /**
     * Custom callback - receives array of startDate and endDate
     *
     * @property onChange
     * @type {Func}
     */
    onChange: PropTypes.func.isRequired,

    /**
     * An array containing the value of startDate and endDate
     *
     * @property value
     * @type {Array}
     */
    value: PropTypes.array.isRequired,

    /**
     * Optional label for startDate field
     *
     * @property startLabel
     * @type {String}
     */
    startLabel: PropTypes.string,

    /**
     * Optional label for endDate field
     *
     * @property endDate
     * @type {String}
     */
    endLabel: PropTypes.string,

    /**
     * Custom message for startDate field
     *
     * @property startDate
     * @type {String}
     */
    startMessage: PropTypes.string,

    /**
     * Custom message for endDate field
     *
     * @property endDate
     * @type {String}
     */
    endMessage: PropTypes.string,

    /**
     * Display labels inline
     *
     * @property labelsInline
     * @type {Boolean}
     */
    labelsInline: PropTypes.bool,

    /**
     * Props for the child start Date component
     *
     * @property startDateProps
     * @type {Object}
     */
    startDateProps: PropTypes.object,

    /**
     * Props for the child end Date component
     *
     * @property endDateProps
     * @type {Object}
     */
    endDateProps: PropTypes.object
  };

  /**
   * onChange function -triggers validations on both fields and updates opposing field when one changed.
   *
   * @property _onChange
   * @type {func}
   * @param{String} the date field that has changedDate
   * @param{Object} ev the event containing the new date value
   */
  _onChange = (changedDate, ev) => {
    let newValue = ev.target.value;

    if (changedDate === 'startDate') {
      this.props.onChange([newValue, this.endDate]);
      // resets validations on opposing field
      this._endDate._handleContentChange();
    }

    if (changedDate === 'endDate') {
      this.props.onChange([this.startDate, newValue]);
      // resets validations on opposing field
      this._startDate._handleContentChange();
    }

    // Triggers validations on both fields
    this._startDate._handleBlur();
    this._endDate._handleBlur();
  }

  /**
   * The startDate value
   *
   * @method startDate
   * @return {String} the value of the start date
   */
  get startDate() {
    return this.props.value[0];
  }

  /**
   * The endDate value
   *
   * @method endDate
   * @return {String} the value of the end date
   */
  get endDate() {
    return this.props.value[1];
  }

  /**
   * The error message for the start message.
   *
   * @method startMessage
   * @return {String}
   */
  get startMessage() {
    return this.props.startMessage || I18n.t('errors.messages.date_range', { defaultValue: 'Start date must not be later than the end date' });
  }

  /**
   * The error message for the end message.
   *
   * @method endMessage
   * @return {String}
   */
  get endMessage() {
    return this.props.endMessage ||
           I18n.t('errors.messages.date_range', { defaultValue: 'End date cannot be earlier than the start date' });
  }


  /**
   * Handle focus on start date field
   *
   * @method focusStart
   * @return {Void}
   */
  focusStart = () => {
    this._endDate.closeDatePicker();
  }

  /**
   * Handle focus on end date field
   *
   * @method focusEnd
   * @return {Void}
   */
  focusEnd = () => {
    this._startDate.closeDatePicker();
  }

  startDateProps() {
    return assign({}, this.props.startDateProps, {
      className: 'carbon-date-range carbon-date-range__start',
      label: this.props.startLabel,
      labelInline: this.props.labelsInline,
      onChange: this._onChange.bind(null, 'startDate'),
      onFocus: this.focusStart,
      ref: (c) => { this._startDate = c; },
      validations: [
        new DateRangeValidator({
          endDate: this.endDate,
          messageText: this.startMessage
        })
      ],
      value: this.startDate
    });
  }

  endDateProps() {
    return assign({}, this.props.endDateProps, {
      className: 'carbon-date-range',
      label: this.props.endLabel,
      labelInline: this.props.labelsInline,
      onChange: this._onChange.bind(null, 'endDate'),
      onFocus: this.focusEnd,
      ref: (c) => { this._endDate = c; },
      validations: [
        new DateRangeValidator({
          startDate: this.startDate,
          messageText: this.endMessage
        })
      ],
      value: this.endDate
    });
  }

  render () {
    return(
      <div>
        <Date { ...this.startDateProps() }/>
        <Date { ...this.endDateProps() }/>
      </div>
    );
  }
}

export default DateRange;
