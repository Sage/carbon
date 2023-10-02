import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import baseTheme from "../../style/themes/base";
import computeSizing from "../../style/utils/element-sizing";
import { TileProps } from "./tile.component";

type StyledTileProps = Pick<
  TileProps,
  "borderWidth" | "borderVariant" | "variant" | "width" | "roundness" | "height"
> & { isHorizontal?: boolean } & SpaceProps;

interface TileContentProps {
  isHorizontal?: boolean;
  isVertical?: boolean;
  width?: TileProps["width"];
  height?: TileProps["height"];
}

const getBorderColor = (borderVariant: TileProps["borderVariant"]) => {
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
      return "var(--colorsUtilityMajor100)";
  }
};

const TileContent = styled.div<TileContentProps>`
  ${({ isHorizontal, isVertical, width, height }) => css`
    ${space}

    box-sizing: border-box;
    position: relative;
    flex-grow: 1;

    ${isHorizontal &&
    css`
      display: inline;

      :last-of-type {
        padding-right: 0;
      }

      :first-of-type {
        padding-left: 0;
      }

      & + & {
        margin-top: 0;
        border-left: solid 1px var(--colorsUtilityMajor050);
      }
    `}

    ${isVertical &&
    css`
      width: auto;

      :last-of-type {
        padding-bottom: 0;
      }

      :first-of-type {
        padding-top: 0;
      }

      & + & {
        margin-top: 0;
        border-top: solid 1px var(--colorsUtilityMajor050);
      }
    `}

    ${(width || height) &&
    css`
      flex-grow: 0;
      ${computeSizing({
        width: width || /* istanbul ignore next */ undefined,
        height: height || undefined,
      })}
    `}
  `}
`;

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
    border: var(--${borderWidth}) solid ${getBorderColor(borderVariant)};
    border-radius: ${roundness === "default"
      ? "var(--borderRadius100)"
      : "var(--borderRadius200)"};
    overflow: hidden;

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
      border-color: var(--colorsActionMajor500);
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

TileContent.defaultProps = {
  theme: baseTheme,
};

StyledTile.defaultProps = {
  theme: baseTheme,
};

export { StyledTile, TileContent };
