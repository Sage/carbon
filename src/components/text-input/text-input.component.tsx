import React, { ForwardedRef, forwardRef } from "react";
import Textbox, {
  TextboxProps,
  CommonTextboxProps,
} from "../textbox/textbox.component";
import TextInputContext from "./__internal__/text-input.context";

export const TextInput = forwardRef<HTMLInputElement, TextboxProps>(
  (props, ref: ForwardedRef<HTMLInputElement>) => (
    <TextInputContext.Provider value={{ isInTextInput: true }}>
      <Textbox {...props} ref={ref} />
    </TextInputContext.Provider>
  ),
);

export default TextInput;
export type {
  TextboxProps as TextInputProps,
  CommonTextboxProps as CommonTextInputProps,
};
