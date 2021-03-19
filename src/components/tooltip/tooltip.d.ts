import * as React from "react";
import { Positions } from "../../utils/helpers/options-helper";

export interface TooltipProps {
  /** The message to be displayed within the tooltip */
  message: React.ReactNode;
  /** The id attribute to use for the tooltip */
  id?: string;
  /** Whether to to show the Tooltip */
  isVisible?: boolean;
  /** Sets position of the tooltip */
  position?: Positions;
  /** Defines the message type */
  type?: string;
  /** Children elements */
  children: React.ReactNode;
  /** Defines the size of the tooltip content */
  size?: "medium" | "large";
  isPartOfInput?: boolean;
  inputSize?: "small" | "medium" | "large";
  bgColor?: string;
  fontColor?: string;
  flipOverrides?: Positions[];
}

declare const Tooltip: React.FunctionComponent<TooltipProps>;

export default Tooltip;
