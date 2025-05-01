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
  HTMLDivElement,
  FlatTableRowDraggableProps
>(({ children, id, ...rest }, ref) => {
  return (
    <DraggableItem
      uniqueId={id}
      stylingOptOut
      itemsNode={StyledFlatTableRow}
      ref={ref}
      {...rest}
    >
      {children}
    </DraggableItem>
  );
});

FlatTableRowDraggable.displayName = "FlatTableRowDraggable";

export default FlatTableRowDraggable;
