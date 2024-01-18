import React from "react";
import {
  StyledButtonToggleIcon,
  StyledButtonToggleIconProps,
} from "./button-toggle.style";
import Icon, { IconType } from "../icon";

export interface ButtonToggleIconProps extends StyledButtonToggleIconProps {
  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * buttonIcon to render.
   */
  buttonIcon: IconType;
  /** Sets the icon in the disabled state */
  disabled?: boolean;
}

const ButtonToggleIcon = ({
  buttonIcon,
  buttonIconSize,
  disabled,
  hasContent,
}: ButtonToggleIconProps) => (
  <StyledButtonToggleIcon
    buttonIconSize={buttonIconSize}
    hasContent={hasContent}
  >
    <Icon
      aria-hidden
      type={buttonIcon}
      fontSize={buttonIconSize}
      disabled={disabled}
    />
  </StyledButtonToggleIcon>
);

export default ButtonToggleIcon;
