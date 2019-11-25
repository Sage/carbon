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
                  user&quot;s input
                </li>
                <li>onBlur handler should update the log when the picker is blurred
                </li>
                <li>picker has props value, name, id which should be reflected in both events</li>
              </ul>

              <SimpleColorPicker
                onChange={ onChange }
                onBlur={ onBlur }
                name='uncontrolled_color_picker_name'
                legend='Uncontrolled SimpleColorPicker'
              >
                <SimpleColor
                  value='#000000'
                  aria-label='black'
                  defaultChecked
                  id='#000000'
                />
                <SimpleColor
                  value='#ff0102'
                  aria-label='red'
                  id='#ff0102'
                />
                <SimpleColor
                  value='#34ff01'
                  aria-label='green'
                  id='#34ff01'
                />
              </SimpleColorPicker>
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default UncontrolledSimpleColorPicker;
