import React, { useEffect, useState, useRef, useMemo } from "react";
import { MarginProps } from "styled-system";

import invariant from "invariant";
import { filterStyledSystemMarginProps } from "../../style/utils";
import DraggableItem from "./draggable-item/draggable-item.component";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import { isDraggableItemData } from "./__internal__/draggable-utils";

import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash";
import { flushSync } from "react-dom";
import useDraggable from "../../hooks/useDraggable/useDraggable";

export interface DraggableItemProps {
  id: string;
  children?: React.ReactNode;
}

export interface DraggableContainerProps
  extends MarginProps,
    Omit<TagProps, "data-component"> {
  children?: React.ReactNode;
}

export type DraggableContextType = {
  dragState?: any;
};

export const DraggableContainerContext = React.createContext<DraggableContextType>({});


const DraggableContainer = ({
  "data-element": dataElement,
  "data-role": dataRole = "draggable-container",
  children,
  ...rest
}: DraggableContainerProps): JSX.Element => {
  
  const [DraggableContainer, dragState] = useDraggable(children);


  return <DraggableContainerContext.Provider value={{ dragState }}>{DraggableContainer}</DraggableContainerContext.Provider>;
};

DraggableContainer.displayName = "DraggableContainer";

export default DraggableContainer;
