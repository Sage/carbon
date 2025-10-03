import React, { useContext } from "react";
import StyledButtonMinor from "./button-minor.style";
import { ButtonProps } from "../button";
import ButtonBarContext from "../button-bar/__internal__/button-bar.context";
import BatchSelectionContext from "../batch-selection/__internal__/batch-selection.context";
import Logger from "../../__internal__/utils/logger";

export interface ButtonMinorProps extends ButtonProps {
  /** @private @ignore */
  isInPassword?: boolean;
}

let deprecationWarningTriggered = false;

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
    ref,
  ) => {
    const {
      buttonType: buttonTypeContext,
      size: sizeContext,
      iconPosition: iconPositionContext,
      fullWidth: fullWidthContext,
    } = useContext(ButtonBarContext);
    const { batchSelectionDisabled } = useContext(BatchSelectionContext);

    const buttonType = buttonTypeContext || buttonTypeProp;
    const size = sizeContext || sizeProp;
    const iconPosition = iconPositionContext || iconPositionProp;
    const fullWidth = fullWidthContext || fullWidthProp;
    const isDisabled = disabled || batchSelectionDisabled;

    if (!deprecationWarningTriggered) {
      Logger.deprecate(
        "The `ButtonMinor` component is deprecated and will soon be removed.",
      );
      deprecationWarningTriggered = true;
    }

    return (
      <StyledButtonMinor
        ref={ref}
        data-component="button-minor"
        size={size}
        fullWidth={fullWidth}
        iconPosition={iconPosition}
        buttonType={buttonType}
        disabled={isDisabled}
        destructive={destructive}
        {...rest}
      />
    );
  },
);

ButtonMinor.displayName = "ButtonMinor";

export default ButtonMinor;
