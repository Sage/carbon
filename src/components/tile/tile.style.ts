import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import baseTheme from "../../style/themes/base";
import computeSizing from "../../style/utils/element-sizing";
import { TileProps } from "./tile.component";
import StyledTileContent from "./tile-content/tile-content.style";

type StyledTileProps = Pick<
  TileProps,
  | "borderWidth"
  | "borderVariant"
  | "variant"
  | "width"
  | "roundness"
  | "height"
  | "highlightVariant"
> & { isHorizontal?: boolean } & SpaceProps;

const getBorderColor = (
  borderVariant: TileProps["borderVariant"],
  variant: TileProps["variant"],
) => {
  switch (borderVariant) {
    case "selected":
      return "var(--colorsUtilityYin100)";
    case "positive":
      return "var(--colorsSemanticPositive500)";
    case "negative":
      return "var(--colorsSemanticNegative500)";
    case "caution":
      return "var(--colorsSemanticCaution500)";
    case "info":
      return "var(--colorsSemanticInfo500)";
    default:
      switch (variant) {
        case "active":
          return "var(--colorsActionMajor500)";
        case "grey":
          return "var(--colorsUtilityMajor200)";
        default:
          return "var(--colorsUtilityMajor100)";
      }
  }
};

const getBorderRadius = (roundness: TileProps["roundness"]) => {
  switch (roundness) {
    case "large":
      return "var(--borderRadius200)";
    case "small":
      return "var(--borderRadius050)";
    default:
      return "var(--borderRadius100)";
  }
};

const getHighlightVariant = (variant: TileProps["highlightVariant"]) => {
  switch (variant) {
    case "success":
      return "var(--colorsSemanticPositive500)";
    case "neutral":
      return "var(--colorsSemanticNeutral500)";
    case "error":
      return "var(--colorsSemanticNegative500)";
    case "warning":
      return "var(--colorsSemanticCaution500)";
    case "info":
      return "var(--colorsSemanticInfo500)";
    default:
      // gradient is default
      return "linear-gradient(0deg, rgb(143, 73, 254) 5%, rgb(0, 146, 219) 50%, rgb(19, 160, 56) 95%)";
  }
};

const StyledTile = styled.div<StyledTileProps>`
  ${({
    borderVariant,
    borderWidth = "borderWidth100",
    isHorizontal,
    variant,
    width,
    roundness,
    height,
  }) => css`
    ${space}

    box-sizing: border-box;
    border: var(--${borderWidth}) solid
      ${getBorderColor(borderVariant, variant)};
    border-radius: ${getBorderRadius(roundness)};
    --tileBorderRadius: ${getBorderRadius(roundness)};

    > *:first-child:not(${StyledTileContent}) {
      border-top-left-radius: calc(${getBorderRadius(roundness)} - 1px);
      border-top-right-radius: calc(${getBorderRadius(roundness)} - 1px);
    }

    > *:last-child:not(${StyledTileContent}) {
      border-bottom-left-radius: calc(${getBorderRadius(roundness)} - 1px);
      border-bottom-right-radius: calc(${getBorderRadius(roundness)} - 1px);
    }

    ${variant === "tile" &&
    css`
      background-color: var(--colorsUtilityYang100);
    `}

    ${variant === "transparent" &&
    css`
      background-color: transparent;
    `}

    ${variant === "active" &&
    css`
      background-color: var(--colorsActionMajor025);
    `}

    ${variant === "grey" &&
    css`
      background-color: var(--colorsUtilityMajor025);
    `}

    display: flex;
    flex-direction: ${isHorizontal ? "row" : "column"};
    position: relative;
    ${computeSizing({
      width: width || /* istanbul ignore next */ undefined,
      height: height || undefined,
    })}
  `}
`;

StyledTile.defaultProps = {
  theme: baseTheme,
};

export const StyledHighlight = styled.div<{
  variant: Required<TileProps["highlightVariant"]>;
  roundness: TileProps["roundness"];
}>`
  height: 100%;
  width: 100%;
  position: relative;
  background: ${({ variant }) => getHighlightVariant(variant)};
  border-radius: ${({ roundness }) => getBorderRadius(roundness)};

  ${StyledTile} {
    border-left: 0;
    left: 4px;
    width: calc(100% - 4px);
  }
`;

export default StyledTile;
