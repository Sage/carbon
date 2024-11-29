import React from "react";
import { margin, MarginProps } from "styled-system";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import useDraggable from "../../hooks/useDraggable/useDraggable";

export interface DraggableItemProps {
  id: string;
  children?: React.ReactNode;
}

export interface DraggableContainerProps
  extends MarginProps,
    Omit<TagProps, "data-component"> {
  children?: React.ReactNode;
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void;
}

export type DraggableContextType = {
  dragState?: any;
};

export const DraggableContainerContext = React.createContext<DraggableContextType>({});


const DraggableContainer = ({
  "data-element": dataElement,
  "data-role": dataRole = "draggable-container",
  children,
  getOrder,
  ...rest
}: DraggableContainerProps): JSX.Element => {

  const marginProps = filterStyledSystemMarginProps(rest);

  const [UseDraggableContainer, dragState ] = useDraggable(children, getOrder);

  return <div
  data-element={dataElement}
  data-role={dataRole}
  {...marginProps}
>
<DraggableContainerContext.Provider value={{ dragState }}>{UseDraggableContainer}</DraggableContainerContext.Provider>
</div>;
};

DraggableContainer.displayName = "DraggableContainer";

export default DraggableContainer;
