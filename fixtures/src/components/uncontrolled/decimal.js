import React from 'react';
import Decimal from 'carbon-react/lib/__experimental__/components/decimal';
import { LogConsumer } from '../log';

const UncontrolledDecimal = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = e => log(e, { method: 'onChange' });
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='uncontrolled_decimal'>
              <h1>Uncontrolled Decimal</h1>
              <ul>
                <li>onChange handler should update the log when the value is changed, e.target.value should be an array
                  that contains the &#123; formattedValue, rawValue &#125; the Date input&apos;s
                </li>
                <li>onBlur handler should update the log when the decimal is blurred, e.target.value should be the
                  formatted value
                </li>
                <li>decimal has props value, name, id which should be reflected in both events</li>
              </ul>

              <Decimal
                onChange={ onChange }
                onBlur={ onBlur }
                id='uncontrolled_decimal_id'
                name='uncontrolled_decimal_name'
                label='Uncontrolled Decimal'
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default UncontrolledDecimal;
