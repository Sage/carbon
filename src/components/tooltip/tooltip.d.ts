import * as React from "react";

export interface TooltipProps {
  /** The message to be displayed within the tooltip */
  message: React.ReactNode;
  /** The id attribute to use for the tooltip */
  id?: string;
  /** Whether to to show the Tooltip */
  isVisible?: boolean;
  /** Sets position of the tooltip */
  position?: "top" | "bottom" | "left" | "right";
  /** Defines the message type */
  type?: string;
  /** Children elements */
  children: React.ReactNode;
  /** Defines the size of the tooltip content */
  size?: "small" | "large";
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  bgColor?: string;
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  fontColor?: string;
  /**
   * Overrides the default flip behaviour of the Tooltip,
   * must be an array containing some or all of ["top", "bottom", "left", "right"]
   * (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements)
   */
  flipOverrides?: ["top" | "bottom" | "left" | "right"];
}

export interface TooltipInternalProps extends TooltipProps {
  isPartOfInput?: boolean;
  inputSize?: "extra-small" | "small" | "medium" | "large";
}

declare function Tooltip(
  props: TooltipProps & React.RefAttributes<HTMLDivElement>
): JSX.Element;

export default Tooltip;
