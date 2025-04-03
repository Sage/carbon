import { createContext, useContext } from "react";
import Logger from "../../../../__internal__/utils/logger";

type ButtonToggleGroupContextType = {
  onButtonClick: (value: string) => void;
  handleKeyDown: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
  pressedButtonValue?: string;
  onChange?: (ev: React.MouseEvent<HTMLButtonElement>, value?: string) => void;
  allowDeselect?: boolean;
  isDisabled?: boolean;
  firstButton?: HTMLButtonElement;
  childButtonCallbackRef: (button: HTMLButtonElement | null) => void;
  /** Identifier for the hint text, if it exists, that is rendered by ButtonToggleGroup */
  hintTextId?: string;
};

const ButtonToggleGroupContext =
  createContext<ButtonToggleGroupContextType | null>(null);

const useButtonToggleGroup = (errorMessage: string) => {
  const context = useContext(ButtonToggleGroupContext);

  if (!context) {
    Logger.warn(errorMessage);
    return null;
  }

  return context;
};

export { ButtonToggleGroupContext, useButtonToggleGroup };
