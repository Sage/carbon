import React, {
  Ref,
} from "react";
import guid from "../../__internal__/utils/helpers/guid";
import DraggableContainer from "../../__internal__/draggable/draggable-container";
import DraggableItem from "../../__internal__/draggable/draggable-item";
import { Edge } from "../../__internal__/draggable/draggable-utils";

export type DragState =
  | { type: "idle"; id?: string | number }
  | { type: "preview"; container: HTMLElement; id?: string | number }
  | { type: "is-dragging"; id: string | number }
  | { type: "is-dragging-over"; closestEdge: Edge | null; id: string | number };

export interface UseDraggableHandle {
  reOrder: (itemId: number | string, toIndex: number) => void;
}

interface UseDraggableOptions {
  draggableItems: React.ReactNode[] | React.ReactNode;
  ref?: Ref<UseDraggableHandle>;
  containerId?: string | number;
  draggableItemStylingOptOut?: boolean;
  containerNode?:  keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
  itemsNode?: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void;
}

const useDraggable = ({
  draggableItems,
  ref,
  containerId,
  draggableItemStylingOptOut,
  containerNode,
  itemsNode,
  getOrder,
}: UseDraggableOptions) => {
  const items = Array.isArray(draggableItems)
    ? draggableItems
    : [draggableItems];

  const draggableElement = (
      <DraggableContainer
        id={containerId}
        ref={ref}
        getOrder={getOrder}
        containerNode={containerNode}
      >
        {items.map((item) => (
          <DraggableItem
            key={guid()}
            uniqueId={`${guid()}`}
            draggableItemStylingOptOut={draggableItemStylingOptOut}
            itemsNode={itemsNode}
          >
            {item}
          </DraggableItem>
        ))}
      </DraggableContainer>
  );

  return { draggableElement };
};

export default useDraggable;
