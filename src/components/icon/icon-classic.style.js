import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';
import classicConfig from './icon-classic-config';

export default ({ theme }) => isClassic(theme)
  && css`
    color: rgba(0, 0, 0, 0.85);

    ${({ bgTheme }) => bgTheme
      && css`
        background-color: ${classicConfig.backgroundColor[bgTheme]};
      `}

    ${({ isFont }) => isFont
      && css`
        &::before {
          font-size: 16px;
          font-style: normal;
          font-weight: normal;
          line-height: 16px;
          vertical-align: middle;
        }
      `}
  `;
