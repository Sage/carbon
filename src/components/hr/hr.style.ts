import styled from "styled-components";
import { margin, MarginProps } from "styled-system";
import baseTheme from "../../style/themes/base";

const heightMap = {
  small: 1,
  medium: 2,
  large: 3,
};

const StyledHr = styled.hr<
  MarginProps & { height: "small" | "medium" | "large" }
>`
  ${margin}
  width: inherit;
  border: 0;
  height: ${({ height }) => heightMap[height]}px;
  background: var(--colorsUtilityMajor100);
`;

StyledHr.defaultProps = {
  theme: baseTheme,
};

export default StyledHr;
