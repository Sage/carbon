import React, { useState } from 'react';
import { Select, Option } from 'carbon-react/lib/__experimental__/components/select';
import { LogConsumer } from '../log';

const ControlledSelect = () => {
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValueExampleTwo, setSelectedValueExampleTwo] = useState('2');
  return (
    <LogConsumer>
      {(log) => {
        const onChange = setter => (e) => {
          log(e, { method: 'onChange' });
          setter(e.target.value[0].optionValue);
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        const onKeyDown = e => log(e, { method: 'onKeyDown' });

        return (
          <React.Fragment>
            <div id='controlled_select'>
              <h1>Controlled Select</h1>
              <h2>Unselected</h2>
              <ul>
                <li>onChange handler should update the log when the selection is changed</li>
                <li>onBlur handler should update the log when the selection blurred</li>
                <li>each option has props value, name, id which should be reflected in both events</li>
                <li>the onChange handler sets the selected value</li>
              </ul>
              <Select
                onChange={ onChange(setSelectedValue) }
                onBlur={ onBlur }
                onKeyDown={ onKeyDown }
                label='Controlled Example'
                value={ selectedValue }
                id='controlled_select_id'
                name='controlled_select_name'
              >
                <Option text='Amber' value='1' />
                <Option text='Black' value='2' />
                <Option text='Blue' value='3' />
                <Option text='Brown' value='4' />
                <Option text='Green' value='5' />
                <Option text='Orange' value='6' />
                <Option text='Pink' value='7' />
                <Option text='Purple' value='8' />
                <Option text='Red' value='9' />
                <Option text='White' value='10' />
                <Option text='Yellow' value='11' />
              </Select>
            </div>
            <div id='controlled_select_selected'>
              <h2>Default Selected</h2>
              <ul>
                <li>option &quot;Black&quot; should be selected by default</li>
              </ul>
              <Select
                onChange={ onChange(setSelectedValueExampleTwo) }
                onBlur={ onBlur }
                onKeyDown={ onKeyDown }
                label='Controlled Example Default Selected'
                value={ selectedValueExampleTwo }
                id='controlled_select_selected_id'
                name='controlled_select_selected_name'
              >
                <Option text='Amber' value='1' />
                <Option text='Black' value='2' />
                <Option text='Blue' value='3' />
                <Option text='Brown' value='4' />
                <Option text='Green' value='5' />
                <Option text='Orange' value='6' />
                <Option text='Pink' value='7' />
                <Option text='Purple' value='8' />
                <Option text='Red' value='9' />
                <Option text='White' value='10' />
                <Option text='Yellow' value='11' />
              </Select>
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledSelect;
