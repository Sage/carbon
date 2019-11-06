import React from 'react';
import Date from 'carbon-react/lib/__experimental__/components/date';
import { LogConsumer } from '../log';

const UncontrolledDate = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = e => log(e, { method: 'onChange' });

        const onBlur = e => log(e, { method: 'onBlur' });

        return (
          <React.Fragment>
            <div id='uncontrolled_date'>
              <h1>Uncontrolled Date</h1>
              <ul>
                <li>onChange handler should update the log when the value is changed, e.target.value should contain
                 &#123; formattedValue, rawValue &#125; based on the user&apos;s input
                </li>
                <li>onBlur handler should update the log when the date is blurred
                </li>
                <li>date has props value, name, id which should be reflected in both events</li>
              </ul>

              <Date
                onChange={ onChange }
                onBlur={ onBlur }
                id='uncontrolled_date_id'
                name='uncontrolled_date_name'
                label='Uncontrolled Date'
                defaultValue='23rd apr 12'
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default UncontrolledDate;
