import React from "react";

import { ButtonToggle, ButtonToggleProps } from "../../../../button-toggle";
import Icon from "../../../../icon";

type ToolbarNativeButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onMouseDown" | "tabIndex" | "type"
>;

// Widens ButtonToggleProps with native button attributes needed in the toolbar context
// (onMouseDown, tabIndex, type) without exposing them on ButtonToggle's public API.
type ToolbarButtonToggleProps = ButtonToggleProps & ToolbarNativeButtonProps;

const ToolbarButtonToggle = ({
  onClick,
  buttonIcon,
  ...props
}: ToolbarButtonToggleProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.focus({ preventScroll: true });
    onClick?.(event);
  };

  if (buttonIcon && props.size === "small") {
    return (
      <ButtonToggle {...props} onClick={handleClick}>
        <Icon aria-hidden type={buttonIcon} size="extra-small" />
      </ButtonToggle>
    );
  }

  return (
    <ButtonToggle {...props} buttonIcon={buttonIcon} onClick={handleClick} />
  );
};

export default ToolbarButtonToggle;
