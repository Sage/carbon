import styled from "styled-components";
import StyledDateInput from "../date/date.style";
import { StyledLabelContainer } from "../label/label.style.js";
import { StyledInputPresentationContainer } from "../input/input-presentation.style.js";

const StyledDateRange = styled.div`
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

export default StyledDateRange;
