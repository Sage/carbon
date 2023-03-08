import React from "react";
import {
  FormSpacingContext,
  FormSpacingContextProps,
} from "./form-spacing-context";

interface FormSpacingProviderProps extends FormSpacingContextProps {
  children: React.ReactNode;
}

const FormSpacingProvider = ({
  marginBottom,
  children,
}: FormSpacingProviderProps) => (
  <FormSpacingContext.Provider value={{ marginBottom }}>
    {children}
  </FormSpacingContext.Provider>
);

export default FormSpacingProvider;
