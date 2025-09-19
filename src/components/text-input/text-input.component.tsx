import React, { ForwardedRef, forwardRef } from "react";
import Textbox, {
  TextboxProps,
  CommonTextboxProps,
} from "../textbox/textbox.component";

export const TextInput = forwardRef<HTMLInputElement, TextboxProps>(
  (props, ref: ForwardedRef<HTMLInputElement>) => (
    <Textbox {...props} ref={ref} />
  ),
);

export default TextInput;
export type {
  TextboxProps as TextInputProps,
  CommonTextboxProps as CommonTextInputProps,
};
