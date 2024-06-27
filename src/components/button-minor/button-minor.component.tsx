import React, { useContext } from "react";
import StyledButtonMinor from "./button-minor.style";
import { ButtonProps } from "../button";
import ButtonBarContext from "../button-bar/__internal__/button-bar.context";

export interface ButtonMinorProps extends ButtonProps {
  /** @private @ignore */
  isInPassword?: boolean;
}

export const ButtonMinor = React.forwardRef<
  HTMLButtonElement,
  ButtonMinorProps
>(
  (
    {
      buttonType: buttonTypeProp = "secondary",
      disabled = false,
      destructive = false,
      size: sizeProp = "medium",
      iconPosition: iconPositionProp = "before",
      fullWidth: fullWidthProp = false,
      ...rest
    }: ButtonMinorProps,
    ref
  ) => {
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
        ref={ref}
        data-component="button-minor"
        size={size}
        fullWidth={fullWidth}
        iconPosition={iconPosition}
        buttonType={buttonType}
        disabled={disabled}
        destructive={destructive}
        {...rest}
      />
    );
  }
);

ButtonMinor.displayName = "ButtonMinor";

export default ButtonMinor;
