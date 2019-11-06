import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from 'carbon-react/lib/__experimental__/components/checkbox';
import { LogConsumer } from '../log';

const ControlledCheckbox = () => {
  const [checked, setChecked] = useState({
    controlled_checkbox_group_one: false,
    controlled_checkbox_group_two: false,
    controlled_checkbox_group_three: false,
    controlled_checkbox_group_default_one: false,
    controlled_checkbox_group_default_two: true,
    controlled_checkbox_group_default_three: false
  });
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (e) => {
          log(e, { method: 'onChange' });
          setChecked({
            ...checked,
            [e.target.name]: e.target.checked
          });
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <h1>Controlled Checkbox Group</h1>
            <h2>Unchecked</h2>
            <div id='controlled_checkbox_group'>
              <ul>
                <li>onChange handler should update the log when each checkbox is changed/toggled</li>
                <li>onBlur handler should update the log when each checkbox is blurred</li>
                <li>each checkbox button has props value, name, id which should be reflected in both events</li>
              </ul>
              <CheckboxGroup
                name='controlled_checkbox_group' label='Controlled Example'
                onChange={ onChange }
                onBlur={ onBlur }
              >
                <Checkbox
                  id='controlled_checkbox_group_one'
                  value='value one'
                  label='label one'
                  name='controlled_checkbox_group_one'
                  checked={ checked.controlled_checkbox_group_one }
                />
                <Checkbox
                  id='controlled_checkbox_group_two'
                  value='value two'
                  label='label two'
                  checked={ checked.controlled_checkbox_group_two }
                />
                <Checkbox
                  id='controlled_checkbox_group_three'
                  value='value three'
                  label='label three'
                  checked={ checked.controlled_checkbox_group_three }
                />
              </CheckboxGroup>
            </div>
            <div id='controlled_checkbox_group_default'>
              <h2>Default Checked</h2>
              <ul>
                <li>value two is checked by default</li>
              </ul>
              <CheckboxGroup
                name='controlled_checkbox_group_default' label='Controlled Example default'
                onChange={ onChange }
                onBlur={ onBlur }
              >
                <Checkbox
                  id='controlled_checkbox_group_default_one'
                  value='value one'
                  label='label one'
                  checked={ checked.controlled_checkbox_group_default_one }
                />
                <Checkbox
                  id='controlled_checkbox_group_default_two'
                  value='value two'
                  label='label two'
                  checked={ checked.controlled_checkbox_group_default_two }
                />
                <Checkbox
                  id='controlled_checkbox_group_default_three'
                  value='value three'
                  label='label three'
                  checked={ checked.controlled_checkbox_group_default_three }
                />
              </CheckboxGroup>
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledCheckbox;
