import React from "react";
import createStrictContext from "../../../__internal__/utils/createStrictContext";

interface RadioButtonGroupContextType {
  inline?: boolean;
  error?: boolean;
  name?: string;
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  size: "small" | "medium" | "large";
  disabled?: boolean;
  required?: boolean;
}

const [RadioButtonGroupProvider, useRadioButtonGroupContext] =
  createStrictContext<RadioButtonGroupContextType>({
    name: "RadioButtonGroupContext",
    errorMessage:
      "Carbon RadioButtonGroup: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {
      size: "medium",
    },
  });

export { RadioButtonGroupProvider, useRadioButtonGroupContext };
