/* istanbul ignore file: Test with Playwright for better reliability */

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import { MarginProps, PaddingProps } from "styled-system";

import invariant from "invariant";
import DraggableItem, {
  DraggableItemProps,
} from "./draggable-item/draggable-item.component";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import { StyledDraggableContainer } from "./draggable-item/draggable-item.style";
import {
  DragDropProvider,
  type DragDropProviderProps,
} from "./__internal__/drag-drop-provider";
import arrayMove from "../../__internal__/utils/helpers/array-move";
import {
  dropTargetForElements,
  monitorForElements,
  ElementDropTargetEventBasePayload,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { getDropTarget, isDraggable, isDropTarget } from "./__internal__/data";
import {
  getDropLocation,
  getInsertionIndex,
  RegisteredDropItem,
} from "./__internal__/drop-placement";
import { getDropIndicator } from "./__internal__/drop-indicator";
import createDropGeometry from "./__internal__/drop-geometry";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { useDraggableContainerGroup } from "./draggable-container-group.component";
import {
  DraggableHTMLAttributes,
  filterDragAttributes,
} from "./__internal__/html-attributes";

export interface DraggableContainerProps
  extends MarginProps,
    PaddingProps,
    TagProps,
    DraggableHTMLAttributes {
  /** Callback fired when an item is reordered by dragging or moveTo. */
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void;
  /**
   * The content of the component
   *
   * Pass DraggableItems directly, or wrap them in a single parent element or component such as Box.
   */
  children?: React.ReactNode;
  /**
   * Defines the direction in which the draggable items contents are placed.
   * Useful if relying on fallback draggable icon.
   */
  flexDirection?: "row" | "row-reverse";
  /**
   * The width of the draggable container.
   */
  width?: string;
  /**
   * The height of the draggable container.
   */
  height?: string;
  /**
   * The minimum width of the draggable container.
   */
  minWidth?: string;
  /**
   * The maximum width of the draggable container.
   */
  maxWidth?: string;
  /**
   * The minimum height of the draggable container.
   */
  minHeight?: string;
  /**
   * The maximum height of the draggable container.
   */
  maxHeight?: string;
}

// Predicate to check whether a node is a DraggableItem component
function isDraggableItem(
  node: unknown,
): node is React.ReactElement<DraggableItemProps> {
  return (
    React.isValidElement(node) &&
    (node.type as React.FunctionComponent).displayName === "DraggableItem"
  );
}

const useIsomorphicEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const DraggableContainer = ({
  "data-element": dataElement,
  "data-role": dataRole = "draggable-container",
  children,
  getOrder,
  flexDirection = "row",
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  ...rest
}: DraggableContainerProps): JSX.Element => {
  const childNodes = React.Children.toArray(children);
  const group = useDraggableContainerGroup();
  const [contextId] = useState(() => Symbol("draggable-container"));
  const containerRef = useRef<HTMLDivElement>(null);
  const parent =
    childNodes.length === 1 &&
    React.isValidElement<{ children?: React.ReactNode }>(childNodes[0]) &&
    !isDraggableItem(childNodes[0])
      ? childNodes[0]
      : null;
  const itemChildren = parent ? parent.props.children : children;
  const [draggableItems, setDraggableItems] = useState(
    React.Children.toArray(itemChildren),
  );
  const previousItems = useRef(React.Children.toArray(itemChildren));
  const focusAfterMove = useRef<HTMLElement | null>(null);
  const latestItems = useRef(draggableItems);
  latestItems.current = draggableItems;
  const latestGetOrder = useRef(getOrder);
  latestGetOrder.current = getOrder;
  const invalidateGeometry = useRef(() => {});
  const registeredItems = useRef(new Map<string, RegisteredDropItem>());

  useIsomorphicEffect(() => {
    focusAfterMove.current?.focus({ preventScroll: true });
    focusAfterMove.current = null;
  }, [draggableItems]);

  useIsomorphicEffect(() => {
    const nextItems = React.Children.toArray(itemChildren);
    const getIds = (items: React.ReactNode[]) =>
      items.map((item) =>
        isDraggableItem(item) ? String(item.props.id) : null,
      );
    const previousIds = getIds(previousItems.current);
    const nextIds = getIds(nextItems);
    const orderChanged =
      nextIds.length !== previousIds.length ||
      nextIds.some((id, index) => id !== previousIds[index]);
    previousItems.current = nextItems;

    if (orderChanged || !nextItems.every(isDraggableItem)) {
      setDraggableItems(nextItems);
      return;
    }

    // Refresh child props without losing the user's order when, for example,
    // a controlled input inside a Card updates. Explicit parent order changes
    // and additions/removals still replace the list.
    const itemsById = new Map(
      nextItems.map((item) => [String(item.props.id), item]),
    );
    setDraggableItems((current) =>
      current.map((item) =>
        isDraggableItem(item)
          ? (itemsById.get(String(item.props.id)) ?? item)
          : item,
      ),
    );
  }, [itemChildren]);

  const hasValidChildren = draggableItems.every((child) =>
    isDraggableItem(child),
  );

  // `<DraggableItem />` is required to make `Draggable` work
  invariant(
    hasValidChildren,
    `\`${DraggableContainer.displayName}\` only accepts children of type \`${DraggableItem.displayName}\`.`,
  );

  useIsomorphicEffect(() => {
    invalidateGeometry.current();
  });

  const registerItem = useCallback((item: RegisteredDropItem) => {
    registeredItems.current.set(item.id, item);
    invalidateGeometry.current();
    return () => {
      registeredItems.current.delete(item.id);
      invalidateGeometry.current();
    };
  }, []);

  useEffect(
    () =>
      group?.register(contextId, {
        getItems: () => latestItems.current.filter(isDraggableItem),
        update: (items, movedId) => {
          setDraggableItems(items);
          latestGetOrder.current?.(
            items.map((item) => item.props.id),
            movedId,
          );
        },
      }),
    [group, contextId],
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const geometry = createDropGeometry(element, () =>
      latestItems.current.flatMap((item) => {
        /* istanbul ignore else */
        if (React.isValidElement(item)) {
          const registration = registeredItems.current.get(
            String(item.props.id),
          );
          return registration ? [registration] : [];
        }

        return [];
      }),
    );
    invalidateGeometry.current = geometry.invalidate;
    let indicatedItem: RegisteredDropItem | undefined;
    let indicatedGeometry: ReturnType<typeof geometry.get> | undefined;
    let indicatedPosition: string | undefined;
    const clearIndicator = () => {
      indicatedItem?.onIndicatorChange(null);
      indicatedItem = undefined;
      indicatedGeometry = undefined;
      indicatedPosition = undefined;
    };
    const updateIndicator = ({
      self,
      source,
      location,
    }: ElementDropTargetEventBasePayload) => {
      if (
        location.current.dropTargets[0]?.element !== element ||
        !isDropTarget(self.data) ||
        !isDraggable(source.data)
      ) {
        clearIndicator();
        return;
      }
      const target = self.data;
      const item =
        target.id === null ? undefined : registeredItems.current.get(target.id);
      const ids = latestItems.current
        .filter(isDraggableItem)
        .map((item) => String(item.props.id));
      const sourceIndex = ids.indexOf(source.data.id);
      const unchanged =
        source.data.contextId === contextId &&
        target.id !== null &&
        target.placement &&
        getInsertionIndex(
          sourceIndex,
          ids.indexOf(target.id),
          target.placement,
        ) === sourceIndex;
      if (!item || !target.position || unchanged) {
        clearIndicator();
        return;
      }
      const snapshot = geometry.get();
      if (
        indicatedItem === item &&
        indicatedPosition === target.position &&
        indicatedGeometry === snapshot
      )
        return;
      if (indicatedItem !== item) clearIndicator();
      indicatedItem = item;
      indicatedPosition = target.position;
      indicatedGeometry = snapshot;
      item.onIndicatorChange(
        getDropIndicator({
          element: item.element,
          dragHandle: item.dragHandle,
          surface: snapshot.items.find((entry) => entry.id === item.id)
            ?.surface,
          position: target.position,
          neighbouringBounds: snapshot.items
            .filter((neighbour) => neighbour.id !== item.id)
            .map((neighbour) => neighbour.bounds),
        }),
      );
    };
    const canDrop = ({
      source,
    }: {
      source: { data: Record<string, unknown> };
    }) =>
      isDraggable(source.data) &&
      (source.data.contextId === contextId ||
        (group !== null && source.data.groupId === group.groupId));
    return combine(
      geometry.cleanup,
      monitorForElements({
        canMonitor: canDrop,
        onGenerateDragPreview: geometry.invalidate,
        onDrop: geometry.invalidate,
      }),
      dropTargetForElements({
        element,
        canDrop,
        getData: ({ input, source }) => {
          const { items, layout } = geometry.get();
          const location = getDropLocation(
            items,
            input,
            layout,
            isDraggable(source.data) ? source.data.preview : undefined,
            isDraggable(source.data) && source.data.contextId === contextId
              ? source.data.id
              : undefined,
          );
          return getDropTarget({
            id: null,
            ...location,
            contextId,
            groupId: group?.groupId,
          });
        },
        onDragEnter: updateIndicator,
        onDrag: updateIndicator,
        onDragLeave: clearIndicator,
        onDrop: clearIndicator,
      }),
    );
  }, [group, contextId]);

  const reorder = useCallback((id: string, endIndex: number) => {
    const items = latestItems.current;
    const startIndex = items.findIndex(
      (child) => isDraggableItem(child) && String(child.props.id) === id,
    );

    if (
      startIndex === -1 ||
      !Number.isInteger(endIndex) ||
      endIndex < 0 ||
      endIndex >= items.length ||
      startIndex === endIndex
    )
      return false;

    const reorderedItems = arrayMove({
      array: items,
      startIndex,
      endIndex,
    });

    setDraggableItems(reorderedItems);
    latestGetOrder.current?.(
      reorderedItems.map((child) => {
        /* istanbul ignore else */
        if (React.isValidElement(child)) {
          return String(child.props.id);
        }
        return "";
      }),
      id,
    );
    return true;
  }, []);

  const handleMove = useCallback(
    (id: string, index: number) => {
      // ActionPopover focuses its trigger before invoking a move action. Restore
      // that same element after React moves its item in the DOM.
      const focusedElement =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      focusAfterMove.current = focusedElement;

      if (!reorder(id, index)) focusAfterMove.current = null;
    },
    [reorder],
  );

  const handleDrop = useCallback<NonNullable<DragDropProviderProps["onDrop"]>>(
    ({ dragged, target }) => {
      if (!target) return;

      if (target.contextId !== contextId) {
        group?.transfer(dragged, target);
        return;
      }

      const items = latestItems.current;
      const sourceIndex = items.findIndex(
        (child) =>
          React.isValidElement(child) && String(child.props.id) === dragged.id,
      );
      const targetIndex =
        target.id === null
          ? items.length
          : items.findIndex(
              (child) =>
                React.isValidElement(child) &&
                String(child.props.id) === target.id,
            );

      if (targetIndex < 0 || sourceIndex < 0) {
        return;
      }

      reorder(
        dragged.id,
        getInsertionIndex(
          sourceIndex,
          targetIndex,
          target.placement ?? "before",
        ),
      );
    },
    [contextId, group, reorder],
  );

  const decoratedItems = draggableItems.map((item, index) =>
    React.cloneElement(item, {
      key: String(item.props.id),
      index,
      flexDirection,
      itemCount: draggableItems.length,
      onMove: handleMove,
    }),
  );

  return (
    <StyledDraggableContainer
      ref={containerRef}
      $isLinked={Boolean(group)}
      {...filterDragAttributes(rest)}
      data-component="draggable-container"
      data-element={dataElement}
      data-role={dataRole}
      $width={width}
      $height={height}
      $minWidth={minWidth}
      $maxWidth={maxWidth}
      $minHeight={minHeight}
      $maxHeight={maxHeight}
    >
      <DragDropProvider
        onDrop={handleDrop}
        contextId={contextId}
        groupId={group?.groupId}
        registerItem={registerItem}
      >
        {parent
          ? React.cloneElement(parent, undefined, decoratedItems)
          : decoratedItems}
      </DragDropProvider>
    </StyledDraggableContainer>
  );
};

DraggableContainer.displayName = "DraggableContainer";

export default DraggableContainer;
