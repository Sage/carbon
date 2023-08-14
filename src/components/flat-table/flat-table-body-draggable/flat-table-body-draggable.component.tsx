import React, { useEffect, useState, useRef } from "react";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import StyledFlatTableBodyDraggable from "./flat-table-body-draggable.style";

interface DraggableBodyContextProps {
  draggable?: boolean;
  /** function to find an item in the list of draggable items */
  findItem?: (id?: number | string) => Record<string, unknown>;
  /** function to reposition an item in the list of draggable items */
  moveItem?: (id?: number | string, index?: number) => void;
}
export const DraggableBodyContext = React.createContext<DraggableBodyContextProps>(
  {}
);

export interface FlatTableBodyDraggableProps {
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
      data-testid="flat-table-body-draggable"
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
  const [draggableItems, setDraggableItems] = useState<HTMLTableRowElement[]>(
    []
  );
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      const body = document.querySelector(
        '[data-testid="flat-table-body-draggable"]'
      );

      if (body) {
        const items = body.querySelectorAll("tr");
        if (items) {
          setDraggableItems(Array.from(items));
        }
      }
    } else {
      isFirstRender.current = false;
    }
  }, [children]);

  const findItem = (id?: string | number) => {
    if (id === undefined) return {};

    const draggableItem = draggableItems.filter(
      (item) => item?.getAttribute("id") === id
    )[0];

    return {
      draggableItem,
      index: draggableItems.indexOf(draggableItem),
    };
  };

  const moveItem = (id?: string | number, atIndex?: number) => {
    if (id === undefined || atIndex === undefined) return;

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

    const draggableItemIds = draggableItems.map((draggableItem) =>
      Number(draggableItem.getAttribute("id") || "")
    );

    getOrder(draggableItemIds);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <DropTarget getOrder={getItemsId} {...rest}>
        <DraggableBodyContext.Provider
          value={{ draggable: true, moveItem, findItem }}
        >
          {children}
        </DraggableBodyContext.Provider>
      </DropTarget>
    </DndProvider>
  );
};

export default FlatTableBodyDraggable;
