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
  /** Callback function to be called when click event received */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** The id of the element that labels the input */
  ariaLabelledBy?: string;
}

declare function FlatTableCheckbox(props: FlatTableCheckboxProps): JSX.Element;

export default FlatTableCheckbox;
