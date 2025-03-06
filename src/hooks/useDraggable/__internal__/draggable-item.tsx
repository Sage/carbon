import React, {
  useContext,
  useRef,
  useEffect,
  useMemo,
  useState,
  CSSProperties,
  forwardRef,
  RefObject,
} from "react";

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
} from "./draggable-utils";
import StyledFlatTableRow from "../../../components/flat-table/flat-table-row/flat-table-row.style";
import UseDraggableContext from "../useDraggable-context";
import { set } from "lodash";

export interface DraggableItemProps {
  children?: React.ReactNode;
  id: string | number;
  itemsStyle?: CSSProperties;
  indicatorColor?: string;
  draggableItemStylingOptOut?: boolean;
  itemsNode?: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
}

const DraggableItem = forwardRef(({
  children,
  id,
  itemsStyle,
  indicatorColor,
  draggableItemStylingOptOut = false,
  itemsNode = "div",
  ...rest
}: DraggableItemProps, ref): JSX.Element => {

  const columnId = useContext(DraggableContainerContext)?.columnId;
  const index = useContext(DraggableItemContext)?.index;
  const { setClosestEdge, setDraggingBetweenContainers } = useContext(
    DraggableProviderContext,
  );
  const { setDragState: setUseDragState } = useContext(UseDraggableContext);


  const [dragState, setDragState] = useState<DragState>({
    type: "idle",
    id: 0,
  });

  useEffect(() => {
    if(setUseDragState){
      setUseDragState(dragState);
    }
  }, [dragState]);

  const internalRef = useRef<HTMLDivElement | null>(null);
  const itemRef = (ref as RefObject<HTMLDivElement>) || internalRef;
  
  const draggableItemData: DraggableItemData = useMemo(
    () => ({
      id,
      index,
      content: children,
      parentContainerId: columnId || "draggable-container",
    }),
    [id, index, children, columnId],
  );

  const finalOpacity = dragState.type === "is-dragging-over" ? 0 : 1;

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
          if (setDraggingBetweenContainers && source.data.parentContainerId !== columnId) {
            setDraggingBetweenContainers(true);
          }
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          if (setDragState) {
            setDragState((current) => {
              if (
                current.type === "is-dragging-over" &&
                current.closestEdge === closestEdge
              ) {
                return current;
              }
              return { type: "is-dragging-over", closestEdge, id };
            });
          }
        },
        onDragLeave() {
          if (setDragState) {
            setDragState(idle);
          }
          if (setDraggingBetweenContainers) {
            setDraggingBetweenContainers(false);
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
          if (setDraggingBetweenContainers) {
            setDraggingBetweenContainers(false);
          }
        },
      }),
    );
    return () => {
      cleanup();
    };
  }, [id, draggableItemData, setDragState, setClosestEdge, setDraggingBetweenContainers]);

  return (
    React.createElement(
      itemsNode,
      {
        ref: itemRef,
        "data-parent-container-id": columnId,
        "data-item-id": id,
        ...(itemsNode === StyledFlatTableRow && {
          isDragging: dragState.type === "is-dragging",
        }),
        ...rest,
        style: {
          ...itemsStyle,
          opacity: draggableItemStylingOptOut ? 1 : finalOpacity,
          position: "relative",
        },
      },
        children
    )
  );
});

export default DraggableItem;