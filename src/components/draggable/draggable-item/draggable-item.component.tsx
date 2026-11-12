/* istanbul ignore file: Test with Playwright for better reliability */

import React, { useCallback, useMemo, useRef, useState } from "react";
import { PaddingProps } from "styled-system";

import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { StyledDraggableItem, StyledItemContent } from "./draggable-item.style";
import DragHandle from "../drag-handle";
import DraggableItemContext from "../__internal__/draggable-item.context";
import useDraggableItem from "../__internal__/use-draggable-item";

export interface DraggableItemProps
  extends PaddingProps,
    TagProps,
    Omit<React.HTMLAttributes<HTMLElement>, "id"> {
  /** Unique identifier of the draggable item within its container. */
  id: number | string;
  /** The content of the component. */
  children: React.ReactNode;
  /** @private @ignore */
  itemCount?: number;
  /** @private @ignore */
  onMove?: (id: string, index: number) => void;
  /** @private @ignore */
  index?: number;
  /** @private @ignore */
  flexDirection?: "row" | "row-reverse";
}

const DraggableItem = ({
  id: idProp,
  index = 0,
  children,
  itemCount = 0,
  onMove,
  py = 1,
  flexDirection,
  "data-element": dataElement,
  "data-role": dataRole = "draggable-item",
  ...rest
}: DraggableItemProps): JSX.Element => {
  const id = String(idProp);
  const ref = useRef<HTMLDivElement>(null);
  const [customDragHandle, setCustomDragHandle] = useState<HTMLElement | null>(
    null,
  );
  const [surface, setSurface] = useState<HTMLElement | null>(null);
  const [fallbackDragHandle, setFallbackDragHandle] =
    useState<HTMLSpanElement | null>(null);
  const moveTo = useCallback(
    (position: number) => onMove?.(id, position),
    [id, onMove],
  );
  const contextValue = useMemo(
    () => ({
      isDraggable: true,
      registerDragHandle: setCustomDragHandle,
      registerSurface: setSurface,
      index,
      itemCount,
      moveTo,
    }),
    [index, itemCount, moveTo],
  );
  const { isDragging, dragGhost, dropIndicator } = useDraggableItem({
    id,
    index,
    ref,
    dragHandle: customDragHandle ?? fallbackDragHandle,
    surface,
  });
  const paddingProps = filterStyledSystemPaddingProps(rest);
  const elementProps = Object.fromEntries(
    Object.entries(rest).filter(([key]) => !(key in paddingProps)),
  );

  return (
    <StyledDraggableItem
      {...elementProps}
      ref={ref}
      $dragGhost={dragGhost}
      $dropIndicator={dropIndicator}
      data-is-dragging={isDragging}
      data-drop-indicator-position={dropIndicator?.position}
      {...tagComponent("draggable-item", {
        "data-element": dataElement,
        "data-role": dataRole,
      })}
    >
      <DraggableItemContext.Provider value={contextValue}>
        <StyledItemContent
          py={customDragHandle ? 0 : py}
          $hasCustomDragHandle={Boolean(customDragHandle)}
          data-role="draggable-item-content"
          $flexDirection={flexDirection}
          {...paddingProps}
        >
          {children}
          {!customDragHandle && (
            <DraggableItemContext.Provider value={null}>
              <DragHandle
                ref={setFallbackDragHandle}
                data-role="draggable-item-drag-handle"
              />
            </DraggableItemContext.Provider>
          )}
        </StyledItemContent>
      </DraggableItemContext.Provider>
    </StyledDraggableItem>
  );
};

DraggableItem.displayName = "DraggableItem";

export default DraggableItem;
