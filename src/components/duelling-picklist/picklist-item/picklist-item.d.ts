import * as React from "react";

export interface PicklistItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Define if item is of type add or remove */
  type: "add" | "remove";
  /** Indicate if component is disabled */
  disabled?: boolean;
  /** Handler invoked when add/remove button is clicked or when space/enter is pressed on the whole item */
  onChange: () => void;
  /** Value passed to the onChange handler */
  item: object | string | number;
}

declare const PicklistItem: React.FunctionComponent<PicklistItemProps>;
export default PicklistItem;
