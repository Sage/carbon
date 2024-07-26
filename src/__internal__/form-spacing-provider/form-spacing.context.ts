import React from "react";

export interface FormSpacingContextProps {
  marginBottom?: string;
}

export const FormSpacingContext = React.createContext<FormSpacingContextProps>(
  {},
);
