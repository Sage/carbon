import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const PagerContainerClassicStyles = ({ theme }) => theme.name === THEMES.classic && css`
  padding: 3px 16px;
  font-size: 14px;
  background-color: #F2F4F5;
`;

const PagerNavigationClassicStyles = ({ theme }) => theme.name === THEMES.classic && css`
  .carbon-number__input {
    width: 35px;
    height: 31px;
  }
`;

export {
  PagerContainerClassicStyles,
  PagerNavigationClassicStyles
};
