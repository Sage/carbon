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

export interface DraggableItemProps {
  id: string;
  children?: React.ReactNode;
}

export interface DraggableContainerProps
  extends MarginProps,
    Omit<TagProps, "data-component"> {
  children?: React.ReactNode;
}

const DraggableContainer = ({
  "data-element": dataElement,
  "data-role": dataRole = "draggable-container",
  children,
  ...rest
}: DraggableContainerProps): JSX.Element => {
  const [draggableItems, setDraggableItems] = useState<
    React.ReactElement<DraggableItemProps>[]
  >(
    React.Children.toArray(children).map((child, index) =>
      React.isValidElement<DraggableItemProps>(child)
        ? React.cloneElement(child, { id: index.toString() })
        : (child as React.ReactElement<DraggableItemProps>),
    ),
  );

  const hasProperChildren = useMemo(
    () =>
      React.Children.toArray(children).every(
        (child) =>
          React.isValidElement(child) &&
          (child.type as React.FunctionComponent).displayName ===
            DraggableItem.displayName,
      ),
    [children],
  );

  invariant(
    hasProperChildren,
    `\`${DraggableContainer.displayName}\` only accepts children of type \`${DraggableItem.displayName}\`.`,
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setDraggableItems(
        React.Children.toArray(children).map((child, index) =>
          React.isValidElement<DraggableItemProps>(child)
            ? React.cloneElement(child, { id: index.toString() })
            : (child as React.ReactElement<DraggableItemProps>),
        ),
      );
    } else {
      isFirstRender.current = false;
    }
  }, [children]);

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
            list: draggableItems,
            startIndex: indexOfSource,
            indexOfTarget,
            closestEdgeOfTarget,
            axis: "vertical",
          }).map((item, index) =>
            React.isValidElement<DraggableItemProps>(item)
              ? React.cloneElement(item, { id: index.toString() })
              : item,
          );

          setDraggableItems(newOrder);
        });

        const element = document.querySelector(
          `[data-id="${sourceData.taskId}"]`,
        );
        if (element instanceof HTMLElement) {
          triggerPostMoveFlash(element);
        }
      },
    });
  }, [draggableItems]);

  const marginProps = filterStyledSystemMarginProps(rest);

  return (
    <div {...marginProps}>
      {draggableItems.map((item, index) =>
        React.cloneElement(item, { id: `${index}` }, [item.props.children]),
      )}
    </div>
  );
};

DraggableContainer.displayName = "DraggableContainer";

export default DraggableContainer;
