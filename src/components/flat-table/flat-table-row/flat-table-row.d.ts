import * as React from "react";

export interface FlatTableRowProps {
  /** Array of FlatTableHeader or FlatTableCell. FlatTableRowHeader could also be passed. */
  children: React.ReactNode;
  /** Function to handle click event. If provided the Component could be focused with tab key. */
  onClick?: (ev: React.SyntheticEvent) => void;
  /** Allows developers to manually control highlighted state for the row. */
  highlighted?: boolean;
  /** Allows developers to manually control selected state for the row. */
  selected?: boolean;
}

declare function FlatTableRow(props: FlatTableRowProps & React.RefAttributes<HTMLHRElement>): JSX.Element;

export default FlatTableRow;
