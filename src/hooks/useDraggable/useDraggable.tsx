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
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void;
  containerStyle?: CSSProperties;
  itemsStyle?: CSSProperties;
  indicatorColor?: string;
  draggableItemStylingOptOut?: boolean;
  containerNode?: string;
  itemsNode?: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
}

const useDraggable = ({
  draggableItems,
  ref,
  getOrder,
  containerStyle,
  itemsStyle,
  indicatorColor,
  draggableItemStylingOptOut,
  containerNode,
  itemsNode,
}: UseDraggableOptions): [JSX.Element, ContainerDragState | undefined] => {
  const items = Array.isArray(draggableItems)
    ? draggableItems
    : [draggableItems];

  const containerDragState = useContext(
    DraggableProviderContext,
  )?.containerDragState;

  const draggableElement = (
    <DraggableContainer
      ref={ref}
      getOrder={getOrder}
      containerStyle={containerStyle}
      containerNode={containerNode}
    >
      {items.map((item, index) => (
        <DraggableItem
          key={guid()}
          id={`${guid()}`}
          itemsStyle={itemsStyle}
          indicatorColor={indicatorColor}
          draggableItemStylingOptOut={draggableItemStylingOptOut}
          itemsNode={itemsNode}
        >
          {item}
        </DraggableItem>
      ))}
    </DraggableContainer>
  );

  return [draggableElement, containerDragState];
};

export default useDraggable;
