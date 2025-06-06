import styled from "styled-components";
import { margin, MarginProps } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const heightMap = {
  small: 1,
  medium: 2,
  large: 3,
};

const StyledHr = styled.hr.attrs(applyBaseTheme)<
  MarginProps & { height: "small" | "medium" | "large" }
>`
  ${margin}
  width: 100%;
  border: 0;
  height: ${({ height }) => heightMap[height]}px;
  background: var(--colorsUtilityMajor100);
`;

export default StyledHr;
