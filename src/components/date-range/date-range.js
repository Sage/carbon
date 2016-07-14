import React, { PropTypes } from 'react'
import Date from './../date';
import moment from 'moment';
import DateRangeValidator from './../../utils/validations/date-range';
import InputValidation from './../../utils/decorators/input-validation';

class DateRange extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
    startDateLabel: PropTypes.string,
    endDateLabel: PropTypes.string
  };

  _onChange = (changedDate, ev) => {
    let newValue = ev.target.value;

    if(changedDate === 'startDate') {
      this.props.onChange([newValue, this.props.value[1]]);
      this._endDate._handleContentChange();
    } else if (changedDate === 'endDate') {
      this.props.onChange([this.props.value[0], newValue]);
      this._startDate._handleContentChange();
    }
      this._startDate._handleBlur();
      this._endDate._handleBlur();
  }

  render () {
    return(
      <div>
        <Date
          className='ui-date-range'
          label={ this.props.startDateLabel }
          labelInline={ true }
          onChange={ this._onChange.bind(null, 'startDate') }
          ref={ (c) => { this._startDate = c } }
          validations={ [ new DateRangeValidator({ endDate: this.props.value[1], messageText: 'Start date cannot be later than end date' }) ] }
          value={ this.props.value[0] }
        />
        <Date
          className='ui-date-range'
          label={ this.props.endDateLabel }
          labelInline={ true }
          onChange={ this._onChange.bind(null, 'endDate') }
          ref={ (c) => { this._endDate = c } }
          validations={ [ new DateRangeValidator({ startDate: this.props.value[0], messageText: 'End date cannot be before the start date'}) ] }
          value={ this.props.value[1] }
        />
      </div>
    );
  }
}

export default DateRange;
