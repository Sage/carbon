import { css } from 'styled-components';
import { THEMES } from '../../style/themes';
import classicThemeColors from './message-classic-theme-colors';

export default ({ theme, variant }) => theme.name === THEMES.classic && css`
  border: none;
  background-color: ${classicThemeColors[variant].backgroundColor};
  border-radius: ${({ roundedCorners, border }) => (roundedCorners && border ? '3px;' : '0px;')};

  ${({ border }) => border && css`
    border: 1px solid ${classicThemeColors[variant].borderColor};
  `}

  ${({ transparent }) => transparent && css`
    border: none;
    background-color: ${classicThemeColors.transparent.backgroundColor};
  `}
`;
