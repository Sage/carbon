import React from 'react';
import { mount } from 'enzyme';

import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import Hr from './hr.component';
import StyledHr from './hr.style';

describe('Hr', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Hr />);
  });

  describe('default props', () => {
    it('should apply the correct margins', () => {
      assertStyleMatch({
        marginTop: '24px',
        marginBottom: '24px'
      }, wrapper.find(StyledHr));
    });
  });

  describe('margin props', () => {
    it('should apply the correct top margin', () => {
      wrapper.setProps({ marginTop: 7 });

      assertStyleMatch({
        marginTop: '56px'
      }, wrapper.find(StyledHr));
    });

    it('should apply the correct bottom margin', () => {
      wrapper.setProps({ marginBottom: 7 });

      assertStyleMatch({
        marginBottom: '56px'
      }, wrapper.find(StyledHr));
    });

    it('should apply the correct left margin', () => {
      wrapper.setProps({ marginLeft: '100px' });

      assertStyleMatch({
        marginLeft: '100px'
      }, wrapper.find(StyledHr));
    });

    it('should apply the correct right margin', () => {
      wrapper.setProps({ marginRight: '100px' });

      assertStyleMatch({
        marginRight: '100px'
      }, wrapper.find(StyledHr));
    });
  });
});
