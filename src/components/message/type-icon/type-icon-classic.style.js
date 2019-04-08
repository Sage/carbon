import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import classicThemeColors from '../message-classic-theme-colors';

export default ({ theme, messageType, roundedCorners }) => theme.name === THEMES.classic && css`
  border-radius: ${roundedCorners ? '3px 0 0 3px' : '0px'};
  background-color: ${classicThemeColors[messageType].main};

  ${({ transparent }) => transparent && css`
    span {
      &:before {
        color: ${classicThemeColors[messageType].main};
      }
    }
  `}
`;
