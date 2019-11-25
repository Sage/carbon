import React, { useState } from 'react';
import Decimal from 'carbon-react/lib/__experimental__/components/decimal';
import { LogConsumer } from '../log';

const ControlledDecimal = () => {
  const [state, setState] = useState('0.12');
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (e) => {
          setState(e.target.value.rawValue);
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='controlled_decimal'>
              <h1>Controlled Decimal</h1>
              <ul>
                <li>onChange handler should update the log when the value is changed, e.target.value should be an object
                  that contains &#123; formattedValue, rawValue &#125;
                </li>
                <li>onBlur handler should update the log when the decimal is blurred, e.target.value should be the
                  formatted value
                </li>
                <li>decimal has props value, name, id which should be reflected in both events</li>
              </ul>

              <Decimal
                onChange={ onChange }
                onBlur={ onBlur }
                id='controlled_decimal_id'
                name='controlled_decimal_name'
                label='Controlled Decimal'
                value={ state }
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledDecimal;
