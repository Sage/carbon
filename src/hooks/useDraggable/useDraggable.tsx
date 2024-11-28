import React, { useContext } from "react";
import DraggableContainer from "./__internal__/draggable-container";
import DraggableItem from "./__internal__/draggable-item";
import DraggableContext, { DragState } from "./__internal__/draggable-context";

const useDraggable = ({
    draggableContainerChildren,
    draggableItemChildren,
    draggableItemIds,
}): [JSX.Element, JSX.Element, DragState | undefined, (string | number)[] | undefined, string | number | undefined] => {
    const {
        dragState,
        draggableItemIds,
        movedItemId,
      } = useContext(DraggableContext);

  return [
    <DraggableContainer>
        </DraggableContainer>,
    <DraggableItem />,
    dragState,
    draggableItemIds,
    movedItemId
  ];
};

export default useDraggable;