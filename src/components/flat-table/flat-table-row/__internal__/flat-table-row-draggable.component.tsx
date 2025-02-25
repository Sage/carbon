import React from "react";
import DraggableItem from "../../../../hooks/useDraggable/__internal__/draggable-item";
import StyledFlatTableRow from "../flat-table-row.style";

export interface FlatTableRowDraggableProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
  /** ID for use in drag and drop functionality */
  id: number | string;
}
export const FlatTableRowDraggable = ({
  children,
  id,
  ...rest
}: FlatTableRowDraggableProps) => {

return (
  <DraggableItem id={id} draggableItemStylingOptOut itemsNode={StyledFlatTableRow} {...rest} >
    {children}
  </DraggableItem>
)

};

FlatTableRowDraggable.displayName = "FlatTableRowDraggable";

export default FlatTableRowDraggable;
