import styled, { css } from "styled-components";
import { padding } from "styled-system";
import { baseTheme } from "../../../style/themes";
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

const StyledTileHeader = styled.div<{ variant: TileHeaderProps["variant"] }>`
  ${padding}

  ${({ variant }) => css`
    background: ${getBackgroundColor(variant)};
    border-bottom: 1px solid
      ${variant === "grey"
        ? "var(--colorsUtilityMajor200)"
        : "var(--colorsUtilityMajor100)"};
  `}
`;

StyledTileHeader.defaultProps = {
  theme: baseTheme,
};

export default StyledTileHeader;
