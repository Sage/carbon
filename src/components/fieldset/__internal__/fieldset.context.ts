import React from "react";

type FieldsetContextType = {
  size?: "small" | "medium" | "large";
  hasError?: boolean;
  required?: boolean;
};

export default React.createContext<FieldsetContextType>({});
