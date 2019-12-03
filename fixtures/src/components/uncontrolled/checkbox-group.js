import React from 'react';
import { Checkbox, CheckboxGroup } from 'carbon-react/lib/__experimental__/components/checkbox';
import { LogConsumer } from '../log';

const UncontrolledCheckbox = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = e => log(e, { method: 'onChange' });
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <h1>Uncontrolled Checkbox Group</h1>
            <h2>Unchecked</h2>
            <div id='uncontrolled_checkbox_group'>
              <ul>
                <li>onChange handler should update the log when each checkbox is checked</li>
                <li>onBlur handler should update the log when each checkbox is blurred</li>
                <li>each checkbox button has props value, name, id which should be reflected in both events</li>
              </ul>
              <CheckboxGroup
                name='uncontrolled_checkbox_group' label='Uncontrolled Example'
                onChange={ onChange }
                onBlur={ onBlur }
              >
                <Checkbox
                  id='uncontrolled_checkbox_group_one'
                  value='value one'
                  label='label one'
                />
                <Checkbox
                  id='uncontrolled_checkbox_group_two'
                  value='value two'
                  label='label two'
                />
                <Checkbox
                  id='uncontrolled_checkbox_group_three'
                  value='value three'
                  label='label three'
                />
              </CheckboxGroup>
            </div>
            <div id='uncontrolled_checkbox_group_default'>
              <h2>Default Checked</h2>
              <ul>
                <li>value two is checked by default</li>
              </ul>
              <CheckboxGroup
                name='uncontrolled_checkbox_group_default' label='Uncontrolled Example default'
                onChange={ onChange }
                onBlur={ onBlur }
              >
                <Checkbox
                  id='uncontrolled_checkbox_group_default_one'
                  value='value one'
                  label='label one'
                />
                <Checkbox
                  id='uncontrolled_checkbox_group_default_two'
                  value='value two'
                  label='label two'
                  defaultChecked
                />
                <Checkbox
                  id='uncontrolled_checkbox_group_default_three'
                  value='value three'
                  label='label three'
                />
              </CheckboxGroup>
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default UncontrolledCheckbox;
