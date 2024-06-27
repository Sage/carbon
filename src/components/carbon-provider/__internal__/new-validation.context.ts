import React from "react";

export interface NewValidationContextProps {
  /** Feature flag for opting in to the latest validation designs for components that support it.
   *
   * NOTE - Will eventually be set to `true` by default in the future. */
  validationRedesignOptIn?: boolean;
  /** Feature flag for opting out of styling components to have rounded corners.
   *
   * NOTE - Will eventually be set to `false` by default in the future. */
  roundedCornersOptOut?: boolean;
  focusRedesignOptOut?: boolean;
}

export default React.createContext<NewValidationContextProps>({});
