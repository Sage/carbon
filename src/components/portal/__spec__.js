import React from 'react';
import { mount, shallow } from 'enzyme';
import Portal from './portal';
import Browser from '../../utils/helpers/browser';

describe('Portal', () => {
  let wrapper;
  describe('when using default node', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Portal>
          <p className='child-element' />
        </Portal>
      );
    });

    it('will unmount correctly', () => {
      wrapper.unmount();
      expect(document.body.innerHTML).toEqual('');
    });

    it('remount second portal', () => {
      wrapper.unmount();
      const wrapper2 = shallow(
        <Portal>
          <p className='child-element' />
        </Portal>
      );
      wrapper2.unmount();
      expect(document.body.innerHTML).toEqual('');
    });

    it('to match snapshot ', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('if Dom is not present', () => {
    beforeEach(() => {
      window.document.createElement = null;

      wrapper = shallow(
        <Portal>
          <p className='child-element' />
        </Portal>
      );
    });

    it('will not mount if node DOM found ', () => {
      expect(wrapper.html()).toBe(null);
    });
  });
});
