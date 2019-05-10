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

  ${contentClassicStyle}
`;

StyledContent.defaultProps = {
  headingHeight: 0
};

export default StyledContent;
