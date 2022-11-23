import * as React from "react";
import { PaddingProps } from "styled-system";
import { TableBorderSize } from "..";

export interface FlatTableRowHeaderProps extends PaddingProps {
  /** Content alignment */
  align?: string;
  children?: React.ReactNode | string;
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
  /** Defines whether the column should be sticky on the left or right hand side of the Table */
  stickyAlignment?: "left" | "right";
}

declare function FlatTableRowHeader(
  props: FlatTableRowHeaderProps
): JSX.Element;

export default FlatTableRowHeader;
