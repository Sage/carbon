import React from 'react';
import { Select, Option } from 'carbon-react/lib/__experimental__/components/select';
import { LogConsumer } from '../log';

const UnControlledMultiSelect = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (e) => {
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });

        return (
          <React.Fragment>
            <div id='uncontrolled_multi_select'>
              <h1>Uncontrolled Select</h1>
              <h2>Unselected</h2>
              <ul>
                <li>onChange handler should update the log when the selection is changed</li>
                <li>onBlur handler should update the log when the selection blurred</li>
                <li>each option has props value, name, id which should be reflected in both events</li>
              </ul>
              <Select
                onChange={ onChange }
                onBlur={ onBlur }
                label='Uncontrolled Example'
                id='uncontrolled_multi_select_id'
                name='uncontrolled_multi_select_name'
                enableMultiSelect
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
            <div id='uncontrolled_multi_select_selected'>
              <h2>Default Selected</h2>
              <ul>
                <li>option &quot;Black&quot; should be selected by default</li>
              </ul>
              <Select
                onChange={ onChange }
                onBlur={ onBlur }
                label='Uncontrolled Example Default Selected'
                defaultValue={ ['2'] }
                id='uncontrolled_multi_select_selected_id'
                name='uncontrolled_multi_select_selected_name'
                enableMultiSelect
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

export default UnControlledMultiSelect;
