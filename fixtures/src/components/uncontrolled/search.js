import React from 'react';
import Search from 'carbon-react/lib/__experimental__/components/Search';
import { LogConsumer } from '../log';

const UncontrolledSearch = () => {
  return (
    <LogConsumer>
      {(log) => {
        const onChange = (e) => {
          console.log(e);
          log(e, { method: 'onChange' });
        };
        const onBlur = e => log(e, { method: 'onBlur' });
        return (
          <React.Fragment>
            <div id='uncontrolled_search'>
              <h1>Uncontrolled Search</h1>
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
                id='uncontrolled_search_id'
                name='uncontrolled_search_name'
                label='uncontrolled Search'
                defaultValue=''
              />
            </div>
          </React.Fragment>
        );
      }}
    </LogConsumer>
  );
};

export default UncontrolledSearch;
