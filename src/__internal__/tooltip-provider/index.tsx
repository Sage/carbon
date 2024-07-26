import React, { useRef } from "react";
import guid from "../utils/helpers/guid";

interface TooltipProviderProps {
  /** The position to display the tooltip */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Control whether the tooltip is visible */
  children: React.ReactNode;
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
  focusable?: boolean;
  tooltipVisible?: boolean;
  disabled?: boolean;
  target?: HTMLElement;
}
interface ToolbarContextProps extends Omit<TooltipProviderProps, "children"> {
  tooltipId?: {
    current: string;
  };
}

export const TooltipContext: React.Context<ToolbarContextProps> =
  React.createContext({});

export const TooltipProvider = ({
  children,
  tooltipPosition,
  helpAriaLabel,
  focusable,
  tooltipVisible,
  disabled,
  target,
}: TooltipProviderProps) => {
  const tooltipId = useRef(guid());

  return (
    <TooltipContext.Provider
      value={{
        tooltipPosition,
        helpAriaLabel,
        focusable,
        tooltipVisible,
        disabled,
        tooltipId,
        target,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
};
