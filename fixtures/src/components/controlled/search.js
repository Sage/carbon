import React, { useState } from 'react';
import Search from 'carbon-react/lib/__experimental__/components/Search';
import { LogConsumer } from '../log';

const ControlledSearch = () => {
  const [inputValue, setInputValue] = useState('');
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (e) => {
          setInputValue(e.target.value);
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='controlled_search'>
              <h1>Controlled Search</h1>
              <ul>
                <li>onChange handler should update the log when the value is changed, e.target.value should be the
                  users input
                </li>
                <li>onBlur handler should update the log when the search component is blurred
                </li>
              </ul>

              <Search
                onChange={ onChange }
                onBlur={ onBlur }
                id='controlled_search_id'
                name='controlled_search_name'
                label='Controlled Search'
                value={ inputValue }
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default ControlledSearch;
