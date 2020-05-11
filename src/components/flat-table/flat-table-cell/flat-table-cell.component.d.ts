import * as React from 'react';

export interface FlatTableCellProps {
  /** Content alignment */
  align: string;
  children?: React.ReactNode | string;
  /** Number of columns that a cell should span */
  colspan?: number | string;
  /** Number of rows that a cell should span */
  rowspan?: number | string;
}

declare const FlatTableCell: React.FunctionComponent<FlatTableCellProps>;

export default FlatTableCell;
