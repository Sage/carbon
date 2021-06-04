import styled from "styled-components";
import { margin } from "styled-system";
import StyledDateInput from "../../../components/date/date.style";
import { StyledLabelContainer } from "../label/label.style.js";
import { StyledInputPresentationContainer } from "../input/input-presentation.style.js";
import baseTheme from "../../../style/themes/base";

const StyledDateRange = styled.div`
  ${margin}
  & ${StyledDateInput} {
    width: auto;
    display: inline-block;
    vertical-align: ${({ labelsInline }) => (labelsInline ? "top" : "bottom")};
  }

  & ${StyledDateInput}:first-child {
    margin-right: 15px;
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
