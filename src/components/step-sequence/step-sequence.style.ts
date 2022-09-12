import styled, { css } from "styled-components";
import { margin } from "styled-system";
import { baseTheme } from "../../style/themes";

const StepSequenceStyle = styled.ol<{ orientation: "horizontal" | "vertical" }>`
  display: flex;
  margin: 0;
  padding: 18px;
  font-weight: bold;

  ${({ orientation }) =>
    orientation === "vertical" &&
    css`
      flex-direction: column;
      padding: 0;
    `}

  ${margin}
`;

StepSequenceStyle.defaultProps = {
  theme: baseTheme,
};

export default StepSequenceStyle;
