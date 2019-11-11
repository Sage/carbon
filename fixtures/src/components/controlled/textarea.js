import React, { useState } from 'react';
import TextArea from 'carbon-react/lib/__experimental__/components/textarea';
import { LogConsumer } from '../log';

const ControlledTextArea = () => {
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
            <div id='controlled_textarea'>
              <h1>Controlled TextArea</h1>
              <ul>
                <li>onChange handler should update the log when the value is changed, e.target.value should be the
                  users input
                </li>
                <li>onBlur handler should update the log when the textarea is blurred
                </li>
                <li>textarea has props value, name, id which should be reflected in both events</li>
              </ul>

              <TextArea
                onChange={ onChange }
                onBlur={ onBlur }
                id='controlled_textarea_id'
                name='controlled_textarea_name'
                label='Controlled TextArea'
                value={ state }
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledTextArea;
