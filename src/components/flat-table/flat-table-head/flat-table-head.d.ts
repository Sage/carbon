import * as React from 'react';
import FlatTableRow from '../flat-table-row';

export interface FlatTableHeadProps {
  /** Array of FlatTableRow. */
  children: Array<typeof FlatTableRow>;
}

declare const FlatTableHead: React.FunctionComponent<FlatTableHeadProps>;

export default FlatTableHead;
