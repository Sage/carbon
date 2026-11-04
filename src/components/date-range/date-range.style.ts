import styled from "styled-components";
import { margin } from "styled-system";
import StyledDateInput from "../date/date.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const gapBySize = {
  small: "var(--global-space-comp-m)",
  medium: "var(--global-space-comp-l)",
  large: "var(--global-space-comp-xl)",
};

export interface StyledDateRangeProps {
  /** [Legacy] Display labels inline */
  labelsInline?: boolean;
  /** Render the ValidationMessage above the inputs when validationRedesignOptIn flag is set */
  validationMessagePositionTop?: boolean;
}
const StyledDateRange = styled.div.attrs(applyBaseTheme)<
  StyledDateRangeProps & { $size: keyof typeof gapBySize }
>`
  ${({ validationMessagePositionTop }) => `
    display: flex;
    align-items: ${validationMessagePositionTop ? "flex-end" : "flex-start"};
  `}
  margin-bottom: var(--fieldSpacing);
  ${margin}

  & ${StyledDateInput} {
    display: inline-block;
    vertical-align: ${({ labelsInline }) => (labelsInline ? "top" : "bottom")};
  }

  & ${StyledDateInput}:first-of-type {
    margin-right: ${({ $size }) => gapBySize[$size]};
  }
`;

export default StyledDateRange;
