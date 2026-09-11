import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { TableContext } from "../__internal__/contexts";
import arrayMove from "../../../__internal__/utils/helpers/array-move";
import {
  DragDropProvider,
  DragDropProviderProps,
} from "../__internal__/drag-drop";
import { TableRowProps } from "../table-row/table-row.component";
import flattenChildren from "../__internal__/utils";

const StyledTableBody = styled.tbody``;

export interface TableBodyProps {
  /**
   * The content of the table body.
   */
  children: React.ReactNode;
  /**
   * Callback function that provides the current order of draggable item IDs.
   */
  getOrder?: (draggableItemIds?: (string | number | undefined)[]) => void;
}

const DraggableTableBodyInner = ({
  draggableItems,
  ...props
}: {
  draggableItems: React.ReactNode[];
} & Omit<React.ComponentPropsWithoutRef<"tbody">, "children">) => {
  return (
    <StyledTableBody {...props} data-role="draggable-table-body">
      {draggableItems.map((child, index) => {
        /* istanbul ignore if */
        if (!React.isValidElement<TableRowProps>(child)) return null;

        const rowId = `${child.props.id}`;

        return React.cloneElement(child, {
          key: rowId,
          id: rowId,
          draggableProps: { index },
        });
      })}
    </StyledTableBody>
  );
};

const DraggableTableBody = ({
  draggableItems,
  setDraggableItems,
  getOrder,
  ...props
}: {
  draggableItems: React.ReactNode[];
  setDraggableItems: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  getOrder?: TableBodyProps["getOrder"];
} & Omit<React.ComponentPropsWithoutRef<"tbody">, "children">) => {
  const handleDrop: DragDropProviderProps["onDrop"] = ({ dragged, target }) => {
    if (!target) return;

    const startIndex = draggableItems.findIndex(
      (row) =>
        React.isValidElement<TableRowProps>(row) &&
        String(row.props.id) === dragged.id,
    );
    const endIndex = draggableItems.findIndex(
      (row) =>
        React.isValidElement<TableRowProps>(row) &&
        String(row.props.id) === target.id,
    );

    if (startIndex === -1 || endIndex === -1 || startIndex === endIndex) {
      return;
    }

    const reorderedItems = arrayMove({
      array: draggableItems,
      startIndex,
      endIndex,
    });

    setDraggableItems(reorderedItems);

    getOrder?.(
      reorderedItems
        .filter(React.isValidElement<TableRowProps>)
        .map((row) => row.props.id),
    );
  };

  return (
    <DragDropProvider onDrop={handleDrop}>
      <DraggableTableBodyInner {...props} draggableItems={draggableItems} />
    </DragDropProvider>
  );
};

const TableBody = ({ children, getOrder, ...props }: TableBodyProps) => {
  const { isDraggable } = useContext(TableContext);
  const [draggableItems, setDraggableItems] = useState(
    flattenChildren(children),
  );
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    /* istanbul ignore else */
    if (isDraggable) {
      setDraggableItems(flattenChildren(children));
    }
  }, [children, isDraggable]);

  if (isDraggable) {
    return (
      <DraggableTableBody
        {...props}
        draggableItems={draggableItems}
        setDraggableItems={setDraggableItems}
        getOrder={getOrder}
      />
    );
  }

  return <StyledTableBody {...props}>{children}</StyledTableBody>;
};

export default TableBody;
