import * as React from 'react';

export interface FlatTableProps {
  /** FlatTableHead and FlatTableBody */
  children: React.ReactNode;
  /** If true, the header does not scroll with the content */
  hasStickyHead?: boolean;
}

declare const FlatTable: React.FunctionComponent<FlatTableProps>;

export default FlatTable;
