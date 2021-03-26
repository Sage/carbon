import * as React from "react";

export interface FlatTableHeadProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
}

declare function FlatTableHead(props: FlatTableHeadProps): JSX.Element;

export default FlatTableHead;
