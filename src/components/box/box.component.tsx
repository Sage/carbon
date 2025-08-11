import React from "react";
import {
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
  GridProps,
} from "styled-system";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import { Gap } from "style/utils/box-gap";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
  filterStyledSystemLayoutProps,
  filterStyledSystemFlexboxProps,
  filterStyledSystemGridProps,
} from "../../style/utils";
import StyledBox from "./box.style";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

export type OverflowWrap = "break-word" | "anywhere";
export type ScrollVariant = "light" | "dark";
export type BoxSizing = "content-box" | "border-box";

type DesignTokensType = keyof typeof DesignTokens;
type BoxShadowsType = Extract<DesignTokensType, `boxShadow${string}`>;
export type BorderRadiusType = Extract<
  DesignTokensType,
  `borderRadius${string}`
>;

export interface BoxProps
  extends FlexboxProps,
    Omit<GridProps, "gridGap" | "gridRowGap" | "gridColumnGap">,
    LayoutProps,
    Omit<PositionProps, "zIndex">,
    SpaceProps,
    TagProps {
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
  /**
   * @private
   * @ignore
   * @internal
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /** Set the color attribute of the Box component */
  color?: string;
  /** Set the bg attribute of the Box component */
  bg?: string;
  /** Set the backgroundColor attribute of the Box component */
  backgroundColor?: string;
  /** Whether the component is hidden from view. In this state, the component will not be visible to users but will remain in the HTML document */
  hidden?: boolean;
  /** Set the opacity attribute of the Box component */
  opacity?: string | number;
  /** Set the container to be hidden from screen readers */
  "aria-hidden"?: "true" | "false";
  /** @private @internal @ignore */
  "data-component"?: string;
  /** @private @internal @ignore */
  tabIndex?: number;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      "data-component": dataComponent,
      tabIndex,
      as,
      id,
      role,
      overflowWrap,
      scrollVariant,
      boxSizing,
      gap,
      columnGap,
      rowGap,
      className,
      children,
      bg,
      backgroundColor,
      boxShadow,
      borderRadius,
      color,
      opacity,
      height,
      width,
      hidden,
      "aria-hidden": ariaHidden,
      ...rest
    }: BoxProps,
    ref,
  ) => {
    let actualWidth = "";
    if (typeof width === "number") {
      actualWidth = width <= 1 ? `${(width * 100).toFixed(0)}%` : `${width}px`;
    } else if (typeof width === "string") {
      actualWidth = width;
    }

    let actualHeight = "";
    if (typeof height === "number") {
      actualHeight =
        height <= 1 ? `${(height * 100).toFixed(0)}%` : `${height}px`;
    } else if (typeof height === "string") {
      actualHeight = height;
    }

    const cssProps = {
      color,
      opacity,
      width: actualWidth,
      height: actualHeight,
    };

    return (
      <StyledBox
        as={as}
        id={id}
        role={role}
        overflowWrap={overflowWrap}
        scrollVariant={scrollVariant}
        boxSizing={boxSizing}
        gap={gap}
        columnGap={columnGap}
        rowGap={rowGap}
        className={className}
        ref={ref}
        bg={bg}
        backgroundColor={backgroundColor}
        boxShadow={boxShadow}
        borderRadius={borderRadius}
        aria-hidden={ariaHidden}
        hidden={hidden}
        {...tagComponent(dataComponent, rest)}
        {...filterStyledSystemMarginProps(rest)}
        {...filterStyledSystemPaddingProps(rest)}
        {...filterStyledSystemFlexboxProps(rest)}
        {...filterStyledSystemGridProps(rest)}
        {...filterStyledSystemLayoutProps(rest)}
        cssProps={cssProps}
        tabIndex={tabIndex}
      >
        {children}
      </StyledBox>
    );
  },
);

Box.displayName = "Box";
export default Box;
