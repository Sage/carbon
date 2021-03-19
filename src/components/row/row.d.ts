import * as React from "react";

export interface RowProps {
  /** This component supports children of type Column. */
  children: React.ReactNode;
  /** Classes to apply to the component. */
  className?: string;
  /** Define how wide the gutter between the rows and columns should be. */
  gutter?:
    | "extra-small"
    | "small"
    | "medium-small"
    | "medium"
    | "medium-large"
    | "large"
    | "extra-large";
  /** Enable a divider between each column. */
  columnDivide?: boolean;
  /** Define a certain amount of columns, instead of basing it on the number of children. */
  columns?: number | string;
  /** Classes to apply to all column children. */
  columnClasses?: string;
}

declare const Row: React.ComponentType<RowProps>;

export default Row;
