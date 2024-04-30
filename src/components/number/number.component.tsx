import React, { useRef } from "react";
import Textbox, { TextboxProps } from "../textbox";
import Logger from "../../__internal__/utils/logger";
import {
  ALIGN_DEFAULT,
  LABEL_VALIDATION_DEFAULT,
  LABEL_WIDTH_DEFAULT,
  SIZE_DEFAULT,
} from "../textbox/textbox.component";

let deprecateUncontrolledWarnTriggered = false;

export interface NumberProps extends Omit<TextboxProps, "value"> {
  /** Value passed to the input */
  value?: string;
}

function isValidNumber(value: string) {
  const regex = new RegExp("^[-]?[0-9]*$");
  const result = regex.test(value);

  return result;
}

export const Number = React.forwardRef(
  (
    {
      onChange,
      onKeyDown,
      value,
      align = ALIGN_DEFAULT,
      labelWidth = LABEL_WIDTH_DEFAULT,
      size = SIZE_DEFAULT,
      validationOnLabel = LABEL_VALIDATION_DEFAULT,
      ...rest
    }: NumberProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const selectionStart = useRef<null | number>(null);
    const selectionEnd = useRef<null | number>(null);

    if (!deprecateUncontrolledWarnTriggered && !onChange) {
      deprecateUncontrolledWarnTriggered = true;
      Logger.deprecate(
        "Uncontrolled behaviour in `Number` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
      );
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isValidNumber(event.target.value) && onChange) {
        onChange(event);
      } else {
        event.target.value = value || "";
        event.target.setSelectionRange(
          selectionStart.current,
          selectionEnd.current,
        );
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      selectionStart.current = (
        event.target as HTMLInputElement
      ).selectionStart;
      selectionEnd.current = (event.target as HTMLInputElement).selectionEnd;

      if (onKeyDown) {
        onKeyDown(event);
      }
    };
    return (
      <Textbox
        {...rest}
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        ref={ref}
        align={align}
        labelWidth={labelWidth}
        size={size}
        validationOnLabel={validationOnLabel}
      />
    );
  },
);

Number.displayName = "Number";

export default Number;
