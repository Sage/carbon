import React, { useContext, useRef, useEffect, useMemo, useState, CSSProperties } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

import DraggableItemContext from "../draggable-item-context";
import DraggableContainerContext from "../draggable-container-context";
import DraggableProviderContext from "../draggable-provider-context";

import {
  getDraggableItemData,
  isDraggableItemData,
  DraggableItemData,
  DragState,
} from "../__internal__/draggable-utils";
import { set } from "lodash";
import useDebounce from "../../../hooks/__internal__/useDebounce";

export interface DraggableItemProps {
  children?: React.ReactNode;
  itemsStyle?: CSSProperties;
  draggableItemStylingOptOut?: boolean;
  itemsNode?: string;
}

const DraggableItem = ({
  children,
  itemsStyle,
  draggableItemStylingOptOut = false,
  itemsNode = "div",
}: DraggableItemProps): JSX.Element => {
  const columnId = useContext(DraggableContainerContext)?.columnId;
  const setClosestEdge = useContext(DraggableProviderContext)?.setClosestEdge;
  const containerDragState = useContext(DraggableProviderContext)?.containerDragState;
  const { testState, setTestState, newContainer } = useContext(DraggableProviderContext);
  const [dragState, setDragState] = useState<DragState>({ type: "idle", id: 0 });

  const itemRef = useRef<HTMLDivElement | null>(null);

  const id = children?.props?.id;
  
  const draggableItemData: DraggableItemData = useMemo(
    () => ({
      id,
      parentContainerId: columnId || "draggable-container",
    }),
    [id, columnId],
  );

  const previousStateRef = useRef({ value1: undefined, value2: undefined, value3: undefined, value4: undefined });

  const isEqual = (obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean => {
    const entries1 = Object.entries(obj1);
    const entries2 = Object.entries(obj2);

    if (entries1.length !== entries2.length) return false;

    for (const [key, value] of entries1) {
      if (obj2[key] !== value) return false
    }
    return true;
  };

  useEffect(() => {
    const idle: DragState = { type: "idle" };
    const element = itemRef.current;

    const cleanup = combine(
      draggable({
        element,
        getInitialData() {
          return getDraggableItemData(draggableItemData);
        },
      }),
      dropTargetForElements({
        element,
        getData({ input }) {
          const data = getDraggableItemData(draggableItemData);
          return data;
        },
        onDragStart() {
          if (setDragState) {
            setDragState({ type: "is-dragging", id });
          }
        },
        onDragLeave() {
          if (setDragState) {
            setDragState(idle);
          }
        },
        onDragEnter({ self, source }) {
          const closestEdge = extractClosestEdge(self.data);
          if (setDragState) {
            setDragState({ type: "is-dragging-over", closestEdge, id });
          }
        },
        onDropTargetChange({ source, location }) {
          // Safety check for location and dropTargets
          if (!location?.current?.dropTargets?.[0]) {
            return;
          }

          const currentDropTarget = location.current.dropTargets[0];

          const newNewContainer = newContainer.card2 === id || newContainer.card1 === id ? newContainer.newContainer : null;

          
          // Safety check for required attributes
          const parentContainerId1 = currentDropTarget.element?.getAttribute('data-parent-container-id');
          const parentContainerId2 = newNewContainer || source.element?.getAttribute('data-parent-container-id');
          const itemId = source.data?.itemId;
          const targetItemId = currentDropTarget.data?.itemId;


          console.log(parentContainerId1, parentContainerId2, itemId, targetItemId);

          // Only proceed if we have all required data
          if (!parentContainerId1 || !parentContainerId2 || !itemId || !targetItemId) {
            return;
          }

          const newState = {
            value1: itemId,
            value2: targetItemId,
            value3: parentContainerId2,
            value4: parentContainerId1,
          };
        
         setTestState(newState);
        },
        onDrop() {
          if (setDragState) {
            setDragState(idle);
          }
        }
      })
    );
  
    return () => {
      cleanup();
    };
  }, [id, isEqual, draggableItemData, testState, setTestState, newContainer]);

  return React.createElement(
    itemsNode,
    {
      ref: itemRef,
      "data-element": "use-draggable-item",
      "data-parent-container-id": columnId,
      "data-item-id": id,
      style: {
        ...itemsStyle, 
        opacity: dragState.type === "is-dragging" ? 0.5 : (dragState.type === "is-dragging-over" ? 0 : 1)
      },
    },
    <>{children}
    {newContainer.mewContainer}
    {newContainer.card1 === id || newContainer.card2 === id ? newContainer.newContainer : null}</>
  );
};

export default DraggableItem;