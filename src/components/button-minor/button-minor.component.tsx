import React, { useContext } from "react";
import StyledButtonMinor from "./button-minor.style";
import { ButtonProps } from "../button";
import { ButtonBarContext } from "../button-bar/button-bar.component";

export const ButtonMinor = ({
  buttonType: buttonTypeProp = "secondary",
  size = "medium",
  ...rest
}: ButtonProps) => {
  const {
    buttonType: buttonTypeContext,
    // size: sizeContext,
    // iconPosition: iconPositionContext,
    // fullWidth: fullWidthContext,
  } = useContext(ButtonBarContext);

  const buttonType = buttonTypeContext || buttonTypeProp;
  return (
    <StyledButtonMinor
      data-component="button-minor"
      size={size}
      buttonType={buttonType}
      {...rest}
    />
  );
};

ButtonMinor.displayName = "ButtonMinor";

export default ButtonMinor;
