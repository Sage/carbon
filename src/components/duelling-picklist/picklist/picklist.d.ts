import * as React from "react";

export interface PicklistProps {
  /** List of PicklistItem elements */
  children?: React.ReactNode;
  /** Placeholder to be rendered when list is empty */
  placeholder?: React.ReactNode;
  /** Indicate if component is disabled */
  disabled?: boolean;
}

declare function areEqual(prevProps: PicklistProps, nextProps: PicklistProps): boolean;
declare function Picklist(props: PicklistProps): JSX.Element;

export { areEqual, Picklist };
export default Picklist;
