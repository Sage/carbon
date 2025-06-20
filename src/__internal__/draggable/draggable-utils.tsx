type Edge = "top" | "right" | "bottom" | "left";
type DragState =
  | { type: "idle"; id?: string | number }
  | { type: "preview"; container: HTMLElement; id?: string | number }
  | { type: "is-dragging"; id: string | number }
  | {
      type: "is-being-dragged-over";
      closestEdge: Edge | null;
      id: string | number;
    };
interface DraggableItemData {
  id: string | number;
  index: number | string | void;
  content: React.ReactNode;
  parentContainerId: string | number;
}

const draggableItemDataKey = "isDraggableItemData";

function getDraggableItemData(
  item: DraggableItemData,
): Record<string, unknown> {
  return {
    [draggableItemDataKey]: true,
    itemId: item.id,
    itemIndex: item.index,
    content: item.content,
    parentContainerId: item.parentContainerId,
  };
}

function isDraggableItemData(data: unknown): data is DraggableItemData {
  return (
    data !== null &&
    typeof data === "object" &&
    draggableItemDataKey in data &&
    (data as Record<string, unknown>)[draggableItemDataKey] === true
  );
}

export { getDraggableItemData, isDraggableItemData };
export type { DraggableItemData, DragState, Edge };
