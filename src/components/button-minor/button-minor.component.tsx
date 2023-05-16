import React from "react";
import StyledButtonMinor from "./button-minor.style";
import { ButtonProps } from "../button";

export interface ButtonMinorProps extends ButtonProps {
  /** @private @ignore */
  isInPassword?: boolean;
}

export const ButtonMinor = ({
  buttonType = "secondary",
  size = "medium",
  isInPassword,
  ...rest
}: ButtonMinorProps) => (
  <StyledButtonMinor
    size={size}
    buttonType={buttonType}
    isInPassword={isInPassword}
    {...rest}
  />
);

ButtonMinor.displayName = "ButtonMinor";

export default ButtonMinor;
