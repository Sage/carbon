import * as React from 'react';

export interface FlatTableCellProps {
  /** Content alignment */
  align: string;
  children: React.ReactNode | string;
}

declare const FlatTableCell: React.FunctionComponent<FlatTableCellProps>;

export default FlatTableCell;
