import * as React from 'react';

export interface FlatTableRowHeaderProps {
  /** Content alignment */
  align: string;
  children: React.ReactNode | string;
}

declare const FlatTableRowHeader: React.FunctionComponent<FlatTableRowHeaderProps>;

export default FlatTableRowHeader;
