import React from "react";
import StyledToolbarButton from "./toolbar-button.style";

export interface ToolbarButtonProps {
  /** Accessibility label for a button */
  ariaLabel: string;
  /** The children for the button */
  children: React.ReactNode;
  /** Used to control the button's active status */
  activated?: boolean;
  /** Callback to handle any keydown events on a button */
  onKeyDown: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
  /** Callback to handle any mousedown events on a button */
  onMouseDown: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback to handle any mouseover events on a button */
  onMouseOver?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback to handle any mouseleave events on a button */
  onMouseLeave?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback to handle any focus events on a button */
  onFocus?: (ev: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback to handle any blur events on a button */
  onBlur?: (ev: React.FocusEvent<HTMLButtonElement>) => void;
  /** Controls whether the button can be tabbed to */
  tabbable?: boolean;
}

export const ToolbarButton = React.forwardRef<
  HTMLButtonElement,
  ToolbarButtonProps
>(
  (
    {
      onKeyDown,
      onMouseDown,
      activated,
      ariaLabel,
      tabbable,
      children,
      onMouseOver,
      onMouseLeave,
      onFocus,
      onBlur,
    }: ToolbarButtonProps,
    ref,
  ) => {
    return (
      <StyledToolbarButton
        data-component="text-editor-toolbar-button"
        ref={ref}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        isActive={activated}
        aria-label={ariaLabel}
        aria-pressed={activated}
        {...(!tabbable && { tabIndex: -1 })}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </StyledToolbarButton>
    );
  },
);

ToolbarButton.displayName = "ToolbarButton";

export default ToolbarButton;
