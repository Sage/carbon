import styled from 'styled-components';

const DocsWrapper = styled.iframe`
  ${({ src, width, height }) => `
    src: ${src};
    width: ${width};
    height: ${height};
  `}
  padding: 24px;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  overflow: auto;
  flex-direction: row;
  box-shadow: 0px 2px 3px -2px rgba(0,0,0,0.2);
  border-radius: 5px;
  border: 1px solid lightgray;
`;

export default DocsWrapper;
