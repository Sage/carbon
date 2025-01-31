import React, { Ref, useState, useContext, CSSProperties } from "react";
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

// draggableItemsStylingOptOut is a prop that allows the user to opt out of the default styling - which is 0.5 opacity when og item is being dragged,
// 0 opacity when being dragged over
// both are cancelled out when moving between containers
interface UseDraggableOptions {
  draggableItems: React.ReactNode[] | React.ReactNode;
  id?: string | number;
  ref?: Ref<UseDraggableHandle>;
  containerStyle?: CSSProperties;
  itemsStyle?: CSSProperties;
  draggableItemStylingOptOut?: boolean;
  containerNode?: string;
  itemsNode?: string;
}

const useDraggable = ({
  draggableItems,
  id,
  ref,
  containerStyle,
  itemsStyle,
  draggableItemStylingOptOut,
  containerNode,
  itemsNode,
}: UseDraggableOptions): [
  JSX.Element,
  ContainerDragState | undefined,
] => {
  const items = Array.isArray(draggableItems)
    ? draggableItems
    : [draggableItems];


  const containerDragState = useContext(
    DraggableProviderContext,
  )?.containerDragState;

  const draggableElement = (
    <DraggableContainer
      ref={ref}
      id={id}
      containerStyle={containerStyle}
      containerNode={containerNode}
    >
      {items.map((item, index) => (
        <DraggableItem
          key={index}
          itemsStyle={itemsStyle}
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
