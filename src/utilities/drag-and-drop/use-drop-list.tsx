import { useEffect, useRef } from "react";
import invariant from "invariant";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { getList, isItem } from "./__internal__/data";
import { useDraggableContext } from "./draggable-provider";

interface UseDropListProps {
  /** Unique identifier for the list. */
  id: string;
  /** Optional types of item that can be dropped onto the list. */
  accepts?: string[];
}

interface UseDropListReturn {
  /** Ref callback to set the list element. */
  ref: (element: HTMLElement | null) => void;
}

function useDropList({ id, accepts }: UseDropListProps): UseDropListReturn {
  const instanceId = useDraggableContext();
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    invariant(element !== null, "Expected list element to exist.");

    return dropTargetForElements({
      element,
      getData: () => getList({ id, instanceId, accepts }),
      canDrop: ({ source }) => {
        if (!isItem(source.data) || source.data.instanceId !== instanceId) {
          return false;
        }

        if (
          accepts &&
          (!source.data.type || !accepts.includes(source.data.type))
        ) {
          return false;
        }

        return true;
      },
    });
  }, [accepts, id, instanceId]);

  return {
    ref: (element) => {
      ref.current = element;
    },
  };
}

export default useDropList;
