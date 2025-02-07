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
  const index = useContext(DraggableItemContext)?.index;
  const setClosestEdge = useContext(DraggableProviderContext)?.setClosestEdge;
  const containerDragState = useContext(DraggableProviderContext)?.containerDragState;
  const { testState, setTestState } = useContext(DraggableProviderContext);
  const [dragState, setDragState] = useState<DragState>({ type: "idle", id: 0 });

  const itemRef = useRef<HTMLDivElement | null>(null);

  // The found id will be that of the id in any child component, if it exists
  // Otherwise, it will be 0
  // Child component must have an id, and it must be unique. Doesn't have to be a number necessarily
  const [foundId, setFoundId] = useState<string | null>(null);

  useEffect(() => {
    const findFirstValidProp = (children: React.ReactNode): string | null => {
      let foundProp: string | null = null;

      const traverse = (child: React.ReactNode) => {
        if (!child || foundProp) return;

        if (React.isValidElement(child)) {
          // Check props of the current child
          const validProp = Object.entries(child.props).find(
            ([key, value]) => value !== null && value !== undefined,
          );

          if (validProp) {
            foundProp = validProp[1] as string; // Store the first valid prop's value
            return;
          }

          // If no valid prop is found, traverse its children
          if (child.props.children) {
            React.Children.forEach(child.props.children, traverse);
          }
        }
      };

      React.Children.forEach(children, traverse);

      return foundProp;
    };

    if (React.isValidElement(children)) {
      if (children.props.id !== null && children.props.id !== undefined) {
        setFoundId(children.props.id);
      } else {
        const validProp = findFirstValidProp(children);
        if (validProp) {
          setFoundId(validProp);
        }
      }
    }
  }, [children]);

  const id = useMemo(
    () => (foundId !== null && foundId !== undefined ? foundId : 0),
    [foundId],
  );

  const draggableItemData: DraggableItemData = useMemo(
    () => ({
      id,
      index,
      content: children,
      parentContainerId: columnId || "draggable-container",
    }),
    [id, index, children, columnId],
  );

  const localRefFlag = useRef(false);
  const previousStateRef = useRef({ value1: undefined, value2: undefined, value3: undefined, value4: undefined });

  useEffect(() => {
    const idle: DragState = { type: "idle" };
    const element = itemRef.current;
    if (!element) {
      return;
    }
  
    const cleanup = combine(
      draggable({
        element,
        getInitialData() {
          return getDraggableItemData(draggableItemData);
        },
        onDragStart() {
          if (setDragState) {
            setDragState({ type: "is-dragging", id });
          }
        },
        onDrop() {
          if (setDragState) {
            setDragState(idle);
          }
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          if (source.element === element) {
            return false;
          }
          return isDraggableItemData(source.data);
        },
        getData({ input }) {
          const data = getDraggableItemData(draggableItemData);
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          });
        },
        getIsSticky() {
          return true;
        },
        onDragEnter({ self, source }) {
          const closestEdge = extractClosestEdge(self.data);
          if (setDragState) {
            setDragState({ type: "is-dragging-over", closestEdge, id });
          }
        },
        onDrag({ self, source, location }) {          
          const pageX = location.current.input.pageX;
          const pageY = location.current.input.pageY;
        
          const parentContainerId1 = location.current.dropTargets[0].data.parentContainerId;
          const parentContainerId2 = source.data.parentContainerId;
        
          const newState = {
            value1: source.data.itemId,
            value2: location.current.dropTargets[0].data.itemId,
            value3: parentContainerId2,
            value4: parentContainerId1,
          };
        
          if (
            previousStateRef.current.value1 !== newState.value1 ||
            previousStateRef.current.value2 !== newState.value2 ||
            previousStateRef.current.value3 !== newState.value3 ||
            previousStateRef.current.value4 !== newState.value4
          ) {
            setTestState(newState);
            previousStateRef.current = newState;
          }
        },
        onDropTargetChange({ self, source, location }) {

          const closestEdge = extractClosestEdge(self.data);
          if (setDragState) {
            setDragState(idle)
          }
        },
        onDragLeave() {
          if (setDragState) {
            setDragState(idle);
          }
        },
        onDrop({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          if (setClosestEdge) {
            setClosestEdge(closestEdge);
          }
          if (setDragState) {
            setDragState(idle);
          }
        },
      })
    );
  
    return () => {
      cleanup();
    };
  }, [id, draggableItemData, setDragState, setClosestEdge, testState, setTestState]);

  return React.createElement(
    itemsNode,
    {
      ref: itemRef,
      "data-element": "use-draggable-item",
      "data-parent-container-id": columnId,
      "data-item-id": id,
      style: {...itemsStyle, opacity: dragState.type === "is-dragging" ? 0.5 : (dragState.type === "is-dragging-over" ? 0 : 1)},
    },
    <>{children}
    </>
  );
};

export default DraggableItem;
