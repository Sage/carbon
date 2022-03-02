import styled from "styled-components";
import { margin, MarginProps } from "styled-system";
import baseTheme from "../../style/themes/base";

const StyledHr = styled.hr<MarginProps>`
  ${margin}
  width: inherit;
  border: 0;
  height: 1px;
  background: var(--colorsUtilityMajor100);
`;

StyledHr.defaultProps = {
  theme: baseTheme,
};

export default StyledHr;
