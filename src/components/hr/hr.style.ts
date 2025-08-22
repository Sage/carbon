import styled from "styled-components";
import { margin, MarginProps } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const heightMap = {
  small: 1,
  medium: 2,
  large: 3,
};

const StyledHr = styled.hr.attrs(applyBaseTheme)<
  MarginProps & { height: "small" | "medium" | "large" } & {
    $type?: "typical" | "inverse";
  }
>`
  ${margin}
  width: 100%;
  border: 0;
  height: ${({ height }) => heightMap[height]}px;
  background-color: ${({ $type }) =>
    $type === "typical"
      ? "var(--colorsUtilityMajor100)"
      : "var(--colorsActionMajorYang030)"};
`;

export default StyledHr;
