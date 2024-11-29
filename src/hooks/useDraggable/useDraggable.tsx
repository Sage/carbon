import React, { useContext, useState } from "react";
import DraggableContainer from "./__internal__/draggable-container";
import DraggableItem from "./__internal__/draggable-item";
import { DragState } from "./__internal__/draggable-utils";

const useDraggable = (
  draggableItems: React.ReactNode[] | React.ReactNode
): [JSX.Element, DragState | undefined, (string | number)[] | undefined, string | number | undefined] => {

  const [dragState, setDragState] = useState<DragState>({ type: "idle", id: undefined });
  const [draggableItemIds, setDraggableItemIds] = useState<(string | number)[]>([]);
  const [movedItemId, setMovedItemId] = useState<string | number | undefined>(undefined);

  // Draggable Items are passed as children and mapped with a unique Id and key.
  // Hook returns the container and some other useful states. These can be used to make design choices etc.
  // DragState returns the current dragState for all draggable items as well as the id of the item being dragged.
  // Therefore, the dragState can be used to change the style of the item being dragged (if the item id is compared against the id returned in dragState).

  // Currently we individually map every Draggable Item with a id, it is essential that the individual react child
  // also has the same id

  return [
    <DraggableContainer>
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
    draggableItemIds,
    movedItemId,
  ];
};

export default useDraggable;