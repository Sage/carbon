import React, { useState } from 'react';
import Number from 'carbon-react/lib/__experimental__/components/number';
import { LogConsumer } from '../log';

const ControlledNumber = () => {
  const [state, setState] = useState('123');
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (e) => {
          setState(e.target.value);
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='controlled_number'>
              <h1>Controlled Number</h1>
              <ul>
                <li>onChange handler should update the log when the value is changed, e.target.value should be the
                  user&quot;s input
                </li>
                <li>onBlur handler should update the log when the number is blurred
                </li>
                <li>number has props value, name, id which should be reflected in both events</li>
              </ul>

              <Number
                onChange={ onChange }
                onBlur={ onBlur }
                id='controlled_number_id'
                name='controlled_number_name'
                label='Controlled Number'
                value={ state }
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledNumber;
