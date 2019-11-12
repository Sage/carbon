import React from 'react';
import Switch from 'carbon-react/lib/__experimental__/components/switch';
import { LogConsumer } from '../log';

const UncontrolledRadioButton = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = e => log(e, { method: 'onChange' });
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <h1>Uncontrolled Switch</h1>

            <div id='uncontrolled_switch'>
              <h2>Unchecked</h2>
              <ul>
                <li>onChange handler should update the log when switch is checked or un-checked</li>
                <li>onBlur handler should update the log when the switch is blurred</li>
                <li>switch button has props value, name, id which should be reflected in both events</li>
                <li>pressing space should toggle the switch</li>
              </ul>


              <Switch
                onChange={ onChange }
                onBlur={ onBlur }
                id='uncontrolled_switch_id'
                name='uncontrolled_switch_name'
                label='Uncontrolled Switch'
                value='Uncontrolled Switch Value'
              />
            </div>
            <div id='uncontrolled_switch_checked'>
              <h2>Checked</h2>
              <ul>
                <li>switch should be on by default</li>
              </ul>


              <Switch
                onChange={ onChange }
                onBlur={ onBlur }
                id='uncontrolled_switch_checked_id'
                name='uncontrolled_switch_checked_name'
                label='Uncontrolled Switch Checked'
                value='Uncontrolled Switch Checked Value'
                defaultChecked
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default UncontrolledRadioButton;
