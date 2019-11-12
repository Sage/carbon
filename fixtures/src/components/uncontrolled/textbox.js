import React from 'react';
import Textbox from 'carbon-react/lib/__experimental__/components/textbox';
import { LogConsumer } from '../log';

const UncontrolledTextbox = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = e => log(e, { method: 'onChange' });
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='uncontrolled_textbox'>
              <h1>Uncontrolled Textbox</h1>
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
                id='uncontrolled_textbox_id'
                name='uncontrolled_textbox_name'
                label='Uncontrolled Textbox'
                defaultValue='Hello World'
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default UncontrolledTextbox;
