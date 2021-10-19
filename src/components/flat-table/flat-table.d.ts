import * as React from "react";
import { MarginProps } from "styled-system";

export interface FlatTableProps extends MarginProps {
  /** The HTML id of the element that contains a description of this table. */
  ariaDescribedby?: string;
  /** A string to render as the table's caption */
  caption?: string;
  /** FlatTableHead and FlatTableBody */
  children: React.ReactNode;
  /** `FlatTable` color theme */
  colorTheme?: "light" | "transparent-base" | "transparent-white" | "dark";
  /** Content to be rendered at the foot of the table */
  footer?: React.ReactNode;
  /** If true, the header does not scroll with the content */
  hasStickyFooter?: boolean;
  /** If true, the header does not scroll with the content */
  hasStickyHead?: boolean;
  /** Set the height of the table. String can be any valid CSS string, numbers will be converted to pixels. */
  height?: string | number;
  /** Set the min-height of the table. String can be any valid CSS string, numbers will be converted to pixels. */
  minHeight?: string | number;
  /** Toggles the zebra striping for the table rows */
  isZebra?: boolean;
  /** Used to define the tables size Renders as: 'compact', 'small', 'medium', 'large' and 'extraLarge' */
  size?: "compact" | "small" | "medium" | "large" | "extraLarge";
  /** Applies max-height of 100% to FlatTable if true */
  hasMaxHeight?: boolean;
}

declare function FlatTable(props: FlatTableProps): JSX.Element;

export default FlatTable;
