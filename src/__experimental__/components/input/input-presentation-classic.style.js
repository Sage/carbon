import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ disabled, hasFocus, theme }) => theme.name === THEMES.classic && css`
  border-color: #ccd6db;
  box-shadow: none;
  min-height: 31px;
  padding-left: 6px;
  padding-right: 6px;

  &:hover {
    border-color: #99adb6;
    z-index: 2;
  }

  ${hasFocus && css`
    && {
      border: 1px solid #255BC7;
      outline: none;
    }
  `}

  ${disabled && css`
    background: #d9e0e4;
    border-color: #d9e0e4 !important;
  `}
`;
