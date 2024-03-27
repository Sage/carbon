import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import baseTheme from "../../style/themes/base";
import computeSizing from "../../style/utils/element-sizing";
import { TileProps } from "./tile.component";

type StyledTileProps = Pick<
  TileProps,
  "borderWidth" | "borderVariant" | "variant" | "width" | "roundness" | "height"
> & { isHorizontal?: boolean } & SpaceProps;

const getBorderColor = (
  borderVariant: TileProps["borderVariant"],
  variant: TileProps["variant"]
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

    > *:first-child {
      border-top-left-radius: calc(${getBorderRadius(roundness)} - 1px);
      border-top-right-radius: calc(${getBorderRadius(roundness)} - 1px);
    }

    > *:last-child {
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
