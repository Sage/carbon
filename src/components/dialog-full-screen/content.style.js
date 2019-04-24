import styled from 'styled-components';
import FullScreenHeading from './full-screen-heading/full-screen-heading.style';

const StyledContent = styled.div`
  padding: 30px 0;
  overflow-y: auto;
  height: calc(100% - 60px);

  ${FullScreenHeading} + & {
    height: calc(100% - 166px);
  }
`;

export default StyledContent;
