import React, { useRef } from "react";
import Textbox, { TextboxProps } from "../textbox";

export interface NumberProps extends Omit<TextboxProps, "value"> {
  /** Value passed to the input */
  value?: string;
}

function isValidNumber(value: string) {
  const regex = new RegExp("^[-]?[0-9]*$");
  const result = regex.test(value);

  return result;
}

export const Number = ({
  onChange,
  onKeyDown,
  value,
  ...rest
}: NumberProps) => {
  const selectionStart = useRef<null | number>(null);
  const selectionEnd = useRef<null | number>(null);

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
    />
  );
};

export default Number;
