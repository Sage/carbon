import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { css } from 'styled-components';
import { assertStyleMatch, carbonThemesJestTable } from '../../../__spec_helper__/test-utils';
import StyledLoader from '../../../components/loader/loader.style';
import StyledLoaderSquare from '../../../components/loader/loader-square.style';
import SwitchSliderPanel from './switch-slider-panel.style';
import StyledIcon from '../../../components/icon/icon.style';
import { baseTheme, classicTheme } from '../../../style/themes';

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
          render({ isLoading: true }).toJSON(),
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
          render({ isLoading: true }).toJSON(),
          { modifier: css`${`${StyledLoader} ${StyledLoaderSquare}`}` }
        );
      });
    });
  });

  describe('Classic theme', () => {
    describe('default', () => {
      it('sets the correct styles', () => {
        const wrapper = render({ isLoading: false, theme: classicTheme }).toJSON();

        assertStyleMatch({
          color: baseTheme.colors.white,
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
          render({ isLoading: true, theme: classicTheme }).toJSON(),
          { modifier: css`${`${StyledLoader} ${StyledLoaderSquare}`}` }
        );
      });
    });

    describe('Icon', () => {
      it('applies the expected style', () => {
        assertStyleMatch(
          {
            color: baseTheme.colors.white
          },
          render({ isLoading: true, theme: classicTheme }).toJSON(),
          { modifier: css`${StyledIcon}` }
        );
      });
    });
  });

  describe.each(carbonThemesJestTable)('when the theme is set to %s', (themeName, theme) => {
    const wrapper = render({ theme }).toJSON();

    it('applies the correct base styles', () => {
      assertStyleMatch({
        color: theme.colors.white
      }, wrapper);
    });

    it('applies the correct off panel styles', () => {
      assertStyleMatch({
        color: theme.text.color
      }, wrapper, { modifier: "[type='off']" });
    });
  });
});
