import React, { useContext } from "react";
import { PaddingProps } from "styled-system";
import { DraggableContainerContext } from "../draggable-container.component";

import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { StyledDraggableItem, StyledIcon } from "./draggable-item.style";

export interface DraggableItemProps extends PaddingProps {
  /**
   * The id of the `DraggableItem`.
   *
   * Use this prop to make `Draggable` work
   */
  id?: number | string;
  /** The content of the component. */
  children: React.ReactNode;
}

const DraggableItem = ({
  id,
  children,
  py = 1,
  ...rest
}: DraggableItemProps): JSX.Element => {

  const paddingProps = filterStyledSystemPaddingProps(rest);

  const { dragState } = useContext(DraggableContainerContext);
  const dragStateType = dragState?.type;
  const dragStateId = dragState?.id;

  return (
      <StyledDraggableItem
        data-element="draggable"
        data-role="draggable-item"
        py={py}
        dragState={dragStateId === id ? dragStateType : "idle"}
        {...paddingProps}
      >
        {children}
        <StyledIcon type="drag" />
      </StyledDraggableItem> 
  );
};

DraggableItem.displayName = "DraggableItem";

export default DraggableItem;
