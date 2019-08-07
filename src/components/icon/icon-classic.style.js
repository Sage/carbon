import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';
import classicConfig from './icon-classic-config';

export default ({ theme, bgTheme, isFont }) => isClassic(theme) && css`
  color: rgba(0, 0, 0, 0.85);

  ${bgTheme && css`
    background-color: ${classicConfig.backgroundColor[bgTheme]};
    &:hover {
      color: ${theme.icon.defaultHover};
      background-color: ${classicConfig.backgroundColor[bgTheme]};
    }
  `}

  ${isFont && css`
    &::before {
      font-size: 16px;
      font-style: normal;
      font-weight: normal;
      line-height: 16px;
      vertical-align: middle;
    }
  `}
  `;
