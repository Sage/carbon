import React from "react";

type ButtonToggleGroupContextType = {
  onButtonClick: (value: string) => void;
  handleKeyDown: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
  pressedButtonValue?: string;
  onChange?: (ev: React.MouseEvent<HTMLButtonElement>, value?: string) => void;
  allowDeselect?: boolean;
  isInGroup: boolean;
  isDisabled?: boolean;
  firstButton?: HTMLButtonElement;
  childButtonCallbackRef?: (button: HTMLButtonElement | null) => void;
  /** Identifier for the hint text, if it exists, that is rendered by ButtonToggleGroup */
  hintTextId?: string;
};

export default React.createContext<ButtonToggleGroupContextType>({
  onButtonClick: /* istanbul ignore next */ () => {},
  handleKeyDown: /* istanbul ignore next */ () => {},
  pressedButtonValue: undefined,
  allowDeselect: false,
  isInGroup: false,
  isDisabled: false,
});
