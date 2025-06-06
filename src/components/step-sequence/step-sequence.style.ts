import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { StepSequenceProps } from "./step-sequence.component";

const StyledStepSequence = styled.ol.attrs(applyBaseTheme)<
  Pick<StepSequenceProps, "orientation"> & SpaceProps
>`
  display: flex;
  margin: 0;
  font-weight: var(--fontWeights500);

  ${({ orientation }) =>
    orientation === "vertical" &&
    css`
      flex-direction: column;
      height: 100%;
    `}

  ${space}
`;

export default StyledStepSequence;
