import React, { useState } from 'react';
import Textbox from 'carbon-react/lib/__experimental__/components/textbox';
import { LogConsumer } from '../log';

const ControlledTextbox = () => {
  const [state, setState] = useState('Hello World');
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (e) => {
          setState(e.target.value);
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='controlled_textbox'>
              <h1>Controlled Textbox</h1>
              <ul>
                <li>onChange handler should update the log when the value is changed, e.target.value should be the
                  users input
                </li>
                <li>onBlur handler should update the log when the textbox is blurred
                </li>
                <li>textbox has props value, name, id which should be reflected in both events</li>
              </ul>

              <Textbox
                onChange={ onChange }
                onBlur={ onBlur }
                id='controlled_textbox_id'
                name='controlled_textbox_name'
                label='Controlled Textbox'
                value={ state }
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledTextbox;
