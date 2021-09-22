import * as React from "react";

export interface FlatTableRowDraggableProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
  /** ID for use in drag and drop functionality */
  id?: number | string;
  /** function to find an item in the list of draggable items */
  findItem: () => object;
  /** function to reposition an item in the list of draggable items */
  moveItem: () => void;
  /** item is draggable */
  draggable?: boolean;
}

declare function FlatTableRowDraggable(props: FlatTableRowDraggableProps): JSX.Element;

export default FlatTableRowDraggable;
