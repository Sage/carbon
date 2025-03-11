import React, { forwardRef } from "react";

import { TagProps } from "../../../__internal__/utils/helpers/tags";
import DraggableContainer from "../../../__internal__/draggable/draggable-container";
import FlatTableBodyDraggableContext from "./__internal__/flat-table-body-draggable-context";
import { FlatTableBodyDraggableHandle } from "..";

export interface FlatTableBodyDraggableProps extends TagProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
  /** Callback fired when order is changed */
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void;
}

const FlatTableBodyDraggable = forwardRef<
  FlatTableBodyDraggableHandle,
  FlatTableBodyDraggableProps
>(({ children, getOrder, ...rest }, ref) => {
  return (
    <FlatTableBodyDraggableContext.Provider
      value={{ isInFlatTableBodyDraggable: true }}
    >
      <DraggableContainer
        data-component="flat-table-body-draggable"
        data-role="flat-table-body-draggable"
        getOrder={getOrder}
        containerNode="tbody"
        ref={ref}
        {...rest}
      >
        {children}
      </DraggableContainer>
    </FlatTableBodyDraggableContext.Provider>
  );
});

FlatTableBodyDraggable.displayName = "FlatTableBodyDraggable";

export default FlatTableBodyDraggable;
