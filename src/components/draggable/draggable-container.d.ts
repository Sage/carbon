import * as React from "react";
import { Expand, ExpandOnce } from "../../__internal__/utils/helpers/types";
import { DraggableItemProps } from "./draggable-item";

type DraggableContainerChild =
  | React.ReactElement<Expand<DraggableItemProps>>
  | boolean
  | null
  | undefined;

export interface DraggableContainerProps {
  /** Callback fired when order is changed */
  getOrder?: (draggableItemIds: number[]) => void;
  /**
   * The content of the component
   *
   * `<DraggableItem />` is required to make `Draggable` works
   */
  children?:
    | ExpandOnce<DraggableContainerChild>
    | ExpandOnce<DraggableContainerChild>[];
}

declare function DraggableContainer(
  props: DraggableContainerProps
): JSX.Element;

export default DraggableContainer;
