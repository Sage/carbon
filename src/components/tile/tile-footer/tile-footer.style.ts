import styled, { css } from "styled-components";
import { padding } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import { TileFooterProps } from "./tile-footer.component";

const getBackgroundColor = (variant: TileFooterProps["variant"]) => {
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

const StyledTileFooter = styled.div.attrs(applyBaseTheme)<{
  variant: TileFooterProps["variant"];
}>`
  ${padding}
  border-bottom-left-radius: calc(var(--tileBorderRadius) - 1px);
  border-bottom-right-radius: calc(var(--tileBorderRadius) - 1px);

  ${({ variant }) => css`
    background: ${getBackgroundColor(variant)};
    border-top: 1px solid
      ${variant === "grey"
        ? "var(--colorsUtilityMajor200)"
        : "var(--colorsUtilityMajor100)"};
  `}
`;

export default StyledTileFooter;
