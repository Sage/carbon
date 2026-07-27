import React from "react";
import type { CheckboxSizes } from "../checkbox-group/checkbox-group.component";

type CheckboxGroupContext = {
  inline?: boolean;
  error?: boolean;
  warning?: boolean;
  size?: CheckboxSizes;
  disabled?: boolean;
  required?: boolean;
};

export default React.createContext<CheckboxGroupContext>({});
