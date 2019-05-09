import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import SwitchSpinnerDot from './switch-spinner-dot.style';
import baseTheme from '../../../style/themes/base';
import classicTheme from '../../../style/themes/classic';
import smallTheme from '../../../style/themes/small';
import mediumTheme from '../../../style/themes/medium';
import largeTheme from '../../../style/themes/large';

function render(props) {
  return TestRenderer.create(<SwitchSpinnerDot { ...props } />);
}

describe('SwitchSpinnerDot', () => {
  describe('base theme', () => {
    it('renders as expected', () => {
      expect(render()).toMatchSnapshot();
    });

    it('sets the correct color when checked', () => {
      const wrapper = render({ checked: true }).toJSON();

      assertStyleMatch({
        backgroundColor: baseTheme.colors.white
      }, wrapper);
    });
  });

  describe('Classic theme', () => {
    it('sets the correct styles', () => {
      const wrapper = render({ theme: classicTheme }).toJSON();

      assertStyleMatch({
        backgroundColor: classicTheme.colors.white,
        borderRadius: '100%',
        height: '4px',
        width: '4px'
      }, wrapper);
    });
  });

  describe('Small theme', () => {
    describe('default', () => {
      const wrapper = render({ theme: smallTheme }).toJSON();

      it('applies the correct background color', () => {
        assertStyleMatch({
          backgroundColor: smallTheme.colors.slate
        }, wrapper);
      });
    });

    describe('when checked=true', () => {
      const wrapper = render({ checked: true, theme: smallTheme }).toJSON();

      it('applies the correct background color', () => {
        assertStyleMatch({
          backgroundColor: smallTheme.colors.white
        }, wrapper);
      });
    });
  });

  describe('Medium theme', () => {
    describe('default', () => {
      const wrapper = render({ theme: mediumTheme }).toJSON();

      it('applies the correct background color', () => {
        assertStyleMatch({
          backgroundColor: mediumTheme.colors.slate
        }, wrapper);
      });
    });

    describe('when checked=true', () => {
      const wrapper = render({ checked: true, theme: mediumTheme }).toJSON();

      it('applies the correct background color', () => {
        assertStyleMatch({
          backgroundColor: mediumTheme.colors.white
        }, wrapper);
      });
    });
  });

  describe('Large theme', () => {
    describe('default', () => {
      const wrapper = render({ theme: largeTheme }).toJSON();

      it('applies the correct background color', () => {
        assertStyleMatch({
          backgroundColor: largeTheme.colors.slate
        }, wrapper);
      });
    });

    describe('when checked=true', () => {
      const wrapper = render({ checked: true, theme: largeTheme }).toJSON();

      it('applies the correct background color', () => {
        assertStyleMatch({
          backgroundColor: largeTheme.colors.white
        }, wrapper);
      });
    });
  });
});
