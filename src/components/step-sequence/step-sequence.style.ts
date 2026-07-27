import styled, { css } from "styled-components";
import { space } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { StepSequenceProps } from "./step-sequence.component";

interface StyledStepSequenceProps {
  $orientation: StepSequenceProps["orientation"];
}

const StyledStepSequence = styled.ol.attrs(
  applyBaseTheme,
)<StyledStepSequenceProps>`
  display: flex;
  align-items: flex-start;
  margin: 0;
  padding: 0;

  ${({ $orientation }) =>
    $orientation === "vertical" &&
    css`
      flex-direction: column;
      height: 100%;
    `}

  ${space}
`;

export default StyledStepSequence;
