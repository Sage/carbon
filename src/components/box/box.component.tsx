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
  position,
  PositionProps,
} from "styled-system";
import { Expand, ExplicitUnion } from "../../__internal__/utils/helpers/types";
import BaseTheme from "../../style/themes/base";
import styledColor from "../../style/utils/color";
import boxConfig from "./box.config";

const GAP_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

export type OverflowWrap = "break-word" | "anywhere";
export type ScrollVariant = "light" | "dark";
export type BoxSizing = "content-box" | "border-box";
export type AllowedNumericalValues = typeof GAP_VALUES[number];
export type Gap = AllowedNumericalValues | string;

export interface BoxProps
  extends Expand<SpaceProps>,
    Expand<LayoutProps>,
    Expand<FlexboxProps>,
    Expand<ColorProps>,
    Expand<Omit<PositionProps, "zIndex">> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: ExplicitUnion<keyof JSX.IntrinsicElements | React.ComponentType<any>>;
  /** String to set Box content break strategy. Note "anywhere" is not supported in Safari */
  overflowWrap?: ExplicitUnion<OverflowWrap>;
  /** scroll styling attribute */
  scrollVariant?: ExplicitUnion<ScrollVariant>;
  /** set the box-sizing attribute of the Box component */
  boxSizing?: ExplicitUnion<BoxSizing>;
  /** Allows a tabindex to be specified */
  tabIndex?: number | string;
  /** Gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." */
  gap?: ExplicitUnion<Gap>;
  /** Column gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." */
  columnGap?: ExplicitUnion<Gap>;
  /** Row gap an integer multiplier of the base spacing constant (8px) or any valid CSS string." */
  rowGap?: ExplicitUnion<Gap>;
}

const Box = styled.div<BoxProps>`
  ${space}
  ${layout}
  ${flexbox}
  ${position}

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
`;

Box.defaultProps = {
  theme: BaseTheme,
};

Box.displayName = "Box";
export default Box;
