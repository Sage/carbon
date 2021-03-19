import * as React from "react";
import FlatTableRow from "../flat-table-row";

export interface FlatTableBodyProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
}

declare const FlatTableBody: React.FunctionComponent<FlatTableBodyProps>;

export default FlatTableBody;
