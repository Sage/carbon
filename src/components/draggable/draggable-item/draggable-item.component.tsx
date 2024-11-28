import React, { useState, useRef, useEffect } from "react";
import { PaddingProps } from "styled-system";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

import {
  getDraggableItemData,
  isDraggableItemData,
} from "../__internal__/draggable-utils";

import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { StyledDraggableItem, StyledIcon } from "./draggable-item.style";
import useDraggable from "../../../hooks/useDraggable/useDraggable";

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

  const [DraggableItem] = useDraggable();
    
  return (
    <DraggableItem>
      <StyledDraggableItem
        data-element="draggable"
        data-role="draggable-item"
        data-id={id}
        py={py}
        {...paddingProps}
      >
        <StyledIcon type="drag" />
      </StyledDraggableItem>
      </DraggableItem>
  );
};

DraggableItem.displayName = "DraggableItem";

export default DraggableItem;
