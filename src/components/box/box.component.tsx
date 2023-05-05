import React from "react";
import styled, { css } from "styled-components";
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
  ColorProps,
  position as positionFn,
  PositionProps,
} from "styled-system";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import Logger from "../../__internal__/utils/logger";
import BaseTheme from "../../style/themes/base";
import styledColor from "../../style/utils/color";
import boxConfig from "./box.config";

const GAP_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

export type OverflowWrap = "break-word" | "anywhere";
export type ScrollVariant = "light" | "dark";
export type BoxSizing = "content-box" | "border-box";
export type AllowedNumericalValues = typeof GAP_VALUES[number];
export type Gap = AllowedNumericalValues | string;

type DesignTokensType = keyof typeof DesignTokens;
type BoxShadowsType = Extract<DesignTokensType, `boxShadow${string}`>;
type BorderRadiusType = Extract<DesignTokensType, `borderRadius${string}`>;

export interface BoxProps
  extends SpaceProps,
    LayoutProps,
    FlexboxProps,
    ColorProps,
    Omit<PositionProps, "zIndex"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  /** String to set Box content break strategy. Note "anywhere" is not supported in Safari */
  overflowWrap?: OverflowWrap;
  /** scroll styling attribute */
  scrollVariant?: ScrollVariant;
  /** set the box-sizing attribute of the Box component */
  boxSizing?: BoxSizing;
  /** Allows a tabindex to be specified */
  tabIndex?: number | string;
  /** Gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." */
  gap?: Gap;
  /** Column gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." */
  columnGap?: Gap;
  /** Row gap an integer multiplier of the base spacing constant (8px) or any valid CSS string." */
  rowGap?: Gap;
  /** Design Token for Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Box component. */
  boxShadow?: BoxShadowsType;
  /** Design Token for Border Radius. Note: please check that the border radius design token you are using is compatible with the Box component. */
  borderRadius?: BorderRadiusType;
}

let isDeprecationWarningTriggered = false;

const calculatePosition = (props: Omit<PositionProps, "zIndex">) => {
  const { position, ...rest } = positionFn(props);

  return {
    position,
    zIndex: ["sticky", "fixed"].includes(position) ? 1 : undefined,
    ...rest,
  };
};

export const Box = styled.div<BoxProps>`
  ${() => {
    if (!isDeprecationWarningTriggered) {
      isDeprecationWarningTriggered = true;
      Logger.deprecate(
        "Previous props that could be spread to the `Box` component are being removed. Only props documented in the intefaces will be supported."
      );
    }
    return css``;
  }}

  ${space}
  ${layout}
  ${flexbox}
  ${calculatePosition}

  ${({ borderRadius = "borderRadius000" }) =>
    `border-radius: var(--${borderRadius});`}

  ${({ color, bg, backgroundColor, ...rest }) =>
    styledColor({ color, bg, backgroundColor, ...rest })}

  ${({ overflowWrap }) =>
    overflowWrap &&
    css`
      overflow-wrap: ${overflowWrap};
    `}

  ${({ scrollVariant }) =>
    scrollVariant &&
    css`
      scrollbar-color: ${boxConfig[scrollVariant].thumb}
        ${boxConfig[scrollVariant].track};

      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-track {
        background-color: ${boxConfig[scrollVariant].track};
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${boxConfig[scrollVariant].thumb};
      }
    `}

  ${({ boxSizing }) =>
    boxSizing &&
    css`
      box-sizing: ${boxSizing};
    `}

    ${({ display, gap, columnGap, rowGap }) =>
    (display === "flex" || display === "inline-flex") &&
    css`
      ${gap !== undefined &&
      css`
        gap: ${boxConfig.gap(gap)};
      `}

      ${columnGap !== undefined &&
      css`
        column-gap: ${boxConfig.gap(columnGap)};
      `}

      ${rowGap !== undefined &&
      css`
        row-gap: ${boxConfig.gap(rowGap)};
      `}
    `};

  ${({ boxShadow }) =>
    boxShadow &&
    css`
      box-shadow: var(--${boxShadow});
    `}
`;

Box.defaultProps = {
  theme: BaseTheme,
};

Box.displayName = "Box";
export default Box;
