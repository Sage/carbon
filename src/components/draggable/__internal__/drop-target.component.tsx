import React, { forwardRef } from "react";
import { useDrop } from "react-dnd";
import { DraggableContainerProps } from "../draggable-container.component";

import { StyledDraggableContainer } from "../draggable-item/draggable-item.style";

interface DropTargetProps extends Omit<DraggableContainerProps, "getOrder"> {
  children?: React.ReactNode;
  getOrder: (movedItemId?: string | number | undefined) => void;
}

interface DropItemProps {
  id: number | string;
  originalIndex: number;
}

const DropTarget = forwardRef<HTMLDivElement, DropTargetProps>(
  (
    {
      "data-element": dataElement,
      "data-role": dataRole,
      children,
      getOrder,
      ...rest
    },
    ref,
  ) => {
    const [, drop] = useDrop({
      accept: "draggableItem",
      drop(item: DropItemProps) {
        // istanbul ignore else
        if (getOrder) {
          getOrder(item?.id);
        }
      },
    });

    return (
      <StyledDraggableContainer
        ref={(node) => {
          drop(node);
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        data-component="draggable-container"
        data-element={dataElement}
        data-role={dataRole}
        {...rest}
      >
        {children}
      </StyledDraggableContainer>
    );
  },
);

export default DropTarget;
