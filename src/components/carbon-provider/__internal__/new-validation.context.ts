import React from "react";

export interface NewValidationContextProps {
  /** Feature flag for opting in to the latest validation designs for components that support it.
   *
   * NOTE - Will eventually be set to `true` by default in the future. */
  validationRedesignOptIn?: boolean;
  /** (Deprecated) Feature flag for opting out of styling components to have rounded corners.
   *
   * NOTE - This feature flag will soon be removed, along with the legacy styling. */
  roundedCornersOptOut?: boolean;
  /** (Deprecated) Feature flag for opting out of the focus redesign.
   *
   * NOTE -  This feature flag will soon be removed, along with the legacy styling. */
  focusRedesignOptOut?: boolean;
}

export default React.createContext<NewValidationContextProps>({});
