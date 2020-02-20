import * as React from 'react';

export interface FlatTableHeaderProps {
  /** Content alignment */
  align: string;
  children: React.ReactNode | string;
}

declare const FlatTableHeader: React.FunctionComponent<FlatTableHeaderProps>;

export default FlatTableHeader;
