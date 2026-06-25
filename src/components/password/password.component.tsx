import React, { useRef, useState } from "react";
import HiddenAriaLive from "./password.style";
import Button from "../button/__next__/button.component";
import guid from "../../__internal__/utils/helpers/guid";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";
import Divider from "../divider";
import TextInput, { TextInputProps } from "../textbox/__internal__/__next__";

export interface PasswordProps extends Omit<TextInputProps, "data-component"> {
  /** When `true` input `type` is `password` and text is obscured. */
  forceObscurity?: boolean;
  /** @deprecated `characterLimit` has been deprecated and will be removed in a future release. */
  characterLimit?: number;
  /** @deprecated `prefix` has been deprecated and will be removed in a future release. */
  prefix?: string;
}

const Password = ({
  id,
  disabled,
  forceObscurity = false,
  inputIcon,
  size,
  ...rest
}: PasswordProps) => {
  const internalInputId = useRef(id || guid());
  const l = useLocale();

  const [passwordShown, setPasswordShown] = useState(false);
  const visibleInput = !forceObscurity && passwordShown;

  return (
    <>
      <TextInput
        data-element="styled-password-container"
        id={internalInputId.current}
        autoComplete="off"
        type={visibleInput ? "text" : "password"}
        disabled={disabled}
        size={size}
        {...rest}
        {...tagComponent("password", rest)}
        inputIcon={
          <>
            <Divider
              aria-hidden
              data-role="password-divider"
              height={`calc(100% - var(--global-space-comp-${size?.charAt(0) || "m"}))`}
              p={0}
              type="vertical"
            />
            <Button
              aria-label={
                visibleInput
                  ? l.password?.ariaLabelHide?.()
                  : l.password?.ariaLabelShow?.()
              }
              aria-controls={internalInputId.current}
              onClick={() => setPasswordShown(!passwordShown)}
              pr={1}
              variantType="subtle"
              iconType={visibleInput ? "hide" : "view"}
              iconPosition="before"
              size={size}
              disabled={forceObscurity || disabled}
            >
              {visibleInput
                ? l.password?.buttonLabelHide?.()
                : l.password?.buttonLabelShow?.()}
            </Button>
          </>
        }
      ></TextInput>
      <HiddenAriaLive role="status" aria-live="polite">
        {visibleInput
          ? l.password.ariaLiveShownMessage()
          : l.password.ariaLiveHiddenMessage()}
      </HiddenAriaLive>
    </>
  );
};

export default Password;
