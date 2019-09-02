import styled, { css } from 'styled-components';
import { slideAnimation, fadeAnimation } from './pages.config';
import StyledHeadingIcon from '../heading/heading.style';
import { isClassic } from '../../utils/helpers/style-helper';
import { LinkStyle, LinkStyleAnchor } from '../link/link.style';
import BaseTheme from '../../style/themes/base';

const PagesContent = styled.div`
  overflow: hidden;
  position: relative;

  ${LinkStyleAnchor} {
    background-color: transparent;

    ${({ theme }) => !isClassic(theme) && css`
      &:focus {
        outline: solid 3px ${theme.colors.focus};
      }
    `}
  }

  && ${StyledHeadingIcon} {
    margin-top: -22px;
    height: 26px;
  }

  ${({ theme }) => !isClassic(theme) && css`
    && ${StyledHeadingIcon} {
      margin-top: -5px;
    }
  `}

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
