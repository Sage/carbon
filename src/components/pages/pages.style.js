import styled, { css } from 'styled-components';
import { slideAnimation, fadeAnimation } from './pages.config';
import { StyledHeading, StyledHeadingIcon } from '../heading/heading.style';
import { isClassic } from '../../utils/helpers/style-helper';
import LinkStyleAnchor from '../link/link.style';
import BaseTheme from '../../style/themes/base';

const PagesContent = styled.div`
  border: none;
  
  ${LinkStyleAnchor} {
    a{
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
  }

  .carbon-app-wrapper {
    min-width: auto;
    max-width: 100%;
  }

  ${StyledHeading} {
    padding-left: 40px;
  }
`;

const PagesWrapperStyle = styled.div`
  .carbon-carousel__content {
    overflow: hidden;
    position: relative;
  }

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
