import styled from 'styled-components';

const StyledContent = styled.div`
  padding: 30px 0;
  overflow-y: auto;
  height: calc(100% - 60px);

  .carbon-full-screen-heading + & {
    height: calc(100% - 166px);
  }
`;

export default StyledContent;
