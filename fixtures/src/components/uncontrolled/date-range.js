import React from 'react';
import DateRange from 'carbon-react/lib/__experimental__/components/date-range';
import { LogConsumer } from '../log';

const UncontrolledDateRange = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = e => log(e, { method: 'onChange' });

        const onBlur = e => log(e, { method: 'onBlur' });

        return (
          <React.Fragment>
            <div id='uncontrolled_date_range'>
              <h1>Uncontrolled Date Range</h1>
              <ul>
                <li>onChange handler should update the log when the value is changed, e.target.value should be an array
                  that contains the &#123; formattedValue, rawValue &#125; the Date input&apos;s
                </li>
                <li>onBlur handler should update the log when the date is blurred
                </li>
                <li>date range has props name, id which should be reflected in both events</li>
              </ul>

              <DateRange
                onChange={ onChange }
                onBlur={ onBlur }
                id='uncontrolled_date_range_id'
                name='uncontrolled_date_range_name'
                label='Uncontrolled Date Range'
                defaultValue={ ['2012-04-23', '2013-04-23'] }
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default UncontrolledDateRange;
