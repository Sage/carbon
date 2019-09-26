import styled, { css } from 'styled-components';
import FullScreenHeading from './full-screen-heading/full-screen-heading.style';
import contentClassicStyle from './content-classic.style';

const StyledContent = styled.div`
  overflow-y: auto;

  ${({ headingHeight }) => css`
    ${FullScreenHeading} + & {
      height: calc(100% - ${headingHeight}px);
    }
  `}

  .carbon-app-wrapper {
    max-width: none;
    padding: 27px 32px 32px 32px;
  }

  ${({ hasHeader }) => !hasHeader && `
    padding-top: 0;
    margin-top: -25px;

    .carbon-app-wrapper {
      max-width: 100%;
      padding: 0;
      height: 70px;
    }
  `}

  ${contentClassicStyle}
`;

StyledContent.defaultProps = {
  headingHeight: 0
};

export default StyledContent;
