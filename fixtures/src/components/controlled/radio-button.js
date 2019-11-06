import React, { useState } from 'react';
import { RadioButton, RadioButtonGroup } from 'carbon-react/lib/__experimental__/components/radio-button';
import { LogConsumer } from '../log';

const ControlledRadioButton = () => {
  const [checkedValue, setCheckedValue] = useState();
  const [checkedValueExampleTwo, setCheckedValueExampleTwo] = useState('value two');
  return (
    <LogConsumer>
      {(log) => {
        const onChange = setter => (e) => {
          log(e, { method: 'onChange' });
          setter(e.target.value);
        };
        const onBlur = e => log(e, { method: 'onBlur' });

        return (
          <React.Fragment>
            <div id='controlled_radio_button'>
              <h1>Controlled Radio Button</h1>
              <h2>Unchecked</h2>
              <ul>
                <li>onChange handler should update the log when each radio is checked</li>
                <li>onBlur handler should update the log when each radio is blurred</li>
                <li>each radio button has props value, name, id which should be reflected in both events</li>
                <li>the onChange handler sets the checked value, then each radio checks this value to see if the checked
                  prop should be truthy
                </li>
              </ul>
              <RadioButtonGroup
                name='controlled_radio_button' legend='Controlled Example'
                onChange={ onChange(setCheckedValue) }
                onBlur={ onBlur }
                value={ checkedValue }
              >
                <RadioButton
                  id='controlled_radio_button_one'
                  value='value one'
                  label='label one'
                />
                <RadioButton
                  id='controlled_radio_button_two'
                  value='value two'
                  label='label two'
                />
                <RadioButton
                  id='controlled_radio_button_three'
                  value='value three'
                  label='label three'
                />
              </RadioButtonGroup>
            </div>
            <div id='controlled_radio_button_checked'>
              <h2>Default Checked</h2>
              <ul>
                <li>value two is checked by default</li>
              </ul>
              <RadioButtonGroup
                name='controlled_radio_button_checked' legend='Controlled Example default'
                onChange={ onChange(setCheckedValueExampleTwo) }
                onBlur={ onBlur }
                value={ checkedValueExampleTwo }
              >
                <RadioButton
                  id='controlled_radio_button_checked_one'
                  value='value one'
                  label='label one'
                />
                <RadioButton
                  id='controlled_radio_button_checked_two'
                  value='value two'
                  label='label two'
                />
                <RadioButton
                  id='controlled_radio_button_checked_three'
                  value='value three'
                  label='label three'
                />
              </RadioButtonGroup>
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledRadioButton;
