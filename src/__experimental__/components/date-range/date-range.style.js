import styled from "styled-components";
import { margin } from "styled-system";
import StyledDateInput from "../date/date.style";
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
`;

StyledDateRange.defaultProps = {
  theme: baseTheme,
};

export default StyledDateRange;
