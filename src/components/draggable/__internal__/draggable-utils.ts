interface DraggableItemData {
  id: number | string;
  content: React.ReactNode;
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
