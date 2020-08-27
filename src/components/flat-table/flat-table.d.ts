import * as React from 'react';
import Pager from '../pager';

export interface FlatTableProps {
  /** FlatTableHead and FlatTableBody */
  children: React.ReactNode;
  /** If true, the header does not scroll with the content */
  hasStickyHead?: boolean;

  pager?: typeof Pager;
}

declare const FlatTable: React.FunctionComponent<FlatTableProps>;

export default FlatTable;
