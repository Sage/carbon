import React from 'react';
import TextArea from 'carbon-react/lib/__experimental__/components/textarea';
import { LogConsumer } from '../log';

const UncontrolledTextArea = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = e => log(e, { method: 'onChange' });
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='uncontrolled_textarea'>
              <h1>Uncontrolled TextArea</h1>
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
                id='uncontrolled_textarea_id'
                name='uncontrolled_textarea_name'
                label='Uncontrolled TextArea'
                defaultValue='Hello World'
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default UncontrolledTextArea;
