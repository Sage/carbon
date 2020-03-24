import styled from 'styled-components';

const DocsWrapper = styled.iframe`
  ${({ src, height }) => `
    src: ${src};
    height: ${height};
  `}
  width: 100%;
  border: none;
`;

export default DocsWrapper;
