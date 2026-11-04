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
  /** Whether the active indicator is currently moving between toggles */
  isIndicatorSliding?: boolean;
  /** Whether the focused toggle was selected with a mouse after its animation completed. */
  showMouseFocus?: boolean;
  /** Records a mouse selection before the controlled value updates. */
  registerSelectionInteraction?: (
    value: string | undefined,
    isMouseClick: boolean,
  ) => void;
  /** Removes focus styling from a previous mouse selection. */
  clearMouseFocus?: () => void;
};

export default React.createContext<ButtonToggleGroupContext>({});
