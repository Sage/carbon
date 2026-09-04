import React from "react";

import { ButtonToggle, ButtonToggleProps } from "../../../../button-toggle";

type ToolbarNativeButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onMouseDown" | "tabIndex" | "type"
>;

// Widens ButtonToggleProps with native button attributes needed in the toolbar context
// (onMouseDown, tabIndex, type) without exposing them on ButtonToggle's public API.
type ToolbarButtonToggleProps = ButtonToggleProps & ToolbarNativeButtonProps;

const ToolbarButtonToggle = ({
  onClick,
  ...props
}: ToolbarButtonToggleProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.focus({ preventScroll: true });
    onClick?.(event);
  };

  return <ButtonToggle {...props} onClick={handleClick} />;
};

export default ToolbarButtonToggle;
