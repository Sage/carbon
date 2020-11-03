import styled from "styled-components";

const StyledDragContainer = styled.div`
  left: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 10px 20px 0 rgba(0, 20, 29, 0.2),
    0 20px 40px 0 rgba(0, 20, 29, 0.1);
  cursor: move;
  cursor: grabbing;
`;

export default StyledDragContainer;
