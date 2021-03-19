import * as React from "react";
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

declare const Box: React.FunctionComponent<BoxProps>;
export default Box;
