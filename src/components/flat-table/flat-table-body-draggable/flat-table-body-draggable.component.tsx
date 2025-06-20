import React, { useContext, forwardRef } from "react";
import { TagProps } from "../../../__internal__/utils/helpers/tags";
import DraggableContainer from "../../../__internal__/draggable/draggable-container";
import { FlatTableBodyDraggableHandle } from "..";
import StyledFlatTableBodyDraggable from "./flat-table-body-draggable.style";
import FlatTableBodyDraggableContext from "./flat-table-body-draggable-context";
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
      <DraggableContainer
        ref={ref}
        containerNode={StyledFlatTableBodyDraggable}
        getOrder={getOrder}
        containerProps={{
          "data-component": "flat-table-body-draggable",
          "data-role": "flat-table-body-draggable",
          isInSidebar,
          ...rest,
        }}
      >
        {children}
      </DraggableContainer>
    </FlatTableBodyDraggableContext.Provider>
  );
});

FlatTableBodyDraggable.displayName = "FlatTableBodyDraggable";

export default FlatTableBodyDraggable;
