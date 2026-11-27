import React from "react";
import useIdPolyfill from "../../hooks/__internal__/useIdPolyfill";

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
  tooltipId?: string;
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
  const tooltipId = useIdPolyfill();

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
