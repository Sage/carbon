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
import DropIndicator from "./drop-indicator";

import {
  getDraggableItemData,
  isDraggableItemData,
  DraggableItemData,
  DragState,
} from "./draggable-utils";
import StyledFlatTableRow from "../../../components/flat-table/flat-table-row/flat-table-row.style";

export interface DraggableItemProps {
  children?: React.ReactNode;
  id: string | number;
  itemsStyle?: CSSProperties;
  indicatorColor?: string;
  draggableItemStylingOptOut?: boolean;
  itemsNode?: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
}
interface DragDirection {
  direction: "up" | "down" | null;
  sourceIndex: number;
  targetIndex: number;
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
  const { setClosestEdge, containerDragState } = useContext(
    DraggableProviderContext,
  );
  const [dragState, setDragState] = useState<DragState>({
    type: "idle",
    id: 0,
  });
  const [dragDirection, setDragDirection] = useState<DragDirection>({
    direction: null,
    sourceIndex: -1,
    targetIndex: -1,
  });

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

  const indicatorPosition =
    dragState.type === "is-dragging-over" ? dragState.closestEdge : null;
  const dragMovementDirection =
    dragDirection.direction === "up" ? "top" : "down";
  const finalIndicatorPosition = containerDragState?.draggingBetweenContainers
    ? indicatorPosition
    : dragMovementDirection;
  const finalOpacity = dragState.type === "is-dragging" ? 0.5 : 1;
  const foundIDwidth = document.getElementById(`${id}`)?.offsetWidth;

  useEffect(() => {
    const idle: DragState = { type: "idle" };
    const element = itemRef.current as HTMLElement;
    const cleanup = combine(
      draggable({
        element,
        getInitialData() {
          return getDraggableItemData(draggableItemData);
        },
        onDragStart: () => setDragState({ type: "is-dragging", id }),
        onDrop: () => setDragState(idle),
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => isDraggableItemData(source.data),
        getData: ({ input }) =>
          attachClosestEdge(getDraggableItemData(draggableItemData), {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          }),
        getIsSticky: () => true,
        onDragStart({ source, location }) {
          const sourceIndex = source.data.itemIndex as number;
          const targetIndex = location.current.dropTargets[0].data
            .itemIndex as number;
          const direction = sourceIndex > targetIndex ? "up" : "down";
          setDragDirection({
            direction,
            sourceIndex,
            targetIndex,
          });
        },
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          if (setDragState) {
            if (self.data.itemId !== id) {
              setDragState({ type: "is-dragging-over", closestEdge, id });
            }
          }
        },
        onDrag({ self, source, location }) {
          const sourceIndex = source.data.itemIndex as number;
          const targetIndex = location.current.dropTargets[0].data
            .itemIndex as number;
          const direction = sourceIndex > targetIndex ? "up" : "down";
          if (direction !== dragDirection.direction) {
            setDragDirection({
              direction,
              sourceIndex,
              targetIndex,
            });
          }
          const closestEdge = extractClosestEdge(self.data);
          if (setDragState) {
            setDragState((current) => {
              if (source.data.itemId === id) {
                return { type: "is-dragging", id };
              }
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
        onDragLeave: ({ source }) => {
          if (source.data.itemId !== id) {
            setDragState(idle);
          }
        },
        onDrop({ self }) {
          setDragDirection({
            direction: null,
            sourceIndex: -1,
            targetIndex: -1,
          });
          const closestEdge = extractClosestEdge(self.data);
          if (setClosestEdge) {
            setClosestEdge(closestEdge);
          }
          if (setDragState) {
            setDragState(idle);
          }
        },
      }),
    );
    return () => {
      cleanup();
    };
  }, [
    id,
    draggableItemData,
    dragDirection.direction,
    setDragState,
    setClosestEdge,
  ]);

  return (
    <>
      {(indicatorPosition === "top" || indicatorPosition === "bottom") &&
      !draggableItemStylingOptOut ? (
        <div style={{ position: "relative" }}>
          <DropIndicator
            indicatorColor={indicatorColor}
            width={foundIDwidth}
            position={finalIndicatorPosition}
          />
          {React.createElement(
            itemsNode,
            {
              ref: itemRef,
              "data-element": "use-draggable-item",
              "data-parent-container-id": columnId,
              "data-item-id": id,
              ...rest,
              style: {
                ...itemsStyle,
                opacity: draggableItemStylingOptOut ? 1 : finalOpacity,
                position: "relative",
              },
            },
            children,
          )}
        </div>
      ) : (
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
          children,
        )
      )}
    </>
  );
});

export default DraggableItem;
