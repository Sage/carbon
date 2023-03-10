import React from "react";
import { useDrop } from "react-dnd";
import { DraggableContainerProps } from "../draggable-container.component";

import { StyledDraggableContainer } from "../draggable-item.style";

interface DropTargetProps extends Omit<DraggableContainerProps, "getOrder"> {
  children?: React.ReactNode;
  getOrder: (movedItemId?: string | number | undefined) => void;
}

interface DropItemProps {
  id: number | string;
  originalIndex: number;
}

const DropTarget = ({ children, getOrder, ...rest }: DropTargetProps) => {
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
    <StyledDraggableContainer ref={drop} {...rest}>
      {children}
    </StyledDraggableContainer>
  );
};

export default DropTarget;
