import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ disabled, hasFocus, theme }) => theme.name === THEMES.classic && css`
  border-color: ${theme.colors.border};
  box-shadow: none;
  min-height: 31px;
  padding-left: 6px;
  padding-right: 6px;

  &:hover {
    border-color: ${theme.colors.borderHover};
    z-index: 2;
  }

  ${hasFocus && css`
    && {
      border: 1px solid ${theme.colors.borderFocus};
      outline: none;
    }
  `}

  ${disabled && css`
    background: #d9e0e4;
    border-color: #d9e0e4 !important;
  `}
`;
