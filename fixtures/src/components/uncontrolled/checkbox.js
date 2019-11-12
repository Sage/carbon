import React from 'react';
import { Checkbox } from 'carbon-react/lib/__experimental__/components/checkbox';
import { LogConsumer } from '../log';

const UncontrolledCheckbox = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = e => log(e, { method: 'onChange' });
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <h1>Uncontrolled Checkbox</h1>
            <h2>Unchecked</h2>
            <div id='uncontrolled_checkbox'>
              <ul>
                <li>onChange handler should update the log when each checkbox is checked</li>
                <li>onBlur handler should update the log when each checkbox is blurred</li>
                <li>each checkbox button has props value, name, id which should be reflected in both events</li>
              </ul>
              <Checkbox
                id='uncontrolled_checkbox_one'
                value='value one'
                label='label one'
                onChange={ onChange }
                onBlur={ onBlur }
                name='uncontrolled_checkbox_one'
              />
            </div>
            <div id='uncontrolled_checkbox_default'>
              <h2>Default Checked</h2>
              <ul>
                <li>checked by default</li>
              </ul>
              <Checkbox
                id='uncontrolled_checkbox_two'
                value='value two'
                label='label two'
                onChange={ onChange }
                onBlur={ onBlur }
                name='uncontrolled_checkbox_two'
                defaultChecked
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default UncontrolledCheckbox;
