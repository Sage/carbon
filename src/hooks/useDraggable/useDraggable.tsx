import React, {
  Ref,
  useState,
  createContext,
  useContext,
  CSSProperties,
} from "react";
import guid from "../../__internal__/utils/helpers/guid";
import DraggableContainer from "./__internal__/draggable-container";
import DraggableProviderContext from "./draggable-provider-context";
import { ContainerDragState } from "./draggable-provider";
import DraggableItem from "./__internal__/draggable-item";
import { Edge } from "./__internal__/draggable-utils";

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
  containerStyle?: CSSProperties;
  itemsStyle?: CSSProperties;
  indicatorColor?: string;
  draggableItemStylingOptOut?: boolean;
  containerNode?: string;
  itemsNode?: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
}

interface UseDraggableProviderContextType {
  setIdOrder: React.Dispatch<
    React.SetStateAction<{ draggableItemIds: string[]; movedItemId: string }>
  >;
}

export const UseDraggableContext =
  createContext<UseDraggableProviderContextType>({
    setIdOrder: () => {},
  });

const useDraggable = ({
  draggableItems,
  ref,
  containerStyle,
  itemsStyle,
  indicatorColor,
  draggableItemStylingOptOut,
  containerNode,
  itemsNode,
}: UseDraggableOptions): [
  JSX.Element,
  ContainerDragState | undefined,
  { draggableItemIds: string[]; movedItemId: string },
] => {
  const items = Array.isArray(draggableItems)
    ? draggableItems
    : [draggableItems];

  const containerDragState = useContext(
    DraggableProviderContext,
  )?.containerDragState;

  const [idOrder, setIdOrder] = useState<{
    draggableItemIds: string[];
    movedItemId: string;
  }>({
    draggableItemIds: [],
    movedItemId: "",
  });

  const draggableElement = (
    <UseDraggableContext.Provider value={{ setIdOrder }}>
      <DraggableContainer
        ref={ref}
        containerStyle={containerStyle}
        containerNode={containerNode}
      >
        {items.map((item, index) => (
          <DraggableItem
            key={guid()}
            id={`${index}-${guid()}`}
            itemsStyle={itemsStyle}
            indicatorColor={indicatorColor}
            draggableItemStylingOptOut={draggableItemStylingOptOut}
            itemsNode={itemsNode}
          >
            {item}
          </DraggableItem>
        ))}
      </DraggableContainer>
    </UseDraggableContext.Provider>
  );

  return [draggableElement, containerDragState, idOrder];
};

export default useDraggable;
