import * as React from "react";

export interface DraggableItemProps {
  /**
   * The id of the `DraggableItem`.
   *
   * Use this prop to make `Draggable` works
   */
  id: number | string;
  /** The content of the component. */
  children: React.ReactNode;
  findItem?: () => void;
  moveItem?: () => void;
}

declare function DraggableItem(props: DraggableItemProps): JSX.Element;

export default DraggableItem;
