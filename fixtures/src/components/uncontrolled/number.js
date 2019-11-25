import React from 'react';
import Number from 'carbon-react/lib/__experimental__/components/number';
import { LogConsumer } from '../log';

const UncontrolledNumber = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = e => log(e, { method: 'onChange' });
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='uncontrolled_number'>
              <h1>Uncontrolled Number</h1>
              <ul>
                <li>onChange handler should update the log when the value is changed, e.target.value should be the
                  users input
                </li>
                <li>onBlur handler should update the log when the number is blurred
                </li>
                <li>number has props value, name, id which should be reflected in both events</li>
              </ul>

              <Number
                onChange={ onChange }
                onBlur={ onBlur }
                id='uncontrolled_number_id'
                name='uncontrolled_number_name'
                label='Uncontrolled Number'
                defaultValue='123'
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default UncontrolledNumber;
