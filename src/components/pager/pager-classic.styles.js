import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const PagerContainerClassicStyles = ({ theme }) => theme.name === THEMES.classic && css`
  padding: 3px 16px;
  font-size: 14px;
  background-color: #F2F4F5;
  .common-input__input {
    &:active {
      border-color: #265BC7;
    }
    &:hover, :focus {
      border-color: #99adb6;
    }
  }
`;

const PagerNavigationClassicStyles = ({ theme }) => theme.name === THEMES.classic && css`
  .carbon-number__input {
    width: 35px;
    height: 31px;
    padding: 0;
    margin: 0 4px;
    line-height: 24px;
    text-align: center;
  }
`;

export {
  PagerContainerClassicStyles,
  PagerNavigationClassicStyles
};
