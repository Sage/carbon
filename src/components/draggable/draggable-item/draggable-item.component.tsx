import React from "react";
import { PaddingProps } from "styled-system";

import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { StyledDraggableItem } from "./draggable-item.style";
import Icon from "../../icon";

export interface DraggableItemProps extends PaddingProps {
  /**
   * The id of the `DraggableItem`.
   *
   * Use this prop to make `Draggable` work
   */
  id: number | string;
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

  return (
    <StyledDraggableItem
      data-element="draggable"
      data-role="draggable-item"
      py={py}
      id={String(id)}
      {...paddingProps}
    >
      {children}
      <Icon type="drag" />
    </StyledDraggableItem>
  );
};

DraggableItem.displayName = "DraggableItem";

export default DraggableItem;
