import styled, { css } from 'styled-components';
import BaseTheme from '../../../style/themes/base';
import LinkStyleAnchor from '../../link/link.style';
import StyledIcon from '../../icon/icon.style';
import { isClassic } from '../../../utils/helpers/style-helper';

const StyledPage = styled.article`
  width: 100%;
  height: 100%;

  ${LinkStyleAnchor} {
    a {
        text-decoration: none;

        ${({ theme }) => !isClassic(theme) && css`
          height: 25px;
          margin-top: -12px;
        `}

        &:hover {
          text-decoration: none;
        }

        ${StyledIcon} {
          margin-top: -9px;
          margin-right: 0px;
          top: 5px;
          color: #4d7080;

          &:hover {
            color: #335B6D;
          }

          ${({ theme }) => !isClassic(theme) && css`
            margin-top: 0px;
            top: 5px;
          `}
        }
      }
    }
`;

const StyledPageContent = styled.div`
  box-sizing: content-box;
  padding: 30px 40px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

StyledPage.defaultProps = {
  theme: BaseTheme
};

export { StyledPage, StyledPageContent };
