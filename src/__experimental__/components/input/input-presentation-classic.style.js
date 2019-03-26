import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import LabelStyle from '../label/label.style';

export default ({ disabled, hasFocus, theme }) => theme.name === THEMES.classic && css`
  border-color: #ccd6db;
  box-shadow: none;
  min-height: 31px;
  padding-left: 6px;
  padding-right: 6px;

  ${LabelStyle}:hover + &,
  &:hover {
    border-color: #99adb6;
  }

  ${hasFocus && css`
    && {
      border: 1px solid #255bc7;
      outline: none;
    }
  `}

  ${disabled && css`
    background: #d9e0e4;
    border-color: #d9e0e4 !important;
  `}
`;
