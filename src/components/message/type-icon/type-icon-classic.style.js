import { css } from 'styled-components';
import classicThemeColors from '../message-classic-theme-colors';
import { isClassic } from '../../../utils/helpers/style-helper';

export default ({ theme, variant, roundedCorners }) => isClassic(theme) && css`
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
