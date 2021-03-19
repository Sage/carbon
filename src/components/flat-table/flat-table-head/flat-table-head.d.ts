import * as React from "react";

export interface FlatTableHeadProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
}

declare const FlatTableHead: React.FunctionComponent<FlatTableHeadProps>;

export default FlatTableHead;
