import * as React from "react";

export type PortraitShapes = "circle" | "square";

export type PortraitSizes = "XS" | "S" | "M" | "ML" | "L" | "XL" | "XXL";

export interface PortraitBaseProps {
  /** The size of the Portrait. */
  size?: PortraitSizes;
  /** The `alt` HTML string. */
  alt?: string;
  /** The shape of the Portrait. */
  shape?: PortraitShapes;
  /** The initials to render in the Portrait. */
  initials?: string;
  /** Use a dark background. */
  darkBackground?: boolean;
  /** Prop for `onClick` events. */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** The message to be displayed within the tooltip */
  tooltipMessage?: React.ReactNode;
  /** The id attribute to use for the tooltip */
  tooltipId?: string;
  /** Whether to to show the Tooltip */
  tooltipIsVisible?: boolean;
  /** Sets position of the tooltip */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Defines the message type */
  tooltipType?: string;
  /** Defines the size of the tooltip content */
  tooltipSize?: "medium" | "large";
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor?: string;
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor?: string;
}

export interface PortraitWithGravatar extends PortraitBaseProps {
  /** An email address registered with Gravatar. */
  gravatar?: string;
  src?: never;
}

export interface PortraitWithSrc extends PortraitBaseProps {
  /** A custom image URL. */
  src?: string;
  gravatar?: never;
}

export type PortraitProps = PortraitWithGravatar | PortraitWithSrc;

declare function Portrait(props: PortraitProps): JSX.Element;

export default Portrait;
