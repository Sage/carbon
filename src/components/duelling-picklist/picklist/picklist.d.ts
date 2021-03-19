import * as React from "react";

export interface PicklistProps {
  /** List of PicklistItem elements */
  children?: React.ReactNode;
  /** Placeholder to be rendered when list is empty */
  placeholder?: React.ReactNode;
  /** Indicate if component is disabled */
  disabled?: boolean;
}

declare const Picklist: React.FunctionComponent<PicklistProps>;
export default Picklist;
