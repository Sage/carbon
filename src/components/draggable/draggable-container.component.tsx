/* istanbul ignore file: Test with Playwright for better reliability */

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import { MarginProps } from "styled-system";

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

export interface DraggableContainerProps
  extends MarginProps,
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
  ...rest
}: DraggableContainerProps): JSX.Element => {
  const childNodes = React.Children.toArray(children);
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
      if (reorder(id, index)) focusAfterMove.current = focusedElement;
    },
    [reorder],
  );

  const handleDrop: DragDropProviderProps["onDrop"] = ({ dragged, target }) => {
    if (!target) return;
    reorder(
      dragged.id,
      draggableItems.findIndex((child) => String(child.props.id) === target.id),
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
      {...rest}
      data-component="draggable-container"
      data-element={dataElement}
      data-role={dataRole}
    >
      <DragDropProvider onDrop={handleDrop}>
        {parent
          ? React.cloneElement(parent, undefined, decoratedItems)
          : decoratedItems}
      </DragDropProvider>
    </StyledDraggableContainer>
  );
};

DraggableContainer.displayName = "DraggableContainer";

export default DraggableContainer;
