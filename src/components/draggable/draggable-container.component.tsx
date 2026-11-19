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
  ElementDropTargetEventBasePayload,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { getDropTarget, isDraggable, isDropTarget } from "./__internal__/data";
import {
  getDropLocation,
  getInsertionIndex,
  RegisteredDropItem,
} from "./__internal__/drop-placement";
import { getDropIndicator } from "./__internal__/drop-indicator";
import { useDraggableContainerGroup } from "./draggable-container-group.component";

export interface DraggableContainerProps
  extends MarginProps,
    PaddingProps,
    TagProps,
    React.HTMLAttributes<HTMLElement> {
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

  const latestItems = useRef(draggableItems);
  latestItems.current = draggableItems;
  const latestGetOrder = useRef(getOrder);
  latestGetOrder.current = getOrder;
  const registeredItems = useRef(new Map<string, RegisteredDropItem>());
  const registerItem = useCallback((item: RegisteredDropItem) => {
    registeredItems.current.set(item.id, item);
    return () => {
      registeredItems.current.delete(item.id);
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
    let indicatedItem: RegisteredDropItem | undefined;
    const clearIndicator = () => {
      indicatedItem?.onIndicatorChange(null);
      indicatedItem = undefined;
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
      if (indicatedItem !== item) clearIndicator();
      indicatedItem = item;
      item.onIndicatorChange(
        getDropIndicator({
          element: item.element,
          dragHandle: item.dragHandle,
          surface: item.getSurface(),
          position: target.position,
          neighbouringBounds: [...registeredItems.current.values()]
            .filter((neighbour) => neighbour !== item)
            .map((neighbour) => neighbour.getSurface().getBoundingClientRect())
            .filter((bounds) => bounds.width > 0 && bounds.height > 0),
        }),
      );
    };
    return dropTargetForElements({
      element,
      canDrop: ({ source }) =>
        isDraggable(source.data) &&
        (source.data.contextId === contextId ||
          (group !== null && source.data.groupId === group.groupId)),
      getData: ({ input, source }) => {
        const items = latestItems.current
          .filter(isDraggableItem)
          .flatMap((item) => {
            const registration = registeredItems.current.get(
              String(item.props.id),
            );
            return registration
              ? [
                  {
                    ...registration,
                    bounds: registration.getSurface().getBoundingClientRect(),
                  },
                ]
              : [];
          })
          .filter(({ bounds }) => bounds.width > 0 && bounds.height > 0);
        const layout = getComputedStyle(
          items[0]?.element.parentElement ?? element,
        );
        const horizontal =
          (layout.display.includes("flex") &&
            layout.flexDirection.startsWith("row")) ||
          (layout.display.includes("grid") &&
            layout.gridTemplateColumns.split(/\s+/).length > 1);
        const reverse = horizontal
          ? (layout.direction === "rtl") !==
            (layout.flexDirection === "row-reverse")
          : layout.flexDirection === "column-reverse";
        const location = getDropLocation(
          items,
          input,
          { horizontal, reverse },
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
    });
  }, [group, contextId]);

  const reorder = useCallback(
    (id: string, endIndex: number) => {
      const startIndex = draggableItems.findIndex(
        (child) => isDraggableItem(child) && String(child.props.id) === id,
      );

      if (
        startIndex === -1 ||
        !Number.isInteger(endIndex) ||
        endIndex < 0 ||
        endIndex >= draggableItems.length ||
        startIndex === endIndex
      )
        return false;

      const reorderedItems = arrayMove({
        array: draggableItems,
        startIndex,
        endIndex,
      });

      setDraggableItems(reorderedItems);
      getOrder?.(
        reorderedItems.map((child) => child.props.id),
        id,
      );
      return true;
    },
    [draggableItems, getOrder],
  );

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

  const handleDrop: DragDropProviderProps["onDrop"] = ({ dragged, target }) => {
    if (!target) return;
    if (target.contextId !== contextId) {
      group?.transfer(dragged, target);
      return;
    }
    const sourceIndex = draggableItems.findIndex(
      (child) => String(child.props.id) === dragged.id,
    );
    const targetIndex =
      target.id === null
        ? draggableItems.length
        : draggableItems.findIndex(
            (child) => String(child.props.id) === target.id,
          );
    if (targetIndex < 0 || sourceIndex < 0) return;
    reorder(
      dragged.id,
      getInsertionIndex(sourceIndex, targetIndex, target.placement ?? "before"),
    );
  };

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
      {...rest}
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
