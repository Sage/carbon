import styled, { css } from "styled-components";
import { padding } from "styled-system";
import { baseTheme } from "../../../style/themes";
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

const StyledTileFooter = styled.div<{ variant: TileFooterProps["variant"] }>`
  ${padding}

  ${({ variant }) => css`
    background: ${getBackgroundColor(variant)};
    border-top: 1px solid
      ${variant === "grey"
        ? "var(--colorsUtilityMajor200)"
        : "var(--colorsUtilityMajor100)"};
  `}
`;

StyledTileFooter.defaultProps = {
  theme: baseTheme,
};

export default StyledTileFooter;
