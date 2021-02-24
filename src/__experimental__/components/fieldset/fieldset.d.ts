import * as React from "react";

export interface FieldsetProps {
  /** Child elements */
  children?: React.ReactNode;
  /** The text for the fieldsets legend element. */
  legend?: string;
  /** When true, legend is placed in line with the children */
  inline?: boolean;
}

declare const Fieldset: React.FunctionComponent<FieldsetProps>;

export default Fieldset;
