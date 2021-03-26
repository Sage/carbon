import * as React from "react";
import { StyledComponentProps } from "styled-components";
import {
  SpacingProps,
  ColorProps,
  LayoutProps,
  FlexBoxProps,
} from "../../utils/helpers/options-helper";

export interface BoxProps
  extends SpacingProps,
    ColorProps,
    LayoutProps,
    FlexBoxProps {
  as?: React.ElementType;
  overflowWrap?: "break-word" | "anywhere";
  scrollVariant?: "light" | "dark";
}

declare function Box(attrs: StyledComponentProps<"div", {}, BoxProps, "">): JSX.Element;

export default Box;
