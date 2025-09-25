import React, { useRef, useState } from "react";
import { TextboxProps } from "../textbox";
import { StyledPassword, HiddenAriaLive } from "./password.style";
import guid from "../../__internal__/utils/helpers/guid";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";
import ButtonMinor from "../button-minor/button-minor.component";
import Logger from "../../__internal__/utils/logger";

export interface PasswordProps
  extends Omit<TextboxProps, "data-component" | "prefix" | "characterLimit"> {
  /** When `true` input `type` is `password` and text is obscured. */
  forceObscurity?: boolean;
  /** @deprecated Emphasized part of the displayed text */
  prefix?: string;
  /** @deprecated Character limit of the textarea */
  characterLimit?: number;
}

let deprecatePrefixWarningTriggered = false;
let deprecateCharacterLimitWarningTriggered = false;

export const Password = ({
  id,
  disabled,
  forceObscurity = false,
  prefix,
  characterLimit,
  ...rest
}: PasswordProps) => {
  const internalInputId = useRef(id || guid());
  const l = useLocale();

  if (!deprecatePrefixWarningTriggered && prefix !== undefined) {
    Logger.deprecate(
      `The 'prefix' prop in Password is deprecated and will soon be removed.`,
    );
    deprecatePrefixWarningTriggered = true;
  }
  if (
    !deprecateCharacterLimitWarningTriggered &&
    characterLimit !== undefined
  ) {
    Logger.deprecate(
      `The 'characterLimit' prop in Password is deprecated and will soon be removed.`,
    );
    deprecateCharacterLimitWarningTriggered = true;
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const visibleInput = !forceObscurity && passwordShown;
  return (
    <>
      <StyledPassword
        data-element="styled-password-container"
        id={internalInputId.current}
        autoComplete="off"
        type={visibleInput ? "text" : "password"}
        disabled={disabled}
        {...rest}
        {...tagComponent("password", rest)}
      >
        <ButtonMinor
          aria-label={
            visibleInput
              ? l.password?.ariaLabelHide?.()
              : l.password?.ariaLabelShow?.()
          }
          aria-controls={internalInputId.current}
          onClick={() => setPasswordShown(!passwordShown)}
          pr={1}
          buttonType="tertiary"
          iconType={visibleInput ? "hide" : "view"}
          iconPosition="before"
          size="small"
          disabled={forceObscurity || disabled}
          isInPassword
        >
          {visibleInput
            ? l.password?.buttonLabelHide?.()
            : l.password?.buttonLabelShow?.()}
        </ButtonMinor>
      </StyledPassword>
      <HiddenAriaLive role="status" aria-live="polite">
        {visibleInput
          ? l.password.ariaLiveShownMessage()
          : l.password.ariaLiveHiddenMessage()}
      </HiddenAriaLive>
    </>
  );
};

export default Password;
