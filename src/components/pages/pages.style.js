import styled, { css } from 'styled-components';
import { slideAnimation, fadeAnimation } from './pages.config';
import StyledHeadingIcon from '../heading/heading.style';
import { isClassic } from '../../utils/helpers/style-helper';
import { LinkStyleAnchor } from '../link/link.style';
import BaseTheme from '../../style/themes/base';

const PagesContent = styled.div`
  overflow: hidden;
  position: relative;

  ${LinkStyleAnchor} {
    height: 26px;
    background-color: transparent;
    top: 50px;
    margin-top: -5px;

    ${({ theme }) => !isClassic(theme) && css`
      top: 12px;

      &:focus {
        outline: solid 3px ${theme.colors.focus};
      }
    `}

    > span {
      display: block;
      height: 26px;

      > span {
        display: block;
        height: 26px;
        
        ${StyledHeadingIcon} {
          margin-top: -9px;
          top: 7px;
          height: 26px;

          &:before {
            line-height: 26px;
          }
        }
      }
    }
  }

  .carbon-app-wrapper {
    min-width: auto;
    max-width: 100%;
  }
`;

const PagesWrapperStyle = styled.div`
  ${slideAnimation};
  ${fadeAnimation};
`;

PagesContent.defaultProps = {
  theme: BaseTheme
};

export {
  PagesWrapperStyle,
  PagesContent
};
