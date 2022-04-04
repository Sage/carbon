import styled, { css } from "styled-components";

const StyledFlatTableBodyDraggable = styled.tbody`
  ${({ isDragging }) =>
    isDragging &&
    css`
      cursor: grabbing;
    `}
`;

export default StyledFlatTableBodyDraggable;
