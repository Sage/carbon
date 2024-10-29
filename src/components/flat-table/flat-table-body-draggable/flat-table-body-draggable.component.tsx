import React, { useEffect, useState, useRef } from "react";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { TagProps } from "../../../__internal__/utils/helpers/tags";
import StyledIcon from "../../icon/icon.style";
import StyledFlatTableBodyDraggable from "./flat-table-body-draggable.style";
import FlatTableCell from "../flat-table-cell/flat-table-cell.component";

export interface FlatTableBodyDraggableProps
  extends Omit<TagProps, "data-component"> {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
  /** Callback fired when order is changed */
  getOrder?: (draggableItemIds?: number[]) => void;
}

const DropTarget = ({
  children,
  getOrder,
  ...rest
}: FlatTableBodyDraggableProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const [, drop] = useDrop({
    accept: "flatTableRow",
    hover: (_, monitor) => {
      if (!isDragging && monitor.isOver()) setIsDragging(true);
    },
    drop() {
      setIsDragging(false);
      getOrder?.();
    },
  });

  return (
    <StyledFlatTableBodyDraggable
      data-component="flat-table-body-draggable"
      data-role="flat-table-body-draggable"
      ref={drop}
      isDragging={isDragging}
      {...rest}
    >
      {children}
    </StyledFlatTableBodyDraggable>
  );
};

export const FlatTableBodyDraggable = ({
  children,
  getOrder,
  ...rest
}: FlatTableBodyDraggableProps) => {
  const [draggableItems, setDraggableItems] = useState(
    React.Children.toArray(children),
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
    const draggableItem = draggableItems.filter(
      (item) => React.isValidElement(item) && `${item.props.id}` === id,
    )[0];

    return {
      draggableItem,
      index: draggableItems.indexOf(draggableItem),
    };
  };

  const moveItem = (id: string | number, atIndex: number) => {
    const { draggableItem, index } = findItem(id);
    if (!draggableItem) return;

    const copyOfDraggableItems = [...draggableItems];
    copyOfDraggableItems.splice(index, 1);
    copyOfDraggableItems.splice(atIndex, 0, draggableItem);
    setDraggableItems(copyOfDraggableItems);
  };

  const getItemsId = () => {
    if (!getOrder) {
      return;
    }

    const draggableItemIds = draggableItems.map(
      (draggableItem) =>
        React.isValidElement(draggableItem) && draggableItem.props.id,
    );

    getOrder(draggableItemIds);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <DropTarget getOrder={getItemsId} {...rest}>
        {draggableItems.map(
          (item) =>
            React.isValidElement(item) &&
            React.cloneElement(
              item as React.ReactElement,
              {
                id: `${item.props.id}`,
                moveItem,
                findItem,
                draggable: true,
              },
              [
                <FlatTableCell key={item.props.id}>
                  <StyledIcon type="drag" />
                </FlatTableCell>,
                item.props.children,
              ],
            ),
        )}
      </DropTarget>
    </DndProvider>
  );
};

export default FlatTableBodyDraggable;
