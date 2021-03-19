import * as React from "react";

export interface DraggableContainerProps {
  getOrder?: () => void;
  children?: React.ReactNode;
}

declare const DraggableContainer: React.FunctionComponent<DraggableContainerProps>;

export { DraggableContainer };
