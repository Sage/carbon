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
import BaseTheme from "../../style/themes/base";
import styledColor from "../../style/utils/color";
import boxConfig from "./box.config";

export type OverflowWrap = "break-word" | "anywhere";
export type ScrollVariant = "light" | "dark";
export type BoxSizing = "content-box" | "border-box";

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
`;

Box.defaultProps = {
  theme: BaseTheme,
};

export default Box;
