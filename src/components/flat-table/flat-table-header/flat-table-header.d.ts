import * as React from "react";
import { PaddingProps } from "styled-system";

import { TableBorderSize } from "..";

export interface FlatTableHeaderProps extends PaddingProps {
  /** Content alignment */
  align?: "left" | "center" | "right";
  /** If true sets alternative background color */
  alternativeBgColor?: boolean;
  /** Header content */
  children?: React.ReactNode | string;
  /** Number of columns that a header cell should span */
  colspan?: number | string;
  /** Number of rows that a header cell should span */
  rowspan?: number | string;
  /** Sets a custom vertical right border */
  verticalBorder?: TableBorderSize;
  /** Sets the color of the right border */
  verticalBorderColor?: string;
  /** Column width, pass a number to set a fixed width in pixels */
  width?: number;
}

declare function FlatTableHeader(props: FlatTableHeaderProps): JSX.Element;

export default FlatTableHeader;
