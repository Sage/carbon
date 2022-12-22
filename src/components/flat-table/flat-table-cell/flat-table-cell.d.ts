import * as React from "react";
import { PaddingProps } from "styled-system";
import { TableBorderSize } from "..";

export interface FlatTableCellProps extends PaddingProps {
  /** Content alignment */
  align?: "left" | "center" | "right";
  /** Cell content */
  children?: React.ReactNode | string;
  /** Number of columns that a cell should span */
  colspan?: number | string;
  /** Number of rows that a cell should span */
  rowspan?: number | string;
  /** Column width, pass a number to set a fixed width in pixels */
  width?: number;
  /** Truncate cell content and add ellipsis to any text that overflows */
  truncate?: boolean;
  /** Title text to display if cell content truncates */
  title?: string;
  /** Sets a custom vertical right border */
  verticalBorder?: TableBorderSize;
  /** Sets the color of the right border */
  verticalBorderColor?: string;
}

declare function FlatTableCell(props: FlatTableCellProps): JSX.Element;

export default FlatTableCell;
