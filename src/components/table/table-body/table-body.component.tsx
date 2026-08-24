import React, {useContext, useState, useRef, useEffect} from "react";
import styled from "styled-components";
import {TableContext} from "../__internal__/context";
import arrayMove from "../../../__internal__/utils/helpers/array-move";
import {
  DragDropProvider,
  DragDropProviderProps,
} from "../__internal__/sortable";
import { TableRowProps } from "../table-row/table-row.component";

const StyledTableBody = styled.tbody``;

export interface TableBodyProps {
  children: React.ReactNode;
  getOrder?: (draggableItemIds?: (string | number | undefined)[]) => void;
}

const flattenChildren = (children: React.ReactNode): React.ReactNode[] => {
  return React.Children.toArray(children).flatMap((child) => {
    if (!React.isValidElement(child)) {
      return undefined;
    }

    if (child.type === React.Fragment) {
      return flattenChildren(child.props.children);
    }

    return child;
  });
};

const DraggableTableBodyInner = ({
  draggableItems,
  ...props
}: {
  draggableItems: React.ReactNode[];
} & Omit<React.ComponentPropsWithoutRef<"tbody">, "children">) => {
  return (
    <StyledTableBody {...props} data-role="draggable-table-body">
      {draggableItems.map((child, index) => {
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
    if (target) {
      setDraggableItems((prev) => {
        const startIndex = prev.findIndex(
          (row) =>
            React.isValidElement(row) && String(row.props.id) === dragged.id,
        );
        const endIndex = prev.findIndex(
          (row) =>
            React.isValidElement(row) && String(row.props.id) === target.id,
        );

        if (startIndex === -1 || endIndex === -1 || startIndex === endIndex) {
          return prev;
        }

        const reorderedItems = arrayMove({ array: prev, startIndex, endIndex });
        const childRowIds = reorderedItems
          .map((row) => (React.isValidElement(row) ? row.props.id : ""))
          .filter(Boolean);
        getOrder?.(childRowIds);

        return reorderedItems;
      });

      return;
    }
  };

  return (
    <DragDropProvider onDrop={handleDrop}>
      <DraggableTableBodyInner
        {...props}
        draggableItems={draggableItems}
      />
    </DragDropProvider>
  );
};

const TableBody = ({ children, getOrder, ...props }: TableBodyProps) => {
  const { isDraggable } = useContext(TableContext);
  const [draggableItems, setDraggableItems] = useState(flattenChildren(children));
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setDraggableItems(flattenChildren(children));
    } else {
      isFirstRender.current = false;
    }
  }, [children]);

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
