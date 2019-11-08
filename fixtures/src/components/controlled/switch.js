import React, { useState } from 'react';
import Switch from 'carbon-react/lib/__experimental__/components/switch';
import { LogConsumer } from '../log';

const ControlledSwitch = () => {
  const [state, setState] = useState({
    controlled_switch_name: false,
    controlled_switch_checked_name: true
  });
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (e) => {
          const { name } = e.target;
          setState(prevState => ({
            ...prevState,
            [name]: !prevState[name]
          }));
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });

        return (
          <React.Fragment>
            <h1>Controlled Switch</h1>

            <div id='controlled_switch'>
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
                id='controlled_switch_id'
                name='controlled_switch_name'
                label='Controlled Switch'
                value='Controlled Switch Value'
                checked={ state.controlled_switch_name === true }
              />
            </div>
            <div id='controlled_switch_checked'>
              <h2>Checked</h2>
              <ul>
                <li>switch should be on by default</li>
              </ul>

              <Switch
                onChange={ onChange }
                onBlur={ onBlur }
                id='controlled_switch_checked_id'
                name='controlled_switch_checked_name'
                label='Controlled Switch Checked'
                value='Controlled Switch Checked Value'
                checked={ state.controlled_switch_checked_name === true }
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledSwitch;
