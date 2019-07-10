import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { css } from 'styled-components';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import StyledLoader from '../../../components/loader/loader.style';
import StyledLoaderSquare from '../../../components/loader/loader-square.style';
import SwitchSliderPanel from './switch-slider-panel.style';
import baseTheme from '../../../style/themes/base';
import classicTheme from '../../../style/themes/classic';
import smallTheme from '../../../style/themes/small';
import mediumTheme from '../../../style/themes/medium';
import largeTheme from '../../../style/themes/large';

function render(props) {
  return TestRenderer.create(<SwitchSliderPanel { ...props } />);
}

describe('SwitchSliderPanel', () => {
  describe('base theme', () => {
    it('renders as expected', () => {
      expect(render()).toMatchSnapshot();
    });

    describe('when loading === true', () => {
      it('applies the correct Loader styles', () => {
        assertStyleMatch(
          {
            padding: '0 3px 3px 0'
          },
          render({ loading: true }).toJSON(),
          { modifier: css`${StyledLoader}` }
        );
      });

      it('applies the correct LoaderSquare styles', () => {
        assertStyleMatch(
          {
            height: '5px',
            width: '5px',
            marginBottom: '2px',
            marginRight: '2px'
          },
          render({ loading: true }).toJSON(),
          { modifier: css`${`${StyledLoader} ${StyledLoaderSquare}`}` }
        );
      });
    });
  });

  describe('Classic theme', () => {
    describe('default', () => {
      it('sets the correct styles', () => {
        const wrapper = render({ loading: false, theme: classicTheme }).toJSON();

        assertStyleMatch({
          color: classicTheme.colors.white,
          marginRight: '9px'
        }, wrapper, { modifier: "[type='off']" });
      });
    });

    describe('when loading === true', () => {
      it('sets the correct classic LoaderSquare styles', () => {
        assertStyleMatch(
          {
            backgroundColor: baseTheme.colors.white,
            borderRadius: '100%',
            height: '4px',
            width: '4px',
            marginBottom: '0'
          },
          render({ loading: true, theme: classicTheme }).toJSON(),
          { modifier: css`${`${StyledLoader} ${StyledLoaderSquare}`}` }
        );
      });
    });
  });

  describe('Small theme', () => {
    const wrapper = render({ theme: smallTheme }).toJSON();

    it('applies the correct base styles', () => {
      assertStyleMatch({
        color: smallTheme.colors.white
      }, wrapper);
    });

    it('applies the correct off panel styles', () => {
      assertStyleMatch({
        color: smallTheme.text.color
      }, wrapper, { modifier: "[type='off']" });
    });
  });

  describe('Medium theme', () => {
    const wrapper = render({ theme: mediumTheme }).toJSON();

    it('applies the correct base styles', () => {
      assertStyleMatch({
        color: mediumTheme.colors.white
      }, wrapper);
    });

    it('applies the correct off panel styles', () => {
      assertStyleMatch({
        color: mediumTheme.text.color
      }, wrapper, { modifier: "[type='off']" });
    });
  });

  describe('Large theme', () => {
    const wrapper = render({ theme: largeTheme }).toJSON();

    it('applies the correct base styles', () => {
      assertStyleMatch({
        color: largeTheme.colors.white
      }, wrapper);
    });

    it('applies the correct off panel styles', () => {
      assertStyleMatch({
        color: largeTheme.text.color
      }, wrapper, { modifier: "[type='off']" });
    });
  });
});
