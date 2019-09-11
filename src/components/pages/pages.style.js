import styled, { css } from 'styled-components';
import { slideAnimation, fadeAnimation } from './pages.config';
import { StyledHeading, StyledHeadingIcon } from '../heading/heading.style';
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

  ${StyledHeading} {
    padding-left: 40px;
  }

  && .slide-next-enter {
    opacity: 0;
  }

  && .slide-next-enter.slide-next-enter-active {
    opacity: 1;
    transition: all .5s cubic-bezier(.34,1.1,.69,1.01);
  }

  && .slide-next-leave {
    opacity: 1;
  }

  && .slide-next-leave {
    opacity: 0;
    transition: all .5s cubic-bezier(.34,1.1,.69,1.01);
  }

  && .slide-previous-enter {
    opacity: 0;
    left: -100%;
    position: absolute;
  }

  && .slide-previous-enter.slide-previous-enter-active {
    opacity: 1;
    left: 0;
    transition: all .5s cubic-bezier(.34,1.1,.69,1.01);
  }

  && .slide-previous-leave {
    opacity: 1;
    left: 0;
    position: relative;
  }

  && .slide-previous-leave.slide-previous-leave-active {
    opacity: 0;
    left: 100%;
    transition: all .5s cubic-bezier(.34,1.1,.69,1.01);
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
