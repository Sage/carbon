import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { baseTheme } from "../../style/themes";
import { StepSequenceProps } from "./step-sequence.component";

const StyledStepSequence = styled.ol<
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

StyledStepSequence.defaultProps = {
  theme: baseTheme,
};

export default StyledStepSequence;
