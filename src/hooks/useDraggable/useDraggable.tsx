import React, { Ref, useState, CSSProperties } from "react";
import DraggableContainer from "./__internal__/draggable-container";
import DraggableItem from "./__internal__/draggable-item";
import { DragState } from "./__internal__/draggable-utils";

export interface UseDraggableHandle {
  reOrder: (
    itemId: number | string,
    toIndex: number
  ) => void;
}

interface UseDraggableOptions {
  draggableItems: React.ReactNode[] | React.ReactNode;
  id?: string | number;
  ref?: Ref<UseDraggableHandle>;
  containerStyle?: CSSProperties;
  containerNode?: string;
  itemsNode?: string;
}

const useDraggable = ({
  draggableItems,
  id,
  ref,
  containerStyle,
  containerNode,
  itemsNode,
}: UseDraggableOptions): [JSX.Element, DragState, boolean | undefined] => {
  const items = Array.isArray(draggableItems)
    ? draggableItems
    : [draggableItems];

  const [dragState, setDragState] = useState<DragState>({ type: "idle", id: 0 });
  const [draggingBetweenContainers, setDraggingBetweenContainers] = useState<boolean>(false)
  
  const draggableElement = (
    <DraggableContainer ref={ref} id={id} containerStyle={containerStyle} containerNode={containerNode} setDragState={setDragState}>
      {items.map((item, index) => (
        <DraggableItem
          key={index}
          itemsNode={itemsNode}
          setDragState={setDragState}
          setDraggingBetweenContainers={setDraggingBetweenContainers}
        >
          {item}
        </DraggableItem>
      ))}
    </DraggableContainer>
  );

  return [draggableElement, dragState, draggingBetweenContainers];
};

export default useDraggable;