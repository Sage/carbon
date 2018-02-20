import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import Text from './text';

describe('Text', () => {
  let wrapper;
  let children="This is some text";
  describe('when using default node', () => {  
    beforeEach(() => {
      wrapper = mount(
        <Text>
          {children}
        </Text>
      );
    });

    it('will mount correctly on document', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should NOT be preloading', () => {
      expect(wrapper.find('.carbon-text--preloading').length).toBe(0);
    });
  });

  describe('when invisible', () => {
    beforeEach(() => {
      wrapper = mount(
        <Text isVisible={ false }>
          {children}
        </Text>
      );
    });

    it('will mount correctly on document', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('will not render children', () => {
      expect(wrapper.html()).toBe(null);
    });
  });

  describe('when preloading', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <Text preloading>
          {children}
        </Text>
      );
    });

    it('will mount correctly on document', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should be preloading', () => {
      expect(wrapper.find('.carbon-text--preloading').length).toBe(1);
    });
  });
});
