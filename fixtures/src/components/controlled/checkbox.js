import React, { useState } from 'react';
import { Checkbox } from 'carbon-react/lib/__experimental__/components/checkbox';
import { LogConsumer } from '../log';

const ControlledCheckbox = () => {
  const [checked, setState] = useState(false);
  const [checkedExampleTwo, setStateExampleTwo] = useState(true);
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
                <li>each checkbox button has props value, name, id which should be reflected in both events</li>
              </ul>
              <Checkbox
                id='controlled_checkbox_one'
                label='label one'
                onChange={ onChange(setState) }
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
                label='label one'
                onChange={ onChange(setStateExampleTwo) }
                onBlur={ onBlur }
                checked={ checkedExampleTwo }
                name='controlled_checkbox_two'
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default React.memo(ControlledCheckbox, () => false);
