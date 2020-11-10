import * as React from 'react';

export interface FlatTableProps {
  /** FlatTableHead and FlatTableBody */
  children: React.ReactNode;
  /** If true, the header does not scroll with the content */
  hasStickyHead?: boolean;
  /** Content to be rendered at the foot of the table */
  footer?: React.ReactNode;
  /** If true, the header does not scroll with the content */
  hasStickyFooter?: boolean;
  /** Set the height of the table */
  height?: string | number;
}

declare const FlatTable: React.FunctionComponent<FlatTableProps>;

export default FlatTable;
