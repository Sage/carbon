import { createContext } from "react";

export interface TextInputContextProps {
  /** Indicates whether the `Textbox` is rendered via `TextInput` */
  isInTextInput: boolean;
}

export default createContext<TextInputContextProps>({
  isInTextInput: false,
});
