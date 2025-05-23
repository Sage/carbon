import React, { Ref, useState } from "react";
import guid from "../../__internal__/utils/helpers/guid";
import DraggableContainer from "../../__internal__/draggable/draggable-container";
import { UseDraggableHandle } from ".";
import DraggableItem from "../../__internal__/draggable/draggable-item";

export interface UseDraggableProps {
  /** Array of React elements or single React element to be made draggable */
  draggableItems: React.ReactNode[];
  /** Unique identifier for the container */
  containerId?: string | number;
  /** HTML element or React component to use as the container */
  containerNode?: keyof JSX.IntrinsicElements | React.ElementType;
  /** An object in which any additional props can be passed to the container element */
  containerProps?: Record<string, unknown>;
  /**
   * Drag behavior type:
   * - "continuous": Items reorder as they are dragged
   * - "onDrop": Items reorder only when dropped
   */
  dragType?: "continuous" | "onDrop";
  /**
   * Callback fired when items are reordered
   * @param draggableItemIds - Array of item IDs in their current order
   * @param movedItemId - ID of the item that was moved
   */
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void;
  /** HTML element or React component to use as the container for individual items */
  itemsNode?: keyof JSX.IntrinsicElements | React.ElementType;
  /** An object in which any additional props can be passed to * EVERY * item element */
  itemProps?: Record<string, unknown>;
  /** Ref to access the draggable handle methods */
  ref?: Ref<UseDraggableHandle>;
}

const useDraggable = ({
  draggableItems,
  containerId,
  containerNode,
  containerProps,
  dragType = "continuous",
  getOrder,
  itemsNode,
  itemProps,
  ref,
}: UseDraggableProps) => {
  const [draggedNode, setDraggedNode] = useState<Element | null>(null);

  const draggableElement = (
    <DraggableContainer
      containerNode={containerNode}
      containerProps={containerProps}
      dragType={dragType}
      getOrder={getOrder}
      id={containerId}
      ref={ref}
      setDraggedNode={setDraggedNode}
    >
      {draggableItems.map((item) => (
        <DraggableItem
          itemsNode={itemsNode}
          itemProps={itemProps}
          key={guid()}
          id={`${guid()}`}
        >
          {item}
        </DraggableItem>
      ))}
    </DraggableContainer>
  );

  return { draggableElement, draggedNode };
};

export default useDraggable;
