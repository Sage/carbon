import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import classicTheme from '../../../../style/themes/classic';
import CharacterCount from '.';

describe('CharacterCount', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderCharacterCount({ value: '5', limit: '10', isOverLimit: false });
  });

  describe('when rendered', () => {
    it('should render default', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when isOverLimit prop is true', () => {
    it('should be styled for warn over limit', () => {
      wrapper.setProps({ isOverLimit: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when is classic theme', () => {
    beforeEach(() => {
      wrapper.setProps({ theme: classicTheme, isOverLimit: false });
    });

    it('should apply classic styling', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('when isOverLimit prop is true', () => {
      it('should be styled for warn over limit', () => {
        wrapper.setProps({ isOverLimit: true });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});

function renderCharacterCount(props, renderer = mount) {
  return renderer(<CharacterCount { ...props } />);
}
