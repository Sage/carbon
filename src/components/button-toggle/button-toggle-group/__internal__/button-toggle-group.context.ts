import React from "react";

type ButtonToggleGroupContext = {
  handleKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
  pressedButtonValue?: string;
  onChange?: (ev: React.MouseEvent<HTMLButtonElement>, value?: string) => void;
  allowDeselect?: boolean;
  isDisabled?: boolean;
  firstButton?: HTMLButtonElement;
  childButtonCallbackRef?: (button: HTMLButtonElement | null) => void;
  /** Identifier for the hint text, if it exists, that is rendered by ButtonToggleGroup */
  hintTextId?: string;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
};

export default React.createContext<ButtonToggleGroupContext>({});
