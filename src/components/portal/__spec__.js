import React from 'react';
import { shallow } from 'enzyme';
import Portal from './portal';

describe('Portal', () => {
  let child, wrapper;

  describe('when open', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Portal open>
          <p className='child-element'/>
        </Portal>
      );
    });

    it('renders children props', () => {
      child = wrapper.find('.child-element');
      expect(child.length).toEqual(1);
    });
  });

  describe('when closed', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Portal >
          <p className='child-element'></p>
        </Portal>
      );
    });

    it('renders children props', () => {
      child = wrapper.find('.child-element');
      expect(child.length).toEqual(1);
    });
  });
});
