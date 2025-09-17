import React, { useRef } from "react";
import { PaddingProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { StyledDraggableItem } from "./draggable-item.style";
import Icon from "../../icon";
import { useSortableItem } from "../../../__internal__/sortable";

export interface DraggableItemProps extends PaddingProps, TagProps {
  /**
   * The id of the `DraggableItem`.
   *
   * Use this prop to make `Draggable` work
   */
  id: number | string;
  /** The content of the component. */
  children: React.ReactNode;
  /** @private @ignore */
  index?: number;
  /**
   * @private
   * @ignore
   */
  flexDirection?: "row" | "row-reverse";
}

const DraggableItem = ({
  id: idProp,
  index: indexProp,
  children,
  py = 1,
  flexDirection,
  "data-element": dataElement,
  "data-role": dataRole = "draggable-item",
  ...rest
}: DraggableItemProps): JSX.Element => {
  const id = String(idProp);
  const index = indexProp as number;

  const ref = useRef<HTMLDivElement>(null);
  const paddingProps = filterStyledSystemPaddingProps(rest);

  const { isDragging } = useSortableItem({ id, index, ref });

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
