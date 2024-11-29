import React, { useEffect, useState, useRef, useMemo } from "react";
import { MarginProps } from "styled-system";

import invariant from "invariant";
import { isDraggableItemData } from "./draggable-utils";

import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash";
import { flushSync } from "react-dom";

export interface DraggableItemProps {
  id?: string;
  children?: React.ReactNode;
}

export interface DraggableContainerProps {
  children?: React.ReactNode;
}

const DraggableContainer = ({
  children,
}: DraggableContainerProps): JSX.Element => {

  const [childElements, setChildElements] = useState<React.ReactNode[]>(React.Children.toArray(children));

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return isDraggableItemData(source.data);
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;

        if (
          !isDraggableItemData(sourceData) ||
          !isDraggableItemData(targetData)
        ) {
          return;
        }

        const indexOfSource = Number(sourceData.itemId);
        const indexOfTarget = Number(targetData.itemId);

        if (indexOfTarget < 0 || indexOfSource < 0) {
          return;
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        // Update draggable items and reassign IDs
        flushSync(() => {
          const newOrder = reorderWithEdge({
            list: childElements,
            startIndex: indexOfSource,
            indexOfTarget,
            closestEdgeOfTarget,
            axis: "vertical",
          }).map((item, index) =>
            React.isValidElement<DraggableItemProps>(item)
              ? React.cloneElement(item, { id: index.toString() })
              : item,
          );

          setChildElements(newOrder);
        });

        const element = document.querySelector(
          `[data-id="${sourceData.taskId}"]`,
        );
        if (element instanceof HTMLElement) {
          triggerPostMoveFlash(element);
        }
      },
    });
  }, [children]);

  return (
    <div id="wrapper">
    {childElements}
    </div>
  
  );
};

DraggableContainer.displayName = "DraggableContainer";

export default DraggableContainer;
