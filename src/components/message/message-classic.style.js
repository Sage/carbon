import { css } from 'styled-components';
import { THEMES } from '../../style/themes';
import classicThemeColors from './message-classic-theme-colors';

export default ({ theme, messageType }) => theme.name === THEMES.classic && css`
  border: 1px solid ${classicThemeColors[messageType].borderColor};
  background-color: ${classicThemeColors[messageType].backgroundColor};
  border-radius: ${({ roundedCorners, border }) => (roundedCorners && border ? '3px;' : '0px;')};

  ${({ border }) => !border && css`
    border: none;
  `}

  ${({ transparent }) => transparent && css`
    border: none;
    background-color: ${classicThemeColors.transparent.backgroundColor};
  `}
`;
