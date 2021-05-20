import * as React from "react";

export interface PicklistGroupProps {
  /** Group title */
  title: React.ReactNode;
  /** Item content */
  children: React.ReactNode;
  /** Define if item is of type add or remove */
  type: "add" | "remove";
  /** Handler invoked when add/remove button is clicked or when space/enter is pressed on the whole item */
  onChange: () => void;
}

declare function PicklistGroup(props: PicklistGroupProps & React.RefAttributes<HTMLInputElement>): JSX.Element;

export default PicklistGroup;
