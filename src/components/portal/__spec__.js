import React from 'react';
import { shallow } from 'enzyme';
import { Portal as ReactPortal } from 'react-portal';
import Portal from './portal';

describe('Portal', () => {
  let child, wrapper, reactPortal;

  describe('when open', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Portal open>
          <p className='child-element'></p>
        </Portal>
      );
    });

    it('renders an instance of ReactPortal', () => {
      reactPortal = wrapper.find(ReactPortal);
      expect(reactPortal.length).toEqual(1);
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

    it('does NOT render a ReactPortal element', () => {
      reactPortal = wrapper.find(ReactPortal);
      expect(reactPortal.length).toEqual(0);
    });
  });
});
