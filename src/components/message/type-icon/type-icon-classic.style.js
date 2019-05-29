import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import classicThemeColors from '../message-classic-theme-colors';

export default ({ theme, variant, roundedCorners }) => theme.name === THEMES.classic && css`
  border-radius: ${roundedCorners ? '3px 0 0 3px' : '0px'};
  background-color: ${classicThemeColors[variant].main};

  ${({ transparent }) => transparent && css`
    background-color: ${classicThemeColors.transparent.backgroundColor};
    span {
      &:before {
        color: ${classicThemeColors[variant].main};
      }
    }
  `}
`;
