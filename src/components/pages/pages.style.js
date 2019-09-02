import styled, { css } from 'styled-components';
import { slideAnimation, fadeAnimation } from './pages.config';
import StyledHeadingIcon from '../heading/heading.style';
import { isClassic } from '../../utils/helpers/style-helper';

const PagesContent = styled.div`
  overflow: hidden;
  position: relative;

  && ${StyledHeadingIcon} {
    margin-top: -3px;
  }

  ${({ theme }) => isClassic(theme) && css`
    && ${StyledHeadingIcon} {
      margin-top: -22px;
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

export {
  PagesWrapperStyle,
  PagesContent
};
