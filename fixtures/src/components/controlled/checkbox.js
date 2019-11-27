import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from 'carbon-react/lib/__experimental__/components/checkbox';
import { LogConsumer } from '../log';

const ControlledCheckbox = () => {
  const [checked, setChecked] = useState(false);
  const [checkedExampleTwo, setCheckedExampleTwo] = useState(true);
  const [checkedGroupCbOne, setCheckedGroupCbOne] = useState(false);
  const [checkedGroupCbTwo, setCheckedGroupCbTwo] = useState(false);
  const [checkedGroupCbThree, setCheckedGroupCbThree] = useState(false);
  return (
    <LogConsumer>
      {(log) => {
        const onChange = store => (e) => {
          store(e.target.checked);
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <h1>Controlled Checkbox</h1>
            <h2>Unchecked</h2>
            <div id='controlled_checkbox'>
              <ul>
                <li>onChange handler should update the log when each checkbox is checked</li>
                <li>onBlur handler should update the log when each checkbox is blurred</li>
                <li>each checkbox button has props name, id which should be reflected in both events</li>
              </ul>
              <Checkbox
                id='controlled_checkbox_one'
                label='label one'
                onChange={ onChange(setChecked) }
                onBlur={ onBlur }
                checked={ checked }
                name='controlled_checkbox_one'
              />
            </div>
            <div id='controlled_checkbox_default'>
              <h2>Default Checked</h2>
              <ul>
                <li>checked by default</li>
              </ul>
              <Checkbox
                id='controlled_checkbox_two'
                label='label two'
                onChange={ onChange(setCheckedExampleTwo) }
                onBlur={ onBlur }
                checked={ checkedExampleTwo }
                name='controlled_checkbox_two'
              />
            </div>
            <div id='controlled_checkboxes_in_group'>
              <h2>Within A Checkbox Group</h2>
              <ul>
                <li>each checkbox is independently controlled within the group</li>
              </ul>
              <CheckboxGroup
                id='checkbox_group'
                label='Checkbox Group Example'
              >
                <Checkbox
                  id='group_checkbox_one'
                  name='group_checkbox_one'
                  value='value one'
                  label='label one'
                  checked={ checkedGroupCbOne }
                  onChange={ onChange(setCheckedGroupCbOne) }
                  onBlur={ onBlur }
                />
                <Checkbox
                  id='group_checkbox_two'
                  name='group_checkbox_two'
                  value='value two'
                  label='label two'
                  checked={ checkedGroupCbTwo }
                  onChange={ onChange(setCheckedGroupCbTwo) }
                  onBlur={ onBlur }
                />
                <Checkbox
                  id='group_checkbox_three'
                  name='group_checkbox_three'
                  value='value three'
                  label='label three'
                  checked={ checkedGroupCbThree }
                  onChange={ onChange(setCheckedGroupCbThree) }
                  onBlur={ onBlur }
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
