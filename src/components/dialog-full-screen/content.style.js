import styled from 'styled-components';
import FullScreenHeading from './full-screen-heading/full-screen-heading.style';
import contentClassicStyle from './content-classic.style';

const StyledContent = styled.div`
  overflow-y: auto;
  height: calc(100% - 60px);

  ${FullScreenHeading} + & {
    height: calc(100% - 166px);
  }

  .carbon-app-wrapper {
    max-width: none;
    padding: 27px 32px 32px 32px;
  }

  ${contentClassicStyle}
`;

export default StyledContent;
