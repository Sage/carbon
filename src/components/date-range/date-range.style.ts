import styled from "styled-components";
import { margin } from "styled-system";
import StyledDateInput from "../date/date.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import { StyledInputPresentationContainer } from "../../__internal__/input/input-presentation.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";

export interface StyledDateRangeProps {
  /** [Legacy] Display labels inline */
  labelsInline?: boolean;
  /** Render the ValidationMessage above the inputs when validationRedesignOptIn flag is set */
  validationMessagePositionTop?: boolean;
}
const StyledDateRange = styled.div.attrs(applyBaseTheme)<StyledDateRangeProps>`
  ${({ validationMessagePositionTop }) => `
    display: flex;
    align-items: ${validationMessagePositionTop ? "flex-end" : "flex-start"};
  `}
  margin-bottom: var(--fieldSpacing);
  ${margin}

  & ${StyledDateInput} {
    width: auto;
    display: inline-block;
    vertical-align: ${({ labelsInline }) => (labelsInline ? "top" : "bottom")};
  }

  & ${StyledDateInput}:first-of-type {
    margin-right: var(--spacing300);
  }

  ${StyledLabelContainer} {
    width: auto;
  }

  ${StyledInputPresentationContainer} {
    flex: auto;
  }
`;

export default StyledDateRange;
