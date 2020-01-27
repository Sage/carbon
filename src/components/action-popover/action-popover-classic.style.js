import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';

export const MenuClassic = ({ theme }) => isClassic(theme) && css`
  box-shadow: 0 10px 10px 0 rgba(0, 20, 29, 0.1),
    0 5px 5px 0 rgba(0, 20, 29, 0.2);
  padding: ${theme.spacing}px 0;
`;

export const MenuItemClassic = ({ theme }) => isClassic(theme) && css`
  &:focus {
    outline: none;
    box-shadow: inset 0px 0px 0px 1px #255BC7;
  }

  line-height: 35px;
  padding: 0 15px 0 10px;
`;

export const MenuButtonClassic = ({ theme, isOpen }) => isClassic(theme) && css`
  &:focus {
    outline: 1px solid #255BC7;
  }

  &:hover,
  &:focus {
    > span {
      color: #255BC7;
    }
  }

  > span {
    ${isOpen && 'color: #255BC7'}
  }
`;

export const SubMenuItemIconClassic = ({ theme, type }) => isClassic(theme) && css`
  ${type === 'chevron_left' && css`
    left: -6px;
  `}

  ${type === 'chevron_right' && css`
    right: -6px;
  `}
`;
