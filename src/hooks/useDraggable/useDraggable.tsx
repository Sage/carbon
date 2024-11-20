import React, { useState } from "react";
import DraggableContainer from "./__internal__/draggable-container";
import DraggableItem from "./__internal__/draggable-item";
import { DragState } from "./__internal__/draggable-utils";

const useDraggable = (
  draggableItems: React.ReactNode[] | React.ReactNode,
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void,
): [JSX.Element, DragState] => {

  const [dragState, setDragState] = useState<DragState>({ type: "idle", id: undefined });

  // Draggable Items are passed as children and mapped with a unique Id and key.
  // Hook returns the container and some other useful states. These can be used to make design choices etc.
  // DragState returns the current dragState for all draggable items as well as the id of the item being dragged.
  // Therefore, the dragState can be used to change the style of the item being dragged (if the item id is compared against the id returned in dragState).

  // Currently we individually map every Draggable Item with a id, it is essential that the individual react child
  // also has the same id

  return [
    <DraggableContainer getOrder={getOrder}>
      {Array.isArray(draggableItems) ? (
        draggableItems.map((item, index) => (
          <DraggableItem setDragState={setDragState} key={index} id={index}>
            {item}
          </DraggableItem>
        ))
      ) : (
        <DraggableItem setDragState={setDragState} id={0}>
          {draggableItems}
        </DraggableItem>
      )}
    </DraggableContainer>,
    dragState,
  ];
};

export default useDraggable;