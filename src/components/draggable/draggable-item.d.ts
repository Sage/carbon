import * as React from "react";

export interface DraggableItemProps {
  id: number | string;
  children: React.ReactNode;
}

declare function DraggableItem(props: DraggableItemProps): JSX.Element;

export default DraggableItem;
