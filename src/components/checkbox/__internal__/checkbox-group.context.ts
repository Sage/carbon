import React from "react";

type CheckboxGroupContext = {
  inline?: boolean;
  error?: boolean;
  warning?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  required?: boolean;
};

export default React.createContext<CheckboxGroupContext>({});
