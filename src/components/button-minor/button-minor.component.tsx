import React from "react";
import StyledButtonMinor from "./button-minor.style";
import { ButtonProps } from "../button";

export const ButtonMinor = ({
  buttonType = "secondary",
  size = "medium",
  ...rest
}: ButtonProps) => (
  <StyledButtonMinor size={size} buttonType={buttonType} {...rest} />
);

ButtonMinor.displayName = "ButtonMinor";

export default ButtonMinor;
