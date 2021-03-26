import * as React from "react";

export interface DraggableContainerProps {
  getOrder?: () => void;
  children?: React.ReactNode;
}

declare function DraggableContainer(props: DraggableContainerProps): JSX.Element;

export { DraggableContainer };
