import React, { useState } from 'react';
import Decimal from 'carbon-react/lib/__experimental__/components/decimal';
import Button from 'carbon-react/lib/components/button';
import { LogConsumer } from '../log';

const UncontrolledDecimal = () => {
  const [precision, setPrecision] = useState(2);
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
              </ul>

              <Decimal
                onChange={ onChange }
                onBlur={ onBlur }
                id='uncontrolled_zero_id'
                name='uncontrolled_zero_name'
                label='Zero'
              />

              <Decimal
                onChange={ onChange }
                onBlur={ onBlur }
                id='uncontrolled_blank_empty_id'
                name='uncontrolled_blank_empty_name'
                label='Blank (allow empty value)'
                allowEmptyValue
              />
              <Decimal
                onChange={ onChange }
                onBlur={ onBlur }
                id='uncontrolled_default_id'
                name='uncontrolled_default_name'
                label='Default Value'
                defaultValue='12345.76'
              />

              <Decimal
                onChange={ onChange }
                onBlur={ onBlur }
                id='uncontrolled_default_empty_id'
                name='uncontrolled_default_empty_name'
                label='Default Value (allow empty value)'
                defaultValue='12345.76'
                allowEmptyValue
              />
              <Decimal
                onChange={ onChange }
                onBlur={ onBlur }
                id='uncontrolled_precision_id'
                name='uncontrolled_precision_name'
                label={ `Variable precision (${precision})` }
                precision={ precision }
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

export default UncontrolledDecimal;
