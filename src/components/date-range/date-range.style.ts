import styled from "styled-components";
import { margin } from "styled-system";
import StyledDateInput from "../date/date.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import { StyledInputPresentationContainer } from "../../__internal__/input/input-presentation.style";
import baseTheme from "../../style/themes/base";

export interface StyledDateRangeProps {
  /** [Legacy] Display labels inline */
  labelsInline?: boolean;
}
const StyledDateRange = styled.div<StyledDateRangeProps>`
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

StyledDateRange.defaultProps = {
  theme: baseTheme,
};

export default StyledDateRange;
