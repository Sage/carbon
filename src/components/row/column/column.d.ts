import * as React from "react";

export interface ColumnProps {
  /** Children. */
  children?: React.ReactNode;
  /** Classes to apply to the component. */
  className?: string;
  /** Total column count. */
  columns?: number | string;
  /** Classes applied by row component to affect all rows */
  columnClasses?: string;
  /** Alignment of content within column. */
  columnAlign?: "left" | "center" | "middle" | "right";
  /** Offset this column by a certain number of columns. */
  columnOffset?: number | string;
  /** Span this column by a certain number of columns. */
  columnSpan?: number | string;
}

declare function Column(props: ColumnProps): JSX.Element;

export default Column;
