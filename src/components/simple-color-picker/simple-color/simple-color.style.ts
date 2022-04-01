import styled from "styled-components";
import { SimpleColorProps } from "./simple-color.component";

const StyledSimpleColor = styled.div<SimpleColorProps>`
  width: var(--sizing700);
  height: var(--sizing700);
  margin-right: 2px;
  margin-bottom: 2px;

  &:hover {
    cursor: pointer;
  }
`;

export default StyledSimpleColor;
