import * as React from "react";

export interface FlatTableCheckboxProps {
  as: "td" | "th";
  checked?: boolean;
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
}

declare function FlatTableCheckbox(props: FlatTableCheckboxProps): JSX.Element;

export default FlatTableCheckbox;
