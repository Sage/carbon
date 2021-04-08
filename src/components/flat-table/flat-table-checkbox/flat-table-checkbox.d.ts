import * as React from "react";

export interface FlatTableCheckboxProps {
  /** Prop to polymorphically render either a 'th' or 'td' element */
  as?: "td" | "th";
  /** Prop to set checked prop on Checkbox */
  checked?: boolean;
  /** Callback to be called onChange in Checkbox */
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Whether to render the checkbox or not, defaults to true */
  selectable?: boolean;
}

declare function FlatTableCheckbox(props: FlatTableCheckboxProps): JSX.Element;

export default FlatTableCheckbox;
