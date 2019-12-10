import React, { useState } from 'react';
import Date from 'carbon-react/lib/__experimental__/components/date';
import { LogConsumer } from '../log';

const ControlledDate = () => {
  const [state, setState] = useState('');
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (e) => {
          setState(e.target.value.rawValue);
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        const onKeyDown = e => log(e, { method: 'onKeyDown' });

        return (
          <React.Fragment>
            <div id='controlled_date'>
              <h1>Controlled Date</h1>
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
                onKeyDown={ onKeyDown }
                id='controlled_date_id'
                name='controlled_date_name'
                label='Controlled Date'
                value={ state }
              />
              <br />
              <br />
              <br />
              <Date
                onChange={ onChange }
                onBlur={ onBlur }
                onKeyDown={ onKeyDown }
                id='controlled_date_id_empty'
                name='controlled_date_name_empty'
                label='Controlled Date Empty'
                value={ state }
                allowEmptyValue
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledDate;
