import createStrictContext from "../../../../__internal__/utils/createStrictContext";

type ButtonToggleGroupContextType = {
  handleKeyDown: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
  pressedButtonValue?: string;
  onChange?: (ev: React.MouseEvent<HTMLButtonElement>, value?: string) => void;
  allowDeselect: boolean;
  isDisabled: boolean;
  firstButton?: HTMLButtonElement;
  childButtonCallbackRef?: (button: HTMLButtonElement | null) => void;
  /** Identifier for the hint text, if it exists, that is rendered by ButtonToggleGroup */
  hintTextId?: string;
  size: "small" | "medium" | "large";
  fullWidth?: boolean;
};

const [ButtonToggleGroupProvider, useButtonToggleGroupContext] =
  createStrictContext<ButtonToggleGroupContextType>({
    name: "ButtonToggleGroupContext",
    errorMessage:
      "Carbon ButtonToggleGroup: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {
      handleKeyDown: /* istanbul ignore next */ () => {},
      pressedButtonValue: undefined,
      allowDeselect: false,
      isDisabled: false,
      size: "medium",
    },
  });

export { ButtonToggleGroupProvider, useButtonToggleGroupContext };
