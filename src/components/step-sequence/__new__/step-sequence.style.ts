import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import { StepSequenceProps } from "./step-sequence.component";

const StyledStepSequence = styled.ol.attrs(applyBaseTheme)<
  Pick<StepSequenceProps, "orientation"> & SpaceProps
>`
  display: flex;
  padding: 24px;
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
          margin: 16px;
          justify-content: center;
          align-items: flex-start;
          padding-bottom: 60px;
        `}

  ${space}
`;

export default StyledStepSequence;
