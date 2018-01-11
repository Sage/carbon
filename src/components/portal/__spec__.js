import React from 'react';
import { shallow } from 'enzyme';
import Portal from './portal';

describe('Portal', () => {
  let child, wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Portal>
        <p className='child-element' />
      </Portal>
    );
  });
  
});
