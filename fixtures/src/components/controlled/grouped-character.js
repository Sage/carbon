import React, { useState } from 'react';
import GroupedCharacter from 'carbon-react/lib/__experimental__/components/grouped-character';
import { LogConsumer } from '../log';

const ControlledGroupedCharacter = () => {
  const [state, setState] = useState('123');
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (e) => {
          setState(e.target.value.rawValue);
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='controlled_grouped_character'>
              <h1>Controlled GroupedCharacter</h1>
              <ul>
                <li>onChange handler should update the log when the value is changed, e.target.value should contain
                 &#123; formattedValue, rawValue &#125; based on the user&apos;s input
                </li>
                <li>onBlur handler should update the log when the groupedcharacter is blurred
                </li>
                <li>groupedcharacter has props value, name, id which should be reflected in both events</li>
              </ul>

              <GroupedCharacter
                onChange={ onChange }
                onBlur={ onBlur }
                id='controlled_grouped_character_id'
                name='controlled_grouped_character_name'
                label='Controlled Grouped Character'
                value={ state }
                groups={ [2, 2, 4] }
                separator='-'
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledGroupedCharacter;
