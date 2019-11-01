import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { assertStyleMatch } from '../../../../__spec_helper__/test-utils';
import classicTheme from '../../../../style/themes/classic';
import baseTheme from '../../../../style/themes/base';
import CharacterCount from '.';

describe('CharacterCount', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderCharacterCount({ value: '5', limit: '10', isOverLimit: false });
  });

  describe('when rendered', () => {
    it('should render default', () => {
      assertStyleMatch({
        textAlign: 'right',
        fontSize: '12px',
        marginTop: '4px',
        marginBottom: '4px',
        color: baseTheme.disabled.disabled
      }, wrapper);
    });
  });

  describe('when isOverLimit prop is true', () => {
    it('should be styled for warn over limit', () => {
      wrapper.setProps({ isOverLimit: true });
      assertStyleMatch({
        fontWeight: '700',
        color: baseTheme.colors.error
      }, wrapper);
    });
  });

  describe('when is classic theme', () => {
    beforeEach(() => {
      wrapper.setProps({ theme: classicTheme, isOverLimit: false });
    });

    it('should apply classic styling', () => {
      assertStyleMatch({
        textAlign: 'right',
        marginTop: '4px',
        marginBottom: '4px'
      }, wrapper);
    });

    describe('when isOverLimit prop is true', () => {
      it('should be styled for warn over limit', () => {
        wrapper.setProps({ isOverLimit: true });
        assertStyleMatch({
          color: baseTheme.colors.error
        }, wrapper);
      });
    });
  });
});

function renderCharacterCount(props, renderer = mount) {
  return renderer(<CharacterCount { ...props } />);
}
