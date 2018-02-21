import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import Preview from './preview';
import Detail from './../detail';

describe('Preview', () => {
  let wrapper;
  let children="This is some text";
  describe('when using default node', () => {  
    beforeEach(() => {
      wrapper = mount(
        <Detail icon="analysis">
          <Preview>
            {children}
          </Preview>
        </Detail>
      );
    });

    it('will mount correctly on document', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when has not children', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <Detail icon="analysis">
          <Preview></Preview>
        </Detail>
      );
    });

    it('will mount correctly on document', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should be have placeholder', () => {
      expect(wrapper.find('.carbon-preview--placeholder').length).toBe(1);
    });
  });

  describe('when has loading prop', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <Detail icon="analysis">
          <Preview loading></Preview>
        </Detail>
      );
    });

    it('will mount correctly on document', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should be have placeholder', () => {
      expect(wrapper.find('.carbon-preview--placeholder').length).toBe(1);
    });
  });
});
