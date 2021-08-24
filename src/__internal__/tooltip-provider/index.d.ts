import * as React from "react";

export interface ToolbarContextProps {
  tooltipPosition: "top" | "bottom" | "left" | "right";
}

export interface TooltipProviderProps {
  /** The position to display the tooltip */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Control whether the tooltip is visible */
  children: React.ReactNode;
}

declare const ToolbarContext: React.Context<ToolbarContextProps>;

declare function TooltipProvider(props: TooltipProviderProps): JSX.Element;

export { ToolbarContext };

export default TooltipProvider;
