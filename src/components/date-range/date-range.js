import React, { PropTypes } from 'react';
import I18n from 'i18n-js';
import Date from './../date';
import DateRangeValidator from './../../utils/validations/date-range';

class DateRange extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
    startLabel: PropTypes.string,
    endLabel: PropTypes.string,
    startMessage: PropTypes.string,
    endMessage: PropTypes.string
  };

  _onChange = (changedDate, ev) => {
    let newValue = ev.target.value;

    if(changedDate === 'startDate') {
      this.props.onChange([newValue, this.endDate]);
      this._endDate._handleContentChange();
    }

    if (changedDate === 'endDate') {
      this.props.onChange([this.startDate, newValue]);
      this._startDate._handleContentChange();
    }

    this._startDate._handleBlur();
    this._endDate._handleBlur();
  }

  get startDate() {
    return this.props.value[0];
  }

  get endDate() {
    return this.props.value[1];
  }

  get startMessage() {
    return this.props.startMessage || I18n.t('errors.messages.date_range');
  }

  get endMessage() {
    return this.props.endMessage || I18n.t('errors.messages.date_range');
  }

  render () {
    return(
      <div>
        <Date
          className='ui-date-range ui-date-range__start'
          label={ this.props.startLabel }
          labelInline={ true }
          onChange={ this._onChange.bind(null, 'startDate') }
          ref={ (c) => { this._startDate = c; } }
          validations={ [ new DateRangeValidator({
            endDate: this.endDate,
            messageText: this.startMessage
          })] }
          value={ this.startDate }
        />
        <Date
          className='ui-date-range'
          label={ this.props.endLabel }
          labelInline={ true }
          onChange={ this._onChange.bind(null, 'endDate') }
          ref={ (c) => { this._endDate = c; } }
          validations={ [ new DateRangeValidator({
            startDate: this.startDate,
            messageText: this.endMessage
          })] }
          value={ this.endDate }
        />
      </div>
    );
  }
}

export default DateRange;
