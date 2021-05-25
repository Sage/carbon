import * as React from "react";
import { TableBorderSize } from "..";

export interface FlatTableRowProps {
  /** Array of FlatTableHeader or FlatTableCell. FlatTableRowHeader could also be passed. */
  children: React.ReactNode;
  /** Allows the row to be expanded, must be used with the `subRows` prop. */
  expandable?: boolean;
  /** Sets an expandable row to be expanded on start */
  expanded?: boolean;
  /** Area to click to open sub rows when expandable. Default is `wholeRow` */
  expandableArea?: "wholeRow" | "firstColumn";
  /** Allows developers to manually control highlighted state for the row. */
  highlighted?: boolean;
  /** Sets the weight of the bottom border in the row */
  horizontalBorderSize?: TableBorderSize;
  /** Function to handle click event. If provided the Component could be focused with tab key. */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Allows developers to manually control selected state for the row. */
  selected?: boolean;
  /** Sub rows to be shown when the row is expanded, must be used with the `expandable` prop. */
  subRows?: React.ReactNodeArray;
}

declare function FlatTableRow(props: FlatTableRowProps & React.RefAttributes<HTMLHRElement>): JSX.Element;

export default FlatTableRow;
