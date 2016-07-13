import React, { PropTypes } from 'react'
import Date from './../date';
import moment from 'moment';
import DateRangeValidator from 'utils/validations/date-range';
import InputValidation from './../../utils/decorators/input-validation';

class DateRange extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired
  };

  _onChange = (changedDate, ev) => {
    let newValue = ev.target.value;

    if(changedDate === 'startDate') {
      this.props.onChange([newValue, this.props.endDate]);
    } else if (changedDate === 'endDate') {
      this.props.onChange([this.props.startDate, newValue]);
    }

    this[changedDate]._handleBlur();
  }

  render () {
    return(
      <div>
        <Date
          onChange={ this._onChange.bind(null, 'startDate') }
          ref={ (c) => { this.startDate = c } }
          value={ this.props.startDate }
          className='ui-date-range'
          validations={ [ new DateRangeValidator({ endDate: this.props.endDate }) ] }
        />
        <Date
          onChange={ this._onChange.bind(null, 'endDate') }
          ref={ (c) => { this.endDate = c } }
          value={ this.props.endDate }
          className='ui-date-range'
          validations={ [ new DateRangeValidator({ startDate: this.props.startDate }) ] }
        />
      </div>
    );
  }
}

export default DateRange;
