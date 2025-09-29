import React from "react";

export interface RadioButtonGroupContextType {
  inline?: boolean;
  error?: boolean;
  warning?: boolean;
  name?: string;
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const RadioButtonGroupContext =
  React.createContext<RadioButtonGroupContextType>({});

export default RadioButtonGroupContext;
