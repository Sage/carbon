import React, { useState } from 'react';
import DateRange from 'carbon-react/lib/__experimental__/components/date-range';
import { LogConsumer } from '../log';

const ControlledDateRange = () => {
  const [state, setState] = useState(['23rd apr 12', '23rd apr 13']);
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (e) => {
          setState(e.target.value.map(o => o.rawValue));
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='controlled_date_range'>
              <h1>Controlled DateRange</h1>
              <ul>
                <li>onChange handler should update the log when the value is changed, e.target.value should be an array
                  that contains the &#123; formattedValue, rawValue &#125; the Date input&apos;s
                </li>
                <li>onBlur handler should update the log when the date is blurred
                </li>
                <li>date range has props value, name, id which should be reflected in both events</li>
              </ul>

              <DateRange
                onChange={ onChange }
                onBlur={ onBlur }
                id='controlled_date_range_id'
                name='controlled_date_range_name'
                label='Controlled Date Range'
                value={ state }
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledDateRange;
