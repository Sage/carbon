import React, { forwardRef } from "react";
import DraggableItem from "../../../../__internal__/draggable/draggable-item";
import StyledFlatTableRow from "../flat-table-row.style";

export interface FlatTableRowDraggableProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
  /** ID for use in drag and drop functionality */
  id: number | string;
}

const FlatTableRowDraggable = forwardRef<
  HTMLTableRowElement,
  FlatTableRowDraggableProps
>(({ children, id, ...rest }, ref) => {
  return (
    <DraggableItem
      id={id}
      itemsNode={StyledFlatTableRow}
      ref={ref}
      itemProps={{
        ...rest,
      }}
    >
      {children}
    </DraggableItem>
  );
});

FlatTableRowDraggable.displayName = "FlatTableRowDraggable";

export default FlatTableRowDraggable;
