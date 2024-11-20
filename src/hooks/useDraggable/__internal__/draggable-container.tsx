import React, { useEffect, useState } from "react";

import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash";
import { isDraggableItemData } from "./draggable-utils";

export interface DraggableItemProps {
  id?: string;
  children?: React.ReactNode;
}

export interface DraggableContainerProps {
  children?: React.ReactNode;
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void,
}

const DraggableContainer = ({
  children,
  getOrder,
}: DraggableContainerProps): JSX.Element => {

  const [childElements, setChildElements] = useState<React.ReactNode[]>(React.Children.toArray(children));

  useEffect(() => {
    const dataIds = Array.from(document.querySelectorAll('[data-id]')).map(element => Number(element.getAttribute('data-id')));
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

        if(getOrder){
          getOrder(dataIds, indexOfSource);
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

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

        const element = document.querySelector(
          `[id="${sourceData.taskId}"]`,
        );
        if (element instanceof HTMLElement) {
          triggerPostMoveFlash(element);
        }
      },
    });
  }, [childElements]);

  return (
    <>
    {childElements}
    </>
  
  );
};

DraggableContainer.displayName = "DraggableContainer";

export default DraggableContainer;
