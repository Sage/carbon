import React, { useContext } from "react";
import StyledButtonMinor from "./button-minor.style";
import { ButtonProps } from "../button";
import { ButtonBarContext } from "../button-bar/button-bar.component";
<<<<<<< HEAD
=======

export interface ButtonMinorProps extends ButtonProps {
  /** @private @ignore */
  isInPassword?: boolean;
}
>>>>>>> 25c2c6b51 (feat(button-minor): rebase)

export const ButtonMinor = ({
  buttonType: buttonTypeProp = "secondary",
  size: sizeProp = "medium",
  iconPosition: iconPositionProp = "before",
  fullWidth: fullWidthProp = false,
  ...rest
<<<<<<< HEAD
<<<<<<< HEAD
}: ButtonMinorProps) => {
=======
}: ButtonProps) => {
>>>>>>> 25c2c6b51 (feat(button-minor): rebase)
=======
}: ButtonMinorProps) => {
>>>>>>> daa547837 (feat(button-minor): review)
  const {
    buttonType: buttonTypeContext,
    size: sizeContext,
    iconPosition: iconPositionContext,
    fullWidth: fullWidthContext,
  } = useContext(ButtonBarContext);

  const buttonType = buttonTypeContext || buttonTypeProp;
  const size = sizeContext || sizeProp;
  const iconPosition = iconPositionContext || iconPositionProp;
  const fullWidth = fullWidthContext || fullWidthProp;
  return (
    <StyledButtonMinor
      data-component="button-minor"
      size={size}
      fullWidth={fullWidth}
      iconPosition={iconPosition}
      buttonType={buttonType}
      {...rest}
    />
  );
};

ButtonMinor.displayName = "ButtonMinor";

export default ButtonMinor;
