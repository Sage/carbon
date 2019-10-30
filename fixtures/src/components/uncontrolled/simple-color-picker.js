import React from 'react';
import { SimpleColorPicker, SimpleColor } from 'carbon-react/lib/__experimental__/components/simple-color-picker';
import { LogConsumer } from '../log';

const UncontrolledSimpleColorPicker = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (e) => {
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='uncontrolled_picker'>
              <h1>Uncontrolled SimpleColorPicker</h1>
              <ul>
                <li>onChange handler should update the log when the value is changed, e.target.value should be the
                  users input
                </li>
                <li>onBlur handler should update the log when the picker is blurred
                </li>
                <li>picker has props value, name, id which should be reflected in both events</li>
              </ul>

              <SimpleColorPicker
                onChange={ onChange }
                onBlur={ onBlur }
                id='uncontrolled_picker_id'
                name='uncontrolled_picker_name'
                legend='Controlled SimpleColorPicker'
              >
                <SimpleColor color='transparent' defaultChecked />
                <SimpleColor color='#ff0102' />
                <SimpleColor color='#34ff01' />
              </SimpleColorPicker>
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default React.memo(UncontrolledSimpleColorPicker, () => false);
