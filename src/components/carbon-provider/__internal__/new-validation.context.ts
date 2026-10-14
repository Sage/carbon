import React from "react";

export interface NewValidationContextProps {
  /** Feature flag for opting in to the latest validation designs for components that support it.
   *
   * @deprecated The new validation designs have been implemented across the library and this flag
   * is no longer required. It will be removed in a future release, you can safely stop passing it. */
  validationRedesignOptIn?: boolean;
}

export default React.createContext<NewValidationContextProps>({});
