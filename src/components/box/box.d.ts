import * as React from "react";
import { StyledComponentProps } from "styled-components";
import { ColorProps, FlexboxProps, LayoutProps, SpaceProps } from "styled-system";

export interface BoxProps
  extends SpaceProps,
    ColorProps,
    LayoutProps,
    FlexboxProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  overflowWrap?: "break-word" | "anywhere";
  scrollVariant?: "light" | "dark";
}

/**
 * HTML color prop have to be removed from the StyledComponentProps
 * as it's type conflicts with StyledSystem color prop
 */
type PropsWithoutColor = Omit<StyledComponentProps<"div", {}, BoxProps, "">, "color">;

declare function Box(attrs: PropsWithoutColor & ColorProps): JSX.Element;

export default Box;
