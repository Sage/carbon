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

    it('div with name portal should be created ', () => {
      expect(wrapper.instance().node.classList[0]).toEqual('portal');
    });

    it('to match snapshot ', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('will unmount correctly', () => {
      expect(wrapper.unmount());
    });
  });

  describe('when using a custom node', () => {
    beforeEach(() => {
      const node = Browser.getDocument().createElement('div');
      node.classList.add('my-node');

      wrapper = mount(
        <Portal node={ node }>
          <p className='child-element' />
        </Portal>
      );
    });

    it('to match snapshot ', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('the node prop has been added to the DOM', () => {
      expect(wrapper.instance().node.classList[0]).toEqual('my-node');
    });

    it('the node prop has been added to the DOM', () => {
      expect(wrapper.instance().node.classList[0]).toEqual('my-node');
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
