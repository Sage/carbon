import styled, { css } from 'styled-components';
import BaseTheme from '../../../style/themes/base';
import { LinkStyleAnchor } from '../../link/link.style';
import { StyledIcon } from '../../icon/icon.style';
import { isClassic } from '../../../utils/helpers/style-helper';

const StyledPage = styled.article`
  width: 100%;
  height: 100%;

  ${LinkStyleAnchor} {
    text-decoration: none !important;

    ${({ theme }) => !isClassic(theme) && css`
      height: 25px;
    `}

    &:hover {
      text-decoration: none !important;
    }

    ${StyledIcon} {
      margin-top: -9px;
      margin-right: 0px;
      top: 11px;
      color: #4d7080;

      &:hover {
        color: #335B6D;
      }
    }
  }
`;

const StyledPageContent = styled.div`
  box-sizing: content-box;
  padding: 30px 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

StyledPage.defaultProps = {
  theme: BaseTheme
};

export { StyledPage, StyledPageContent };
