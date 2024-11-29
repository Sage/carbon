type Edge = "top" | "right" | "bottom" | "left";

 type DragState =
  | { type: "idle"; id?: string | number }
  | { type: "preview"; container: HTMLElement; id?: string | number }
  | { type: "is-dragging"; id: string | number }
  | { type: "is-dragging-over"; closestEdge: Edge | null; id: string | number };

interface DraggableItemData {
    id: number | string | void;
    content: React.ReactNode
  }
  
  const draggableItemDataKey = "isDraggableItemData";
  
  function getDraggableItemData(
    item: DraggableItemData,
  ): Record<string, unknown> {
    return {
      [draggableItemDataKey]: true,
      itemId: item.id,
      content: item.content,
    };
  }
  
  function isDraggableItemData(data: any): data is DraggableItemData {
    return (
      data && typeof data === "object" && data[draggableItemDataKey] === true
    );
  }
  
  export { getDraggableItemData, isDraggableItemData };
  export type { DraggableItemData, DragState };