import { useEffect, useRef } from "react";
import invariant from "invariant";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { getItem, isItem } from "./__internal__/data";
import { useDraggableContext } from "./draggable-provider";

export interface UseDragItemProps {
  /** Unique identifier for the item. */
  id: string;
  /** Index of the item within its list. */
  index: number;
  /** Identifier of list that the item is in. */
  list: string;
}

export interface UseDragItemReturn {
  /** Ref callback to set the item element. */
  ref: (element: HTMLElement | null) => void;
}

function useDragItem({ id, index, list }: UseDragItemProps): UseDragItemReturn {
  const { instanceId } = useDraggableContext();
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    invariant(element !== null, "Expected item element to exist.");

    return combine(
      draggable({
        element,
        getInitialData: () => getItem({ id, instanceId, index, list }),
      }),
      dropTargetForElements({
        element,
        getData: () => getItem({ id, instanceId, index, list }),
        canDrop: ({ source }) =>
          isItem(source.data) && source.data.instanceId === instanceId,
      }),
    );
  }, [id, index, list, instanceId]);

  return {
    ref: (element) => {
      ref.current = element;
    },
  };
}

export default useDragItem;
