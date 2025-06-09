import styled, { css } from "styled-components";
import { padding } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import { TileHeaderProps } from "./tile-header.component";

const getBackgroundColor = (variant: TileHeaderProps["variant"]) => {
  switch (variant) {
    case "transparent":
      return "transparent";
    case "black":
      return "var(--colorsUtilityYin100)";
    case "grey":
      return "var(--colorsUtilityMajor025)";
    default:
      return "var(--colorsUtilityMajor100)";
  }
};

const StyledTileHeader = styled.div.attrs(applyBaseTheme)<{
  variant: TileHeaderProps["variant"];
}>`
  ${padding}
  border-top-left-radius: calc(var(--tileBorderRadius) - 1px);
  border-top-right-radius: calc(var(--tileBorderRadius) - 1px);

  ${({ variant }) => css`
    background: ${getBackgroundColor(variant)};
    border-bottom: 1px solid
      ${variant === "grey"
        ? "var(--colorsUtilityMajor200)"
        : "var(--colorsUtilityMajor100)"};
  `}
`;

export default StyledTileHeader;
