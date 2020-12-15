import * as React from 'react';

export interface FlatTableProps {
  /** A string to render as the table's caption */
  caption?: string;
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
  /** Toggles the zebra striping for the table rows */
  isZebra?: boolean;
  /** Used to define the tables size Renders as: 'compact', 'small', 'medium' and 'large' */
  size?: 'compact' | 'small' | 'medium' | 'large';
}

declare const FlatTable: React.FunctionComponent<FlatTableProps>;

export default FlatTable;
