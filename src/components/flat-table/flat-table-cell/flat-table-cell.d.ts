import * as React from 'react';
import { PaddingSpacingProps } from '../../../utils/helpers/options-helper';

export interface FlatTableCellProps extends PaddingSpacingProps {
  /** Content alignment */
  align?: 'center' | 'left' | 'right';
  children?: React.ReactNode | string;
  /** Number of columns that a cell should span */
  colspan?: number | string;
  /** Number of rows that a cell should span */
  rowspan?: number | string;
}

declare const FlatTableCell: React.FunctionComponent<FlatTableCellProps>;

export default FlatTableCell;
