import * as React from "react";
import { SpaceProps } from "styled-system";
import * as OptionsHelper from "../../../utils/helpers/options-helper";

export interface FlatTableCellProps extends SpaceProps {
  /** Content alignment */
  align?: OptionsHelper.AlignFull;
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
}

declare function FlatTableCell(props: FlatTableCellProps): JSX.Element;

export default FlatTableCell;
