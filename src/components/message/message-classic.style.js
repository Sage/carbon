import { css } from 'styled-components';
import classicThemeColors from './message-classic-theme-colors';
import { isClassic } from '../../utils/helpers/style-helper';

export default ({ theme, variant }) => isClassic(theme) && css`
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
