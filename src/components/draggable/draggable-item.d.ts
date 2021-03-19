import * as React from "react";

export interface DraggableItemProps {
  id: number | string;
  children: React.ReactNode;
}

declare const DraggableItem: React.FunctionComponent<DraggableItemProps>;
