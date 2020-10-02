import * as React from 'react';

export interface FlatTableHeaderProps {
  /** Content alignment */
  align: string;
  children: React.ReactNode | string;
  /** Number of columns that a header cell should span */
  colspan?: number | string;
  /** Number of rows that a header cell should span */
  rowspan?: number | string;
}

declare const FlatTableHeader: React.FunctionComponent<FlatTableHeaderProps>;

export default FlatTableHeader;
