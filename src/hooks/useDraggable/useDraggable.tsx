import React, {
  Ref,
  useState,
  useContext,
  CSSProperties,
} from "react";
import guid from "../../__internal__/utils/helpers/guid";
import DraggableProvider from "./draggable-provider";
import DraggableContainer from "../../__internal__/draggable/draggable-container";
import DraggableProviderContext from "./draggable-provider-context";
import UseDraggableContext from "./useDraggable-context";
import DraggableItem from "../../__internal__/draggable/draggable-item";
import { Edge } from "../../__internal__/draggable/draggable-utils";

export type DragState =
  | { type: "idle"; id?: string | number }
  | { type: "preview"; container: HTMLElement; id?: string | number }
  | { type: "is-dragging"; id: string | number }
  | { type: "is-dragging-over"; closestEdge: Edge | null; id: string | number };

export interface UseDraggableHandle {
  reOrder: (itemId: number | string, toIndex: number) => void;
}

interface UseDraggableOptions {
  draggableItems: React.ReactNode[] | React.ReactNode;
  ref?: Ref<UseDraggableHandle>;
  containerId?: string | number;
  containerStyle?: CSSProperties;
  itemsStyle?: CSSProperties;
  draggableItemStylingOptOut?: boolean;
  containerNode?: string;
  itemsNode?: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void;
}

const useDraggable = ({
  draggableItems,
  ref,
  containerId,
  containerStyle,
  itemsStyle,
  draggableItemStylingOptOut,
  containerNode,
  itemsNode,
  getOrder,
}: UseDraggableOptions) => {
  const items = Array.isArray(draggableItems)
    ? draggableItems
    : [draggableItems];

  const containerDragState = useContext(
    DraggableProviderContext,
  )?.containerDragState;

  const [dragState, setDragState] = useState<DragState>({
    type: "idle",
    id: 0,
  });

  const draggableElement = (
    <UseDraggableContext.Provider value={{ setDragState }}>
      <DraggableContainer
        id={containerId}
        ref={ref}
        getOrder={getOrder}
        containerStyle={containerStyle}
        containerNode={containerNode}
      >
        {items.map((item) => (
          <DraggableItem
            key={guid()}
            id={`${guid()}`}
            itemsStyle={itemsStyle}
            draggableItemStylingOptOut={draggableItemStylingOptOut}
            itemsNode={itemsNode}
          >
            {item}
          </DraggableItem>
        ))}
      </DraggableContainer>
    </UseDraggableContext.Provider>
  );

  return { draggableElement, dragState, containerDragState };
};

export default useDraggable;
export { DraggableProvider }