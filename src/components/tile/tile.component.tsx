import React from "react";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import { SpaceProps, WidthProps } from "styled-system";
import { StyledTile, TileContent } from "./tile.style";

type DesignTokensType = keyof typeof DesignTokens;

export interface TileProps extends SpaceProps, WidthProps {
  /** Sets the theme of the tile - either 'tile', 'transparent' or 'active' */
  variant?: "tile" | "transparent" | "active";
  /**
   * The content to render within the tile. Each child will be wrapped with
   * a TileContent wrapper, which allows any individual child component to take a
   * percentage-based width prop, dictating the percentage of the tile width it will take up.
   *
   * Width will have no effect on a child component if the tile orientation is set to 'vertical'.
   */
  children?: React.ReactNode;
  /** The orientation of the tile - set to either horizontal or vertical */
  orientation?: "horizontal" | "vertical";
  /**
   * Set a percentage-based width for the whole Tile component, relative to its parent.
   * If unset or zero, this will default to 100%.
   */
  width?: string | number;
  /** Sets the border width by using these design tokens */
  borderWidth?: Extract<DesignTokensType, `borderWidth${string}`>;
  /** Sets the border variant that should be used */
  borderVariant?:
    | "default"
    | "selected"
    | "positive"
    | "negative"
    | "caution"
    | "info";
  /** Sets the level of roundness of the corners, "default" is 8px and "large" is 16px */
  roundness?: "default" | "large";
}

export const Tile = ({
  variant = "tile",
  p = 3,
  children,
  orientation = "horizontal",
  width,
  roundness = "default",
  ...props
}: TileProps) => {
  const isHorizontal = orientation === "horizontal";
  const isVertical = orientation === "vertical";
  const wrappedChildren = React.Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }

    // istanbul ignore if
    if (!React.isValidElement(child)) {
      return child;
    }

    const { width: contentWidth, ...childProps } = child.props;
    const key = child.key || `tile-content-${index + 1}`;

    return (
      <TileContent
        key={key}
        width={contentWidth}
        isHorizontal={isHorizontal}
        isVertical={isVertical}
        {...(isVertical && {
          pt: props.pt || props.py || p,
          pb: props.pb || props.py || p,
        })}
        {...(isHorizontal && {
          pr: props.pr || props.px || p,
          pl: props.pl || props.px || p,
        })}
      >
        {React.cloneElement(child, childProps)}
      </TileContent>
    );
  });

  return (
    <StyledTile
      variant={variant}
      width={width}
      data-component="tile"
      isHorizontal={isHorizontal}
      p={p}
      roundness={roundness}
      {...props}
    >
      {wrappedChildren}
    </StyledTile>
  );
};

export default Tile;
