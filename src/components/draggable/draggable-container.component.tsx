import React, { useEffect, useState, useRef, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MarginProps } from "styled-system";

import invariant from "invariant";
import { filterStyledSystemMarginProps } from "../../style/utils";
import DraggableItem from "./draggable-item/draggable-item.component";
import DropTarget from "./__internal__/drop-target.component";
import { TagProps } from "../../__internal__/utils/helpers/tags";

export interface DraggableContainerProps
  extends MarginProps,
    Omit<TagProps, "data-component"> {
  /** Callback fired when order is changed */
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void;
  /**
   * The content of the component
   *
   * `<DraggableItem />` is required to make `Draggable` works
   */
  children?: React.ReactNode;
}

const DraggableContainer = ({
  "data-element": dataElement,
  "data-role": dataRole = "draggable-container",
  children,
  getOrder,
  ...rest
}: DraggableContainerProps): JSX.Element => {
  const [draggableItems, setDraggableItems] = useState(
    React.Children.toArray(children),
  );

  const hasProperChildren = useMemo(
    () =>
      React.Children.toArray(children).every(
        (child) =>
          React.isValidElement(child) &&
          (child.type as React.FunctionComponent).displayName ===
            DraggableItem.displayName,
      ),
    [children],
  );

  // `<DraggableItem />` is required to make `Draggable` work
  invariant(
    hasProperChildren,
    `\`${DraggableContainer.displayName}\` only accepts children of type \`${DraggableItem.displayName}\`.`,
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setDraggableItems(React.Children.toArray(children));
    } else {
      isFirstRender.current = false;
    }
  }, [children]);

  const findItem = (id: string | number) => {
    const draggableItem = draggableItems.filter((item) => {
      return React.isValidElement(item) && `${item.props.id}` === id;
    })[0];

    return {
      draggableItem,
      index: draggableItems.indexOf(draggableItem),
    };
  };

  const moveItem = (id: string, atIndex: number) => {
    const { draggableItem, index } = findItem(id);

    // istanbul ignore if
    if (!draggableItem) return;

    const copyOfDraggableItems = [...draggableItems];
    copyOfDraggableItems.splice(index, 1);
    copyOfDraggableItems.splice(atIndex, 0, draggableItem);
    setDraggableItems(copyOfDraggableItems);
  };

  const getItemsId = (item?: string | number) => {
    if (!getOrder) {
      return;
    }

    const draggableItemIds = draggableItems.map(
      (draggableItem) => (draggableItem as { props: { id: string } }).props.id,
    );

    getOrder(draggableItemIds, item);
  };

  const marginProps = filterStyledSystemMarginProps(rest);

  return (
    <DndProvider backend={HTML5Backend}>
      <DropTarget
        data-element={dataElement}
        data-role={dataRole}
        getOrder={getItemsId}
        {...marginProps}
      >
        {draggableItems.map((item) => {
          return (
            React.isValidElement(item) &&
            React.cloneElement(
              item as React.ReactElement,
              {
                id: `${item.props.id}`,
                findItem,
                moveItem,
              },
              [item.props.children],
            )
          );
        })}
      </DropTarget>
    </DndProvider>
  );
};

DraggableContainer.displayName = "DraggableContainer";

export default DraggableContainer;
