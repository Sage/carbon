import styled, { css } from "styled-components";

const StepSequenceStyle = styled.ol`
  display: flex;
  margin: 0;
  padding: 18px;
  font-weight: bold;

  ${({ orientation }) =>
    orientation === "vertical" &&
    css`
      flex-direction: column;
      padding: 0;
    `};
`;

export default StepSequenceStyle;
