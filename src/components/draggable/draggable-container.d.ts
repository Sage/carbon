import * as React from "react";
import { DraggableItemProps } from "./draggable-item";

type DraggableContainerChild = React.ReactElement<DraggableItemProps> | boolean | null | undefined;

export interface DraggableContainerProps {
  /** Callback fired when order is changed */
  getOrder?: (draggableItemIds: number[]) => void;
  /**
   * The content of the component
   *
   * `<DraggableItem />` is required to make `Draggable` works
   */
   children?: DraggableContainerChild | DraggableContainerChild[];
}

declare function DraggableContainer(props: DraggableContainerProps): JSX.Element;

export default DraggableContainer;
