import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { StepSequenceProps } from "./step-sequence.component";

const StyledStepSequence = styled.ol.attrs(applyBaseTheme)<
  Pick<StepSequenceProps, "orientation"> & SpaceProps
>`
  display: flex;
  padding: var(--spacing300);
  margin: 0;
  list-style: none;

  ${({ orientation }) =>
    orientation === "vertical"
      ? css`
          flex-direction: column;
          width: max-content;
          min-width: 300px;
        `
      : css`
          flex-direction: row;
          margin: var(--spacing200);
          justify-content: center;
          align-items: flex-start;
          padding-bottom: 60px;
        `}

  ${space}
`;

export default StyledStepSequence;
