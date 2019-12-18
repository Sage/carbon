import React, { useState } from 'react';
import Decimal from 'carbon-react/lib/__experimental__/components/decimal';
import Button from 'carbon-react/lib/components/button';
import { LogConsumer } from '../log';

const ControlledDecimal = () => {
  const [precision, setPrecision] = useState(2);
  const [zero, setZero] = useState('0.00');
  const [blank, setBlank] = useState('');
  const [value, setValue] = useState('123');
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (updater = setValue) => (e) => {
          updater(e.target.value.rawValue);
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='controlled_decimal'>
              <h1>Controlled Decimal</h1>
              <ul>
                <li>The user should be prevented from entering anything that is invalid</li>
                <li>The user cursor should never move unless it is moved by the user</li>
                <li>There is a hidden value that has the name and the unformatted value</li>
                <li>onChange handler should update the log when the value is changed, e.target.value should be an object
                  that contains &#123; formattedValue, rawValue &#125;
                </li>
                <li>onBlur handler should update the log when the decimal is blurred, e.target.value should be an object
                  that contains &#123; formattedValue, rawValue &#125;
                </li>
                <li>decimal has props name, id which should be reflected in both events</li>
                <li>Lang: EN uses period as separator and comma as delimiter </li>
                <li>Lang: FR uses comma as separator and period as delimiter </li>
                <li>Lang: CH uses period as separator and apostrophe as delimiter </li>
                <li>Inputs 3,4,5 are using the same state, they should each update this shows that they can be
                  controlled programmatically
                </li>
              </ul>

              <Decimal
                onBlur={ onBlur }
                id='controlled_zero_id'
                name='controlled_zero_name'
                label='Zero'
                value={ zero }
                onChange={ onChange(setZero) }
              />

              <Decimal
                onBlur={ onBlur }
                id='controlled_blank_empty_id'
                name='controlled_blank_empty_name'
                label='Blank (allow empty value)'
                allowEmptyValue
                value={ blank }
                onChange={ onChange(setBlank) }
              />
              <Decimal
                onBlur={ onBlur }
                id='controlled_standard_id'
                name='controlled_standard_name'
                label='Standard'
                value={ value }
                onChange={ onChange() }
              />

              <Decimal
                onBlur={ onBlur }
                id='controlled_standard_empty_id'
                name='controlled_standard_empty_name'
                label='Standard (allow empty value)'
                value={ value }
                onChange={ onChange() }
                allowEmptyValue
              />
              <Decimal
                onBlur={ onBlur }
                id='controlled_precision_id'
                name='controlled_precision_name'
                label={ `Variable precision (${precision})` }
                precision={ precision }
                value={ value }
                onChange={ onChange() }
              />

              <Button onClick={ () => setPrecision(precision + 1) }>Precision +</Button>
              <Button onClick={ () => setPrecision(precision - 1) }>Precision -</Button>
              <p>Note that you can exceed the precision limits which will throw an invariant error in the console</p>
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledDecimal;
