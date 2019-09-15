import styled from 'styled-components';

const StyledDragContainer = styled.div`
  height: 100%;
  left: 0;
  list-style: none;
  margin: 0;
  opacity: 0.7;
  padding: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const StyledDragWrapper = styled.div``;

export { StyledDragContainer, StyledDragWrapper };
