import React, { forwardRef, useContext } from "react";

import { TagProps } from "../../../__internal__/utils/helpers/tags";
import FlatTableBodyDraggableContext from "./__internal__/flat-table-body-draggable-context";
import { FlatTableBodyDraggableHandle } from "..";
import StyledFlatTableBodyDraggable from "./flat-table-body-draggable.style";
import DrawerSidebarContext from "../../drawer/__internal__/drawer-sidebar.context";

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

  const { isInSidebar } = useContext(DrawerSidebarContext);

  return (
    <FlatTableBodyDraggableContext.Provider
      value={{ isInFlatTableBodyDraggable: true }}
    >
      <StyledFlatTableBodyDraggable
        data-component="flat-table-body-draggable"
        data-role="flat-table-body-draggable"
        getOrder={getOrder}
        containerNode="tbody"
        ref={ref}
        isInSidebar={isInSidebar}        
        {...rest}
      >
        {children}
      </StyledFlatTableBodyDraggable>
    </FlatTableBodyDraggableContext.Provider>
  );
});

FlatTableBodyDraggable.displayName = "FlatTableBodyDraggable";

export default FlatTableBodyDraggable;
