import React from "react";

export interface NewValidationContextProps {
  /** Feature flag for opting in to the latest validation designs for components that support it.
   *
   * NOTE - Will eventually be set to `true` by default in the future. */
  validationRedesignOptIn?: boolean;
}

export default React.createContext<NewValidationContextProps>({});
