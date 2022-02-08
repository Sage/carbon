import styled from "styled-components";
import { margin } from "styled-system";
import StyledDateInput from "../date/date.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style.js";
import { StyledInputPresentationContainer } from "../../__internal__/input/input-presentation.style.js";
import baseTheme from "../../style/themes/base";

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
