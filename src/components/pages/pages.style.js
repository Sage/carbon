import styled, { css } from 'styled-components';
import { slideAnimation, fadeAnimation } from './pages.config';
import { StyledHeading, StyledHeadingIcon } from '../heading/heading.style';
import { isClassic } from '../../utils/helpers/style-helper';
import LinkStyleAnchor from '../link/link.style';
import BaseTheme from '../../style/themes/base';

const PagesContent = styled.div`
  border: none;
  
  &&&& ${LinkStyleAnchor} {
    margin-top: -16px;
    a, button {
      height: 34px;
      background-color: transparent;
      top: 50px;
      margin-top: ${({ theme }) => (isClassic(theme) ? '-1px' : '-5px')};

      ${({ theme }) => !isClassic(theme) && css`
        &:focus {
          outline: solid 3px ${theme.colors.focus};
          background-color: transparent;
          width: 26px;
          margin-top: -1px;
          padding-top: 0px;
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
    padding: 4px 0 0 0; 
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
