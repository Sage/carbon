import React, { PropTypes } from 'react';
import I18n from 'i18n-js';
import Date from './../date';
import DateRangeValidator from './../../utils/validations/date-range';
import DateHelper from  './../../utils/helpers/date';
import { assign } from 'lodash';
import classNames from 'classnames';
import { tagComponent } from '../../utils/helpers/tags';

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
      if (DateHelper.isValidDate(this.endDate)) {
        // resets validations on opposing field. This is a code smell
        this._endDate._handleContentChange();
      }
    }

    if (changedDate === 'endDate') {
      this.props.onChange([this.startDate, newValue]);
      if (DateHelper.isValidDate(this.startDate)) {
        // resets validations on opposing field. This is a code smell
        this._startDate._handleContentChange();
      }
    }

    // Triggers validations on both fields
    if (DateHelper.isValidDate(newValue)) {
      this._startDate._handleBlur();
      this._endDate._handleBlur();
    }
  }

  /**
   * The startDate value
   *
   * @method startDate
   * @return {String} the value of the start date
   */
  get startDate() {
    return this.props.startDateProps && this.props.startDateProps.value ?
      this.props.startDateProps.value :
      this.props.value[0];
  }

  /**
   * The endDate value
   *
   * @method endDate
   * @return {String} the value of the end date
   */
  get endDate() {
    return this.props.endDateProps && this.props.endDateProps.value ?
      this.props.endDateProps.value :
      this.props.value[1];
  }

  /**
   * The error message for the start message.
   *
   * @method startMessage
   * @return {String}
   */
  get startMessage() {
    return this.props.startMessage ||
      I18n.t('errors.messages.date_range', { defaultValue: 'Start date must not be later than the end date' });
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

  /**
   * The startDate props
   *
   * @method startDateProps
   * @return {Object} the props that are applied to the child start Date component
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
   *
   * @method endDateProps
   * @return {Object} the props that are applied to the child end Date component
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
   *
   * @method dateProps
   * @return {Object} the props that are applied to the child Date components
   */
  dateProps(propsKey, defaultValidations) {
    let props = assign({}, {
      label: this.props[`${ propsKey }Label`],
      labelInline: this.props.labelsInline,
      onChange: this._onChange.bind(null, `${ propsKey }Date`),
      onFocus: this.focusEnd,
      ref: (c) => { this[`_${ propsKey }Date`] = c; },
      value: this[`${ propsKey }Date`]
    }, this.props[`${ propsKey }DateProps`]);

    props.className = classNames(
      'carbon-date-range',
      `carbon-date-range__${ propsKey }`,
      (this.props[`${ propsKey }DateProps`] || {}).className : null
    );

    props.validations = defaultValidations.concat(
      (this.props[`${ propsKey }DateProps`] || {}).validations || []
    );
    return props;
  }

  render () {
    return(
      <div { ...tagComponent('date-range', this.props) }>
        <Date { ...this.startDateProps() } data-element='start-date'/>
        <Date { ...this.endDateProps() } data-element='end-date'/>
      </div>
    );
  }
}

export default DateRange;
