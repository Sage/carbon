import React, { useEffect, useRef, useState } from "react";
import { PaddingProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { StyledDraggableItem } from "./draggable-item.style";
import Icon from "../../icon";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "invariant";
import {
  getDragData,
  getDropTargetData,
  isDragData,
} from "../__internal__/data";

export interface DraggableItemProps extends PaddingProps, TagProps {
  /**
   * The id of the `DraggableItem`.
   *
   * Use this prop to make `Draggable` work
   */
  id: number | string;
  /** The content of the component. */
  children: React.ReactNode;
  /**
   * @private
   * @ignore
   */
  flexDirection?: "row" | "row-reverse";
}

const DraggableItem = ({
  id: idProp,
  children,
  py = 1,
  flexDirection,
  "data-element": dataElement,
  "data-role": dataRole = "draggable-item",
  ...rest
}: DraggableItemProps): JSX.Element => {
  const id = String(idProp);

  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = ref.current;
    invariant(element, "Expected DraggableItem element to exist.");

    return combine(
      draggable({
        element,
        getInitialData: () => getDragData({ id }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element,
        getIsSticky: () => true,
        getData: () => getDropTargetData({ id }),
        canDrop: ({ source }) => isDragData(source.data),
      }),
    );
  }, [id]);

  const paddingProps = filterStyledSystemPaddingProps(rest);

  return (
    <StyledDraggableItem
      isDragging={isDragging}
      ref={ref}
      py={py}
      flexDirection={flexDirection}
      {...paddingProps}
      {...tagComponent("draggable-item", {
        "data-element": dataElement,
        "data-role": dataRole,
      })}
    >
      {children}
      <Icon type="drag" />
    </StyledDraggableItem>
  );
};

DraggableItem.displayName = "DraggableItem";

export default DraggableItem;
