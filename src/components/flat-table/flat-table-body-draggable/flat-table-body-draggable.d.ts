import * as React from "react";

export interface FlatTableBodyDraggableProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
  /** Callback fired when order is changed */
  getOrder?: (draggableItemIds: number[]) => void;
}

declare function FlatTableBodyDraggable(props: FlatTableBodyDraggableProps): JSX.Element;

export default FlatTableBodyDraggable;
