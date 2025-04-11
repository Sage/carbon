import React, { Ref, useState } from "react";
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

export interface UseDraggableOptions {
  draggableItems: React.ReactNode[] | React.ReactNode;
  containerId?: string | number;
  containerNode?:
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<unknown>;
  containerRole?: string;
  dragType?: "continuous" | "onDrop";
  stylingOptOut?: boolean;
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void;
  itemsNode?:
    | keyof JSX.IntrinsicElements
    | React.JSXElementConstructor<unknown>;
  itemsRole?: string;
  ref?: Ref<UseDraggableHandle>;
}

const useDraggable = ({
  draggableItems,
  containerId,
  containerNode,
  containerRole,
  dragType = "continuous",
  stylingOptOut = false,
  getOrder,
  itemsNode,
  itemsRole,
  ref,
}: UseDraggableOptions) => {
  const items = Array.isArray(draggableItems)
    ? draggableItems
    : [draggableItems];
  const [draggedNode, setDraggedNode] = useState<Element | null>(null);

  const draggableElement = (
    <DraggableContainer
      containerNode={containerNode}
      data-role={containerRole}
      dragType={dragType}
      getOrder={getOrder}
      id={containerId}
      ref={ref}
      setDraggedNode={setDraggedNode}
    >
      {items.map((item) => (
        <DraggableItem
          data-role={itemsRole}
          stylingOptOut={stylingOptOut}
          itemsNode={itemsNode}
          key={guid()}
          uniqueId={`${guid()}`}
        >
          {item}
        </DraggableItem>
      ))}
    </DraggableContainer>
  );

  return { draggableElement, draggedNode };
};

export default useDraggable;