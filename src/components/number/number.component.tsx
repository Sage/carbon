import React, { useRef } from "react";
import Textbox, { TextboxProps } from "../textbox";
import Logger from "../../__internal__/utils/logger";

let deprecateInputRefWarnTriggered = false;
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
    { onChange, onKeyDown, value, inputRef, ...rest }: NumberProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const selectionStart = useRef<null | number>(null);
    const selectionEnd = useRef<null | number>(null);

    if (!deprecateInputRefWarnTriggered && inputRef) {
      deprecateInputRefWarnTriggered = true;
      Logger.deprecate(
        "The `inputRef` prop in `Number` component is deprecated and will soon be removed. Please use `ref` instead."
      );
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isValidNumber(event.target.value) && onChange) {
        onChange(event);
      } else {
        event.target.value = value || "";
        event.target.setSelectionRange(
          selectionStart.current,
          selectionEnd.current
        );
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      selectionStart.current = (event.target as HTMLInputElement).selectionStart;
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
        inputRef={inputRef}
      />
    );
  }
);

Number.displayName = "Number";

export default Number;
