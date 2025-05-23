import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";
import { Meta, StoryObj } from "@storybook/react";
import useDraggable, { UseDraggableHandle } from ".";
import Box from "../../components/box";
import {
  ActionPopover,
  ActionPopoverItem,
} from "../../components/action-popover";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof useDraggable> = {
  tags: ["hideInSidebar"],
  argTypes: {
    draggableItems: {
      type: { summary: "React.ReactNode[]" },
      description: "Array of React elements to be made draggable.",
      required: true,
    },
    containerId: {
      type: { summary: "string | number" },
      description: "Unique identifier for the container.",
      required: false,
    },
    containerNode: {
      type: { summary: "keyof JSX.IntrinsicElements | React.ElementType" },
      description: "HTML element or React component to use as the container.",
      required: false,
    },
    containerProps: {
      type: { summary: "Record<string, unknown>" },
      description: "Additional props passed to the container element.",
      required: false,
    },
    containerRole: {
      type: { summary: "string" },
      description: "Data attribute for container component role.",
      required: false,
    },
    dragType: {
      type: { summary: '"continuous" | "onDrop"' },
      description:
        'Drag behavior type: "continuous" for items to reorder as they are dragged, "onDrop" for items to reorder only when dropped.',
      required: false,
      defaultValue: "continuous",
    },
    getOrder: {
      type: { summary: "function" },
      description:
        "Callback fired when items are reordered. Receives an array of item IDs in their current order and the ID of the item that was moved.",
      required: false,
    },
    itemsNode: {
      type: { summary: "keyof JSX.IntrinsicElements | React.ElementType" },
      description:
        "HTML element or React component to use as the container for individual items.",
      required: false,
    },
    itemProps: {
      type: { summary: "Record<string, unknown>" },
      description: "Additional props passed to every item element.",
      required: false,
    },
    itemsRole: {
      type: { summary: "string" },
      description: "Data attribute for item component role.",
      required: false,
    },
    ref: {
      type: { summary: "Ref<UseDraggableHandle>" },
      description:
        "Ref to access the draggable handle methods for programmatic control.",
      required: false,
    },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof useDraggable>;

export const BasicImplementation: Story = () => {
  const items = ["item1", "item2", "item3", "item4", "item5", "item6"];

  const { draggableElement } = useDraggable({ draggableItems: items });

  return draggableElement;
};
BasicImplementation.storyName = "Basic Implementation";

export const DragType: Story = () => {
  const items = ["item1", "item2", "item3", "item4", "item5", "item6"];

  const { draggableElement } = useDraggable({
    draggableItems: items,
    dragType: "onDrop",
  });

  return draggableElement;
};
DragType.storyName = "Drag Type";

export const WithIds: Story = () => {
  const items = [
    <div id="1">item1</div>,
    <div id="2">item2</div>,
    <div id="3">item3</div>,
    <div id="4">item4</div>,
    <div id="5">item5</div>,
    <div id="6">item6</div>,
  ];

  const { draggableElement } = useDraggable({
    draggableItems: items,
    containerId: "foo",
  });

  return draggableElement;
};
WithIds.storyName = "With Ids";

export const GetOrderCallback: Story = () => {
  const items = [
    <div id="1">item1</div>,
    <div id="2">item2</div>,
    <div id="3">item3</div>,
    <div id="4">item4</div>,
    <div id="5">item5</div>,
    <div id="6">item6</div>,
  ];

  const { draggableElement } = useDraggable({
    draggableItems: items,
    /* eslint-disable no-console */
    getOrder: (draggableItemIds, movedItemId) =>
      console.log(draggableItemIds, movedItemId),
  });

  return draggableElement;
};
GetOrderCallback.storyName = "getOrder callback";

export const ManualReOrdering: Story = () => {
  const draggableHandle = useRef<UseDraggableHandle | null>(null);
  const [currentOrder, setCurrentOrder] = useState<number[]>([
    1, 2, 3, 4, 5, 6,
  ]);
  const previousOrderRef = useRef(currentOrder);

  useEffect(() => {
    previousOrderRef.current = currentOrder;
  }, [currentOrder]);

  const getIndex = (id: number) => previousOrderRef.current.indexOf(id);
  const moveItem = (id: number, targetIndex: number) =>
    draggableHandle.current?.reOrder(id, targetIndex);

  const MOVE_ACTIONS = [
    { label: "Move Top", getTargetIndex: () => 0 },
    { label: "Move Up", getTargetIndex: (id: number) => getIndex(id) - 1 },
    { label: "Move Down", getTargetIndex: (id: number) => getIndex(id) + 1 },
    {
      label: "Move Bottom",
      getTargetIndex: () => previousOrderRef.current.length - 1,
    },
  ];

  const actionPopover = (id: number) => (
    <ActionPopover m={0}>
      {MOVE_ACTIONS.map(({ label, getTargetIndex }) => (
        <ActionPopoverItem
          key={`${id}-${label}`}
          onClick={() => moveItem(id, getTargetIndex(id))}
        >
          {label}
        </ActionPopoverItem>
      ))}
    </ActionPopover>
  );

  const items = [1, 2, 3, 4, 5, 6].map((id) => (
    <Box
      display="flex"
      alignItems="baseline"
      justifyContent="space-between"
      padding="2px"
      margin="2px"
      width="80px"
      id={id.toString()}
      key={id}
    >
      item {id}
      {actionPopover(id)}
    </Box>
  ));

  const { draggableElement } = useDraggable({
    draggableItems: items,
    getOrder: (ids) => setCurrentOrder((ids || []).filter(Boolean).map(Number)),
    ref: draggableHandle,
  });

  return draggableElement;
};
ManualReOrdering.storyName = "Manual Re-Ordering";

export const ContainerAndItemsNode: Story = () => {
  const items = ["item1", "item2", "item3", "item4", "item5", "item6"];

  const { draggableElement } = useDraggable({
    draggableItems: items,
    itemsNode: "li",
    containerNode: "ul",
  });

  return draggableElement;
};
ContainerAndItemsNode.storyName = "Container and Items Node";

export const DragState: Story = () => {
  const items = [
    <div id="1">item1</div>,
    <div id="2">item2</div>,
    <div id="3">item3</div>,
    <div id="4">item4</div>,
    <div id="5">item5</div>,
    <div id="6">item6</div>,
  ];

  const cssRules = `
  /* Container styling */
  [data-parent-container-id="bar"] {
    display: flex;
    gap: 12px;
    padding: 16px;
    border-radius: 8px;
    transition: all 0.2s ease;
    background-color: #f9f9f9;
    border: 1px solid #eaeaea;
  }
  
  /* Base item styling */
  [data-parent-container-id="bar"] > div {
    padding: 12px 20px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: grab;
    font-weight: 500;
    user-select: none;
  }
  
  /* Container states */
  [data-parent-container-id="bar"][data-drag-state="is-dragging"] {
    background-color: #edf5ff;
    border-color: #d0e2ff;
  }
  
  [data-parent-container-id="bar"][data-drag-state="is-being-dragged-over"][data-closest-edge="top"] {
    background-color: #f2faf3;
    border-color: #c2e7c9;
    border-top: 4px solid #c2e7c9;
  }

  [data-parent-container-id="bar"][data-drag-state="is-being-dragged-over"][data-closest-edge="bottom"] {
    background-color: #f2faf3;
    border-color: #c2e7c9;
    border-bottom: 4px solid #c2e7c9;
  }

  
  /* Item states */
  [data-parent-container-id="bar"] > div[data-is-dragging="true"] {
    background-color: #f0f8ff;
    border-color: #1890ff;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
    transform: scale(1.02);
    z-index: 10;
  }
  
  /* Item hover effect */
  [data-parent-container-id="bar"] > div:hover:not([data-is-dragging="true"]) {
    transform: translateY(-2px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
    border-color: #d9d9d9;
  }`;

  // Use memo to prevent unnecessary re-renders
  const { draggableElement } = useDraggable({
    draggableItems: items,
    containerId: "bar",
  });

  return (
    <>
      <style>{cssRules}</style>
      <div>
        <p>Items change appearance based on their drag state:</p>
        {draggableElement}
      </div>
    </>
  );
};

DragState.storyName = "Drag State";

export const DraggedNode: Story = () => {
  const items = [
    <div id="1">item1</div>,
    <div id="2">item2</div>,
    <div id="3">item3</div>,
    <div id="4">item4</div>,
    <div id="5">item5</div>,
    <div id="6">item6</div>,
  ];

  const cssRules = `
  /* Container styling */
  [data-parent-container-id="baz"] {
    display: flex;
    gap: 12px;
    padding: 16px;
    border-radius: 8px;
    transition: all 0.2s ease;
    background-color: #f9f9f9;
    border: 1px solid #eaeaea;
  }
  
  /* Base item styling */
  [data-parent-container-id="baz"] > div {
    padding: 12px 20px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: grab;
    font-weight: 500;
    user-select: none;
  }
  
  /* Container and item states - combined selectors */
  [data-parent-container-id="baz"][data-drag-state="is-dragging"] {
    background-color: #edf5ff;
    border-color: #d0e2ff;
  }
  
  [data-parent-container-id="baz"][data-drag-state="is-being-dragged-over"] {
    background-color: #f2faf3;
    border-color: #c2e7c9;
  }
  
  /* Active dragged item */
  [data-parent-container-id="baz"] > div[data-is-dragging="true"] {
    background-color: #f0f8ff;
    border-color: rgb(0, 126, 69);
    box-shadow: 0 2px 8px rgba(0, 126, 69, 0.15);
    transform: scale(1.02);
    z-index: 10;
  }
  
  /* Info card */
  .item-info-card {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #f0f8ff;
    border-left: 4px solid rgb(0, 126, 69);
    border-radius: 6px;
    padding: 12px 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
    min-width: 200px;
  }`;

  const { draggableElement, draggedNode } = useDraggable({
    draggableItems: items,
    containerId: "baz",
  });

  type Position = {
    x: number;
    y: number;
  };

  const [dragInfo, setDragInfo] = useState<{
    id: string | null;
    content: string | null;
    position: Position | null;
  }>({
    id: null,
    content: null,
    position: null,
  });

  // Using useCallback to optimize the effect dependency
  const updateDragInfo = useCallback(() => {
    if (draggedNode) {
      const draggedId = draggedNode.getAttribute("data-item-id");
      const draggedNodeContent = draggedNode.textContent;
      const draggedRect = draggedNode.getBoundingClientRect();

      setDragInfo({
        id: draggedId,
        content: draggedNodeContent,
        position: {
          x: draggedRect.left + draggedRect.width / 2,
          y: draggedRect.top + draggedRect.height / 2,
        },
      });
    } else {
      setDragInfo({
        id: null,
        content: null,
        position: null,
      });
    }
  }, [draggedNode]);

  // Only re-run when draggedNode changes
  useEffect(() => {
    updateDragInfo();
  }, [updateDragInfo]);

  // Memoize the info card to prevent unnecessary re-renders
  const infoCard = useMemo(() => {
    if (!dragInfo.id) return null;

    return (
      <div className="item-info-card">
        <h3 style={{ margin: "0 0 8px 0", color: "rgb(0, 126, 69)" }}>
          Last Dragged Item
        </h3>
        <p style={{ margin: "4px 0" }}>
          <strong>ID:</strong> {dragInfo.id}
        </p>
        <p style={{ margin: "4px 0" }}>
          <strong>Content:</strong> {dragInfo.content}
        </p>
      </div>
    );
  }, [dragInfo.id, dragInfo.content]);

  return (
    <>
      <style>{cssRules}</style>
      <div>
        {draggableElement}
        {infoCard}
      </div>
    </>
  );
};

DraggedNode.storyName = "Dragged Node";
