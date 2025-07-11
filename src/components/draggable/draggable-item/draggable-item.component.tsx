import React from "react";
import { PaddingProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { StyledDraggableItem } from "./draggable-item.style";
import Icon from "../../icon";

export interface DraggableItemProps extends PaddingProps, TagProps {
  /**
   * The id of the `DraggableItem`.
   *
   * Use this prop to make `Draggable` work
   */
  id: string;
  /** The content of the component. */
  children: React.ReactNode;
}

const DraggableItem = ({
  id,
  children,
  py = 1,
  "data-element": dataElement,
  "data-role": dataRole = "draggable-item",
  ...rest
}: DraggableItemProps): JSX.Element => {
  const paddingProps = filterStyledSystemPaddingProps(rest);

  return (
    <StyledDraggableItem
      py={py}
      {...paddingProps}
      id={id}
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
