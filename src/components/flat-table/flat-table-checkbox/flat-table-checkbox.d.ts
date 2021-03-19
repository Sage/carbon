import * as React from "react";

export interface FlatTableCheckboxProps {
  as: "td" | "th";
  checked?: boolean;
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
}

declare const FlatTableCheckbox: React.FunctionComponent<FlatTableCheckboxProps>;

export default FlatTableCheckbox;
