import * as React from "react";
import { DraggableItemProps } from "./draggable-item";

export interface DraggableContainerProps {
  /** Callback fired when order is changed */
  getOrder?: (draggableItemIds: number[]) => void;
  /**
   * The content of the component
   *
   * `<DraggableItem />` is required to make `Draggable` works
   */
  children?:
    | React.ReactElement<DraggableItemProps>
    | Array<React.ReactElement<DraggableItemProps>>;
}

declare function DraggableContainer(props: DraggableContainerProps): JSX.Element;

export default DraggableContainer;
