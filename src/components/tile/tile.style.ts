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
    // FE-6368 has been raised for the below, change hex values for design tokens (when added)
    case "important":
      return " #8F4CD7";
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
    highlightVariant,
    height,
  }) => css`
    ${space}

    ${highlightVariant &&
    css`
      overflow: hidden;
      &::before {
        display: block;
        content: "";
        height: 100%;
        width: 8px;
        position: absolute;
        top: 0;
        left: 0;
        background: ${getHighlightVariant(highlightVariant)};
      }
    `}

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

export default StyledTile;
