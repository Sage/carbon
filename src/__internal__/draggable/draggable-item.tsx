import React, {
  useContext,
  useRef,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
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

import { isGuid } from "../../__internal__/utils/helpers/guid";

import DraggableItemContext from "./draggable-item-context";
import DraggableContainerContext from "./draggable-container-context";

import {
  getDraggableItemData,
  isDraggableItemData,
  DraggableItemData,
  DragState,
} from "./draggable-utils";
import StyledFlatTableRow from "../../components/flat-table/flat-table-row/flat-table-row.style";

export interface DraggableItemProps {
  children?: React.ReactNode;
  uniqueId: string | number;
  stylingOptOut?: boolean;
  itemsNode?: keyof JSX.IntrinsicElements | React.ElementType;
  /**
   * @private
   * @ignore
   * @internal
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  "data-role"?: string;
  "data-component"?: string;
  "data-element"?: string;
}

const DraggableItem = forwardRef(
  (
    {
      children,
      uniqueId,
      stylingOptOut = false,
      itemsNode = "div",
      className,
      "data-role": dataRole,
      "data-component": dataComponent,
      "data-element": dataElement,
      ...rest
    }: DraggableItemProps,
    ref,
  ): JSX.Element => {
    const { columnId, dragType } = useContext(DraggableContainerContext);

    const index = useContext(DraggableItemContext)?.index;

    const [firstChildId, setFirstChildId] = useState<string | null>(null);
    const internalRef = useRef<HTMLDivElement | null>(null);
    const itemRef = (ref as RefObject<HTMLDivElement>) || internalRef;

    useLayoutEffect(() => {
      // This runs after the component mounts and the children are rendered
      if (itemRef.current && itemRef.current.children.length > 0) {
        const firstChild = itemRef.current.children[0];
        const id = firstChild.getAttribute("id");
        setFirstChildId(id);
      }
    }, [itemRef]);

    // if the first child has an id which is intentionally passed (not a guid), use that otherwise use a provided uniqueId
    const id =
      firstChildId && isGuid(firstChildId)
        ? uniqueId
        : firstChildId || uniqueId;

    const [dragState, setDragState] = useState<DragState>({
      type: "idle",
      id: 0,
    });

    const draggableItemData: DraggableItemData = useMemo(
      () => ({
        id,
        index,
        content: children,
        parentContainerId: columnId || "draggable-container",
      }),
      [id, index, children, columnId],
    );

    useEffect(() => {
      const idle: DragState = { type: "idle" };
      const element = itemRef?.current as unknown as HTMLElement;

      const cleanup = combine(
        draggable({
          element,
          getInitialData() {
            return getDraggableItemData(draggableItemData);
          },
          onDragStart() {
              setDragState({ type: "is-dragging", id });
          },
          onDrop() {
              setDragState(idle);
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
          onDragEnter({ self }) {
            const closestEdge = extractClosestEdge(self.data);
              setDragState({ type: "is-being-dragged-over", closestEdge, id });
          },
          onDrag({ self }) {
            const closestEdge = extractClosestEdge(self.data);
              setDragState({ type: "is-being-dragged-over", closestEdge, id });
          },
          onDragLeave() {
              setDragState(idle);
          },
          onDrop() {
              setDragState(idle);
          },
        }),
      );
      return () => cleanup();
    }, [id, draggableItemData, setDragState, itemRef]);

    return React.createElement(
      itemsNode,
      {
        ref: itemRef,
        "data-parent-container-id": columnId,
        "data-item-id": id,
        "data-drag-state": dragState.type,
        ...dragState.type === "is-being-dragged-over" && {
        "data-closest-edge": dragState.closestEdge,},
        "data-component": dataComponent,
        "data-role": dataRole,
        "data-element": dataElement,
        className,
        ...rest,
      },
      children,
    );
  },
);

export default DraggableItem;
