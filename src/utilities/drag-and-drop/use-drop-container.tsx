import { useEffect, useRef } from "react";
import invariant from "invariant";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { getContainer, isItem } from "./__internal__/data";
import { useDraggableContext } from "./draggable-provider";

export interface UseDropContainerProps {
  /** Unique identifier for the list. */
  id: string;
}

export interface UseDropContainerReturn {
  /** Ref callback to set the list element. */
  ref: (element: HTMLElement | null) => void;
}

function useDropContainer({
  id,
}: UseDropContainerProps): UseDropContainerReturn {
  const { instanceId } = useDraggableContext();
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    invariant(element !== null, "Expected list element to exist.");

    return dropTargetForElements({
      element,
      getData: () => getContainer({ id, instanceId }),
      canDrop: ({ source }) =>
        isItem(source.data) && source.data.instanceId === instanceId,
    });
  }, [id, instanceId]);

  return {
    ref: (element) => {
      ref.current = element;
    },
  };
}

export default useDropContainer;
