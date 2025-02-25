import React from "react";

import { TagProps } from "../../../__internal__/utils/helpers/tags";
import DraggableContainer from "../../../hooks/useDraggable/__internal__/draggable-container";
import FlatTableBodyDraggableContext from "./__internal__/flat-table-body-draggable-context";

export interface FlatTableBodyDraggableProps extends TagProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
  /** Callback fired when order is changed */
  getOrder?: (draggableItemIds?: number[] | string[]) => void;
}


export const FlatTableBodyDraggable = ({
  children,
  getOrder,
}: FlatTableBodyDraggableProps) => {

  return (
    <FlatTableBodyDraggableContext.Provider value={{ isInFlatTableBodyDraggable: true }}>
    <DraggableContainer containerNode="tbody">
      {children}
    </DraggableContainer>
    </FlatTableBodyDraggableContext.Provider>
  );
};

export default FlatTableBodyDraggable;
