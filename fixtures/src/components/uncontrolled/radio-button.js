import React from 'react';
import { RadioButton, RadioButtonGroup } from 'carbon-react/lib/__experimental__/components/radio-button';
import { LogConsumer } from '../log';

const UncontrolledRadioButton = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = e => log(e, { method: 'onChange' });
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <h1>Uncontrolled Radio Button</h1>
            <h2>Unchecked</h2>
            <div id='uncontrolled_radio_button'>
              <ul>
                <li>onChange handler should update the log when each radio is checked</li>
                <li>onBlur handler should update the log when each radio is blurred</li>
                <li>each radio button has props value, name, id which should be reflected in both events</li>
              </ul>
              <RadioButtonGroup
                name='uncontrolled_radio_button' legend='Uncontrolled Example'
                onChange={ onChange }
                onBlur={ onBlur }
              >
                <RadioButton
                  id='uncontrolled_radio_button_one'
                  value='value one'
                  label='label one'
                />
                <RadioButton
                  id='uncontrolled_radio_button_two'
                  value='value two'
                  label='label two'
                />
                <RadioButton
                  id='uncontrolled_radio_button_three'
                  value='value three'
                  label='label three'
                />
              </RadioButtonGroup>
            </div>
            <div id='uncontrolled_radio_button_default'>
              <h2>Default Checked</h2>
              <ul>
                <li>value two is checked by default</li>
              </ul>
              <RadioButtonGroup
                name='uncontrolled_radio_button_default' legend='Uncontrolled Example default'
                onChange={ onChange }
                onBlur={ onBlur }
              >
                <RadioButton
                  id='uncontrolled_radio_button_default_one'
                  value='value one'
                  label='label one'
                />
                <RadioButton
                  id='uncontrolled_radio_button_default_two'
                  value='value two'
                  label='label two'
                  defaultChecked
                />
                <RadioButton
                  id='uncontrolled_radio_button_default_three'
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

export default UncontrolledRadioButton;
