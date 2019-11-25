import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';
import classicConfig from './icon-classic-config';
import browserTypeCheck, { isSafari } from '../../utils/helpers/browser-type-check';

export default ({
  theme, bgTheme, type
}) => isClassic(theme) && css`
  color: rgba(0, 0, 0, 0.85);

  .common-input__label--help & {
    width: auto;
    height: auto;
  }

  ${bgTheme && css`
    background-color: ${classicConfig.backgroundColor[bgTheme]};
    &:hover {
      color: ${theme.icon.defaultHover};
      background-color: ${classicConfig.backgroundColor[bgTheme]};
    }
  `}

  &::before {
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    line-height: 16px;
    vertical-align: middle;
    ${type === 'services' && browserTypeCheck(window) && css`margin-top: -7px;`}
    ${type === 'services' && isSafari(navigator) && !browserTypeCheck(window) && css`margin-top: -4px;`}
  }
`;
