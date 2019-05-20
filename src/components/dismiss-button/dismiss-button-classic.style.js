import { css } from 'styled-components';
import { THEMES } from '../../style/themes';
import dismissColors from './dismiss-button-variants';

export default ({ theme, variant }) => theme.name === THEMES.classic && css`
  .icon-close {
    &:before {
      color: ${dismissColors[variant]};
    }
  }

  ${({ transparent }) => transparent && css`
    background-color: transparent;
  `}
`;
