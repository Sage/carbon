import React, { useRef, useState } from "react";
import { TextboxProps } from "../textbox";
import { StyledPassword, HiddenAriaLive } from "./password.style";
import guid from "../../__internal__/utils/helpers/guid";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";
import ButtonMinor from "../button-minor/button-minor.component";

export interface PasswordProps extends Omit<TextboxProps, "data-component"> {
  /** When `true` input `type` is `password` and text is obscured. */
  forceObscurity?: boolean;
}

export const Password = ({
  id,
  disabled,
  forceObscurity = false,
  ...rest
}: PasswordProps) => {
  const internalInputId = useRef(id || guid());
  const l = useLocale();

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
          aria-label={visibleInput ? "Hide password" : "Show password"}
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
          {visibleInput ? "Hide" : "Show"}
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
