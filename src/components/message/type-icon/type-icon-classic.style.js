import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({
  theme, transparent, messageType, roundedCorners
}) => theme.name === THEMES.classic
  && css`
    border-radius: ${roundedCorners ? '3px 0 0 3px' : '0px'};
    background-color: ${transparent ? theme.colors.white : theme.colors[messageType][0]};
    span {
      &:before {
        color: ${transparent ? theme.colors[messageType][0] : theme.colors.white};
      }
    }
  `;
