import React from "react";
import {
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
} from "styled-system";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
  filterStyledSystemLayoutProps,
  filterOutStyledSystemSpacingProps,
  filterStyledSystemFlexboxProps,
} from "../../style/utils";
import StyledBox from "./box.style";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

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
    TagProps,
    Omit<PositionProps, "zIndex"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  /** Set the ID attribute of the Box component */
  id?: string;
  /** Content to be rendered inside the Box component */
  children?: React.ReactNode;
  /** Set the Role attribute of the Box component */
  role?: string;
  /** String to set Box content break strategy. Note "anywhere" is not supported in Safari */
  overflowWrap?: OverflowWrap;
  /** Scroll styling attribute */
  scrollVariant?: ScrollVariant;
  /** Set the box-sizing attribute of the Box component */
  boxSizing?: BoxSizing;
  /** Allows a tabindex to be specified */
  tabIndex?: number;
  /** Gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." */
  gap?: Gap;
  /** Column gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." */
  columnGap?: Gap;
  /** Row gap an integer multiplier of the base spacing constant (8px) or any valid CSS string." */
  rowGap?: Gap;
  /** Design Token for Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Box component. */
  boxShadow?: BoxShadowsType;
  /** Design Token for Border Radius. Note: please check that the border radius design token you are using is compatible with the Box component. **This prop will not do anything if you have the roundedCornerOptOut flag set in the CarbonProvider** */
  borderRadius?: BorderRadiusType;
  /** @private @ignore */
  className?: string;
  /** Set the color attribute of the Box component */
  color?: string;
  /** Set the bg attribute of the Box component */
  bg?: string;
  /** Set the backgroundColor attribute of the Box component */
  backgroundColor?: string;
  /** Set the opacity attribute of the Box component */
  opacity?: string | number;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      "data-component": dataComponent,
      id,
      role,
      overflowWrap,
      scrollVariant,
      boxSizing,
      tabIndex,
      gap,
      columnGap,
      rowGap,
      className,
      children,
      bg,
      backgroundColor,
      color,
      opacity,
      ...rest
    }: BoxProps,
    ref
  ) => {
    return (
      <StyledBox
        id={id}
        role={role}
        overflowWrap={overflowWrap}
        scrollVariant={scrollVariant}
        boxSizing={boxSizing}
        gap={gap}
        columnGap={columnGap}
        rowGap={rowGap}
        tabIndex={tabIndex}
        className={className}
        ref={ref}
        bg={bg}
        backgroundColor={backgroundColor}
        color={color}
        opacity={opacity}
        {...tagComponent(dataComponent, rest)}
        {...filterOutStyledSystemSpacingProps(rest)}
        {...filterStyledSystemMarginProps(rest)}
        {...filterStyledSystemPaddingProps(rest)}
        {...filterStyledSystemFlexboxProps(rest)}
        {...filterStyledSystemLayoutProps(rest)}
      >
        {children}
      </StyledBox>
    );
  }
);

Box.displayName = "Box";
export default Box;
