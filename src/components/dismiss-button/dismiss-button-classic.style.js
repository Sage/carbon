import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const colors = {
  error: '#c7384f',
  warning: '#ff7d00',
  success: '#50b848',
  info: '#1573e6',
  default: '#335c6d',
  help: '#ffab00',
  maintenance: '#ff7d00',
  new: '#639'
};

export default ({ theme, variant }) => theme.name === THEMES.classic && css`
  .icon-close {
    &:before {
      color: ${colors[variant]};
    }
  }

  ${({ transparent }) => transparent && css`
    background-color: transparent;
  `}
`;
