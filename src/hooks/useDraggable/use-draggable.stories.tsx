import React, { useRef, useEffect, useMemo, useCallback, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import useDraggable, { UseDraggableHandle, DraggableProvider, DraggableProviderHandle } from ".";
import Box from "../../components/box";
import { ActionPopover, ActionPopoverItem } from "../../components/action-popover";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof useDraggable> = {
  tags: ["hideInSidebar"],
  argTypes: {
    draggableItems: {
      type: { summary: "React.ReactNode[] | React.ReactNode" },
      description: "The items to be made draggable. Can be an array of ReactNodes or a single ReactNode.",
      required: true,
    },
    ref: {
      type: { summary: "Ref<UseDraggableHandle>" },
      description: "Reference to access the draggable handle for programmatic control.",
      required: false,
    },
    containerId: {
      type: { summary: "string | number" },
      description: "Optional ID for the container element.",
      required: false,
    },
    draggableItemStylingOptOut: {
      type: { summary: "boolean" },
      description: "When true, disables the default styling for draggable items.",
      required: false,
    },
    containerNode: {
      type: { summary: "keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>" },
      description: "Node to use as the container element.",
      required: false,
    },
    itemsNode: {
      type: { summary: "keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>" },
      description: "Node to use for the draggable items.",
      required: false,
    },
    getOrder: {
      type: { summary: "function" },
      description: "Callback function triggered when item order changes. Receives the current order of draggable item IDs and the ID of the moved item.",
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

  const { draggableElement } = useDraggable({ draggableItems: items, dragType: "onDrop" });

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

  const { draggableElement } = useDraggable({ draggableItems: items, containerId: "foo" });

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
    getOrder: (draggableItemIds, movedItemId) => console.log(draggableItemIds, movedItemId),
  });

  return draggableElement;
};
GetOrderCallback.storyName = "getOrder callback";

export const ManualReOrdering: Story = () => {
  const draggableHandle = useRef<UseDraggableHandle | null>(null);
  const [currentOrder, setCurrentOrder] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const previousOrderRef = useRef(currentOrder);

  useEffect(() => {
    previousOrderRef.current = currentOrder;
    console.log("Current Order:", currentOrder);
    console.log("Previous Order:", previousOrderRef.current);
  }, [currentOrder]);

  const getIndex = (id: number) => previousOrderRef.current.indexOf(id);
  const moveItem = (id: number, targetIndex: number) => draggableHandle.current?.reOrder(id, targetIndex);

  const MOVE_ACTIONS = [
    { label: "Move Top", getTargetIndex: () => 0 },
    { label: "Move Up", getTargetIndex: (id: number) => getIndex(id) - 1 },
    { label: "Move Down", getTargetIndex: (id: number) => getIndex(id) + 1 },
    { label: "Move Bottom", getTargetIndex: () => previousOrderRef.current.length - 1 },
  ];

  const actionPopover = (id: number) => (
    <ActionPopover m={0}>
      {MOVE_ACTIONS.map(({ label, getTargetIndex }) => (
        <ActionPopoverItem key={`${id}-${label}`} onClick={() => moveItem(id, getTargetIndex(id))}>
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

  const { draggableElement } = useDraggable({ draggableItems: items, itemsNode: "li", containerNode: "ul" });

  return draggableElement;
};
ContainerAndItemsNode.storyName = "Container and Items Node";

export const DefaultStylingOptOut: Story = () => {
  const items = [
    <div id="1">item1</div>,
    <div id="2">item2</div>,
    <div id="3">item3</div>,
    <div id="4">item4</div>,
    <div id="5">item5</div>,
    <div id="6">item6</div>,
  ];

  const { draggableElement } = useDraggable({ draggableItems: items, draggableItemStylingOptOut: true });

  return draggableElement;
};
DefaultStylingOptOut.storyName = "Default Styling Opt Out";

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
  
  [data-parent-container-id="bar"][data-drag-state="is-dragging-over"] {
    background-color: #f2faf3;
    border-color: #c2e7c9;
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
    draggableItemStylingOptOut: true,
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
  
  [data-parent-container-id="baz"][data-drag-state="is-dragging-over"] {
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
    draggableItemStylingOptOut: true,
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

export const DraggableProviderStory: Story = () => {
  const group1 = [
    <div>Ed</div>,
    <div>Andrew</div>,
    <div>Igor</div>,
    <div>Kuba</div>,
    <div>Alexander</div>,
    <div>Maciek</div>
  ];

  const group2 = [
    <div>Sam</div>,
    <div>Dan</div>,
    <div>James</div>,
    <div>Ian</div>,
    <div>Robin</div>
  ];

  const group3 = [
    <div>Nuria</div>,
    <div>Chris</div>,
    <div>Iga</div>,
    <div>Damian</div>
  ];

  const group4 = [
    <div>Katarzyna</div>,
    <div>Tom</div>,
    <div>Ian</div>,
    <div>Michael</div>,
    <div>Stephen</div>,
    <div>John</div>,
    <div>Harpal</div>
  ];

  const cssRules = `
  /* Board layout */
  #kanban-board {
    display: flex;
    gap: 16px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    min-height: 600px;
  }
  
  /* Make sure useDraggableContainer takes full size */
  #kanban-board [data-element="use-draggable-container"] {
    height: 550px;
    overflow-y: auto;
    width: 100%;
  }

  /* Column styling */
  #kanban-board .column {
    display: flex;
    flex-direction: column;
    width: 280px;
    min-height: 560px;
    background-color: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
  }
  
  /* Column header */
  #kanban-board .column-header {
    font-weight: 600;
    padding: 12px 16px;
    border-bottom: 1px solid #eaeaea;
    background-color: #f0f0f0;
    margin: 0;
  }
  
  /* Container styling */
  #kanban-board [data-parent-container-id] {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    flex: 1;
    overflow-y: auto;
    max-height: 520px;
    min-height: 40px;
  }

  /* Column color indicators */
  #kanban-board .column-contributors-1 {
    border-top: 3px solid #1890ff;
  }

  #kanban-board .column-contributors-2 {
    border-top: 3px solid #722ed1;
  }

  #kanban-board .column-contributors-3 {
    border-top: 3px solid #fa8c16;
  }

  #kanban-board .column-contributors-4 {
    border-top: 3px solid #52c41a;
  }

  /* Container states */
  #kanban-board [data-parent-container-id][data-drag-state="is-dragging"] {
    background-color: #edf5ff;
  }

  #kanban-board [data-parent-container-id][data-drag-state="is-dragging-over"] {
    background-color: #f2faf3;
  }

  /* Card styling - items within containers */
  #kanban-board [data-parent-container-id] > div {
    padding: 10px 12px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    cursor: grab;
    font-weight: 500;
    user-select: none;
    font-size: 14px;
  }

  /* Card states */
  #kanban-board [data-parent-container-id] > div[data-is-dragging="true"] {
    background-color: #f0f8ff;
    border-color: #1890ff;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
    transform: scale(1.02);
    z-index: 10;
  }

  /* Card hover effect */
  #kanban-board [data-parent-container-id] > div:hover:not([data-is-dragging="true"]) {
    background-color: #fafafa;
    border-color: #d9d9d9;
  }`;

  const { draggableElement: group1Container } = useDraggable({
    draggableItems: group1,
    containerId: "group1",
    draggableItemStylingOptOut: true,
  });

  const { draggableElement: group2Container } = useDraggable({
    draggableItems: group2,
    containerId: "group2",
    draggableItemStylingOptOut: true,
  });

  const { draggableElement: group3Container } = useDraggable({
    draggableItems: group3,
    containerId: "group3",
    draggableItemStylingOptOut: true,
  });

  const { draggableElement: group4Container } = useDraggable({
    draggableItems: group4,
    containerId: "group4",
    draggableItemStylingOptOut: true,
  });

  return (
    <DraggableProvider>
      <style>{cssRules}</style>
      <div id="kanban-board" className="kanban-board">
        <div className="column column-contributors-1">
          <div className="column-header">Carbon Contributors 1</div>
          {group1Container}
        </div>
        <div className="column column-contributors-2">
          <div className="column-header">Carbon Contributors 2</div>
          {group2Container}
        </div>
        <div className="column column-contributors-3">
          <div className="column-header">Carbon Contributors 3</div>
          {group3Container}
        </div>
        <div className="column column-contributors-4">
          <div className="column-header">Carbon Contributors 4</div>
          {group4Container}
        </div>
      </div>
    </DraggableProvider>
  );
};

DraggableProviderStory.storyName = "Draggable Provider";

export const DraggableProviderDragType: Story = () => {
  const group1 = [
    <div>Ed</div>,
    <div>Andrew</div>,
    <div>Igor</div>,
    <div>Kuba</div>,
    <div>Alexander</div>,
    <div>Maciek</div>
  ];

  const group2 = [
    <div>Sam</div>,
    <div>Dan</div>,
    <div>James</div>,
    <div>Ian</div>,
    <div>Robin</div>
  ];

  const group3 = [
    <div>Nuria</div>,
    <div>Chris</div>,
    <div>Iga</div>,
    <div>Damian</div>
  ];

  const group4 = [
    <div>Katarzyna</div>,
    <div>Tom</div>,
    <div>Ian</div>,
    <div>Michael</div>,
    <div>Stephen</div>,
    <div>John</div>,
    <div>Harpal</div>
  ];

  const cssRules = `
  /* Board layout */
  #kanban-board {
    display: flex;
    gap: 16px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    min-height: 600px;
  }
  
  /* Make sure useDraggableContainer takes full size */
  #kanban-board [data-element="use-draggable-container"] {
    height: 550px;
    overflow-y: auto;
    width: 100%;
  }

  /* Column styling */
  #kanban-board .column {
    display: flex;
    flex-direction: column;
    width: 280px;
    min-height: 560px;
    background-color: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
  }
  
  /* Column header */
  #kanban-board .column-header {
    font-weight: 600;
    padding: 12px 16px;
    border-bottom: 1px solid #eaeaea;
    background-color: #f0f0f0;
    margin: 0;
  }
  
  /* Container styling */
  #kanban-board [data-parent-container-id] {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    flex: 1;
    overflow-y: auto;
    max-height: 520px;
    min-height: 40px;
  }

  /* Column color indicators */
  #kanban-board .column-contributors-1 {
    border-top: 3px solid #1890ff;
  }

  #kanban-board .column-contributors-2 {
    border-top: 3px solid #722ed1;
  }

  #kanban-board .column-contributors-3 {
    border-top: 3px solid #fa8c16;
  }

  #kanban-board .column-contributors-4 {
    border-top: 3px solid #52c41a;
  }

  /* Container states */
  #kanban-board [data-parent-container-id][data-drag-state="is-dragging"] {
    background-color: #edf5ff;
  }

  #kanban-board [data-parent-container-id][data-drag-state="is-dragging-over"] {
    background-color: #f2faf3;
  }

  /* Card styling - items within containers */
  #kanban-board [data-parent-container-id] > div {
    padding: 10px 12px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    cursor: grab;
    font-weight: 500;
    user-select: none;
    font-size: 14px;
  }

  /* Card states */
  #kanban-board [data-parent-container-id] > div[data-is-dragging="true"] {
    background-color: #f0f8ff;
    border-color: #1890ff;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
    transform: scale(1.02);
    z-index: 10;
  }

  /* Card hover effect */
  #kanban-board [data-parent-container-id] > div:hover:not([data-is-dragging="true"]) {
    background-color: #fafafa;
    border-color: #d9d9d9;
  }`;

  const { draggableElement: group1Container } = useDraggable({
    draggableItems: group1,
    containerId: "group1",
    draggableItemStylingOptOut: true,
  });

  const { draggableElement: group2Container } = useDraggable({
    draggableItems: group2,
    containerId: "group2",
    draggableItemStylingOptOut: true,
  });

  const { draggableElement: group3Container } = useDraggable({
    draggableItems: group3,
    containerId: "group3",
    draggableItemStylingOptOut: true,
  });

  const { draggableElement: group4Container } = useDraggable({
    draggableItems: group4,
    containerId: "group4",
    draggableItemStylingOptOut: true,
  });

  return (
    <DraggableProvider dragType="onDrop">
      <style>{cssRules}</style>
      <div id="kanban-board" className="kanban-board">
        <div className="column column-contributors-1">
          <div className="column-header">Carbon Contributors 1</div>
          {group1Container}
        </div>
        <div className="column column-contributors-2">
          <div className="column-header">Carbon Contributors 2</div>
          {group2Container}
        </div>
        <div className="column column-contributors-3">
          <div className="column-header">Carbon Contributors 3</div>
          {group3Container}
        </div>
        <div className="column column-contributors-4">
          <div className="column-header">Carbon Contributors 4</div>
          {group4Container}
        </div>
      </div>
    </DraggableProvider>
  );
};

DraggableProviderDragType.storyName = "Draggable Provider Drag Type";

export const DraggableProviderGetOrderCallback: Story = () => {
  const group1 = [
    <div>Ed</div>,
    <div>Andrew</div>,
    <div>Igor</div>,
    <div>Kuba</div>,
    <div>Alexander</div>,
    <div>Maciek</div>
  ];

  const group2 = [
    <div>Sam</div>,
    <div>Dan</div>,
    <div>James</div>,
    <div>Ian</div>,
    <div>Robin</div>
  ];

  const group3 = [
    <div>Nuria</div>,
    <div>Chris</div>,
    <div>Iga</div>,
    <div>Damian</div>
  ];

  const group4 = [
    <div>Katarzyna</div>,
    <div>Tom</div>,
    <div>Ian</div>,
    <div>Michael</div>,
    <div>Stephen</div>,
    <div>John</div>,
    <div>Harpal</div>
  ];

  const cssRules = `
  /* Board layout */
  #kanban-board {
    display: flex;
    gap: 16px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    min-height: 600px;
  }
  
  /* Make sure useDraggableContainer takes full size */
  #kanban-board [data-element="use-draggable-container"] {
    height: 550px;
    overflow-y: auto;
    width: 100%;
  }

  /* Column styling */
  #kanban-board .column {
    display: flex;
    flex-direction: column;
    width: 280px;
    min-height: 560px;
    background-color: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
  }
  
  /* Column header */
  #kanban-board .column-header {
    font-weight: 600;
    padding: 12px 16px;
    border-bottom: 1px solid #eaeaea;
    background-color: #f0f0f0;
    margin: 0;
  }
  
  /* Container styling */
  #kanban-board [data-parent-container-id] {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    flex: 1;
    overflow-y: auto;
    max-height: 520px;
    min-height: 40px;
  }

  /* Column color indicators */
  #kanban-board .column-contributors-1 {
    border-top: 3px solid #1890ff;
  }

  #kanban-board .column-contributors-2 {
    border-top: 3px solid #722ed1;
  }

  #kanban-board .column-contributors-3 {
    border-top: 3px solid #fa8c16;
  }

  #kanban-board .column-contributors-4 {
    border-top: 3px solid #52c41a;
  }

  /* Container states */
  #kanban-board [data-parent-container-id][data-drag-state="is-dragging"] {
    background-color: #edf5ff;
  }

  #kanban-board [data-parent-container-id][data-drag-state="is-dragging-over"] {
    background-color: #f2faf3;
  }

  /* Card styling - items within containers */
  #kanban-board [data-parent-container-id] > div {
    padding: 10px 12px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    cursor: grab;
    font-weight: 500;
    user-select: none;
    font-size: 14px;
  }

  /* Card states */
  #kanban-board [data-parent-container-id] > div[data-is-dragging="true"] {
    background-color: #f0f8ff;
    border-color: #1890ff;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
    transform: scale(1.02);
    z-index: 10;
  }

  /* Card hover effect */
  #kanban-board [data-parent-container-id] > div:hover:not([data-is-dragging="true"]) {
    background-color: #fafafa;
    border-color: #d9d9d9;
  }`;

  const { draggableElement: group1Container } = useDraggable({
    draggableItems: group1,
    containerId: "group1",
    draggableItemStylingOptOut: true,
  });

  const { draggableElement: group2Container } = useDraggable({
    draggableItems: group2,
    containerId: "group2",
    draggableItemStylingOptOut: true,
  });

  const { draggableElement: group3Container } = useDraggable({
    draggableItems: group3,
    containerId: "group3",
    draggableItemStylingOptOut: true,
  });

  const { draggableElement: group4Container } = useDraggable({
    draggableItems: group4,
    containerId: "group4",
    draggableItemStylingOptOut: true,
  });

  return (
    <DraggableProvider getOrder={(containerIdOrder, movedItemId) => console.log(containerIdOrder, movedItemId)}>
      <style>{cssRules}</style>
      <div id="kanban-board" className="kanban-board">
        <div className="column column-contributors-1">
          <div className="column-header">Carbon Contributors 1</div>
          {group1Container}
        </div>
        <div className="column column-contributors-2">
          <div className="column-header">Carbon Contributors 2</div>
          {group2Container}
        </div>
        <div className="column column-contributors-3">
          <div className="column-header">Carbon Contributors 3</div>
          {group3Container}
        </div>
        <div className="column column-contributors-4">
          <div className="column-header">Carbon Contributors 4</div>
          {group4Container}
        </div>
      </div>
    </DraggableProvider>
  );
};

DraggableProviderGetOrderCallback.storyName = "Draggable Provider getOrder callback";

export const DraggableProviderManualReOrdering: Story = () => {
  const draggableProviderHandle = useRef<DraggableProviderHandle | null>(null);
  const [currentOrder, setCurrentOrder] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const previousOrderRef = useRef(currentOrder);

  useEffect(() => {
    previousOrderRef.current = currentOrder;
    console.log("Current Order:", currentOrder);
    console.log("Previous Order:", previousOrderRef.current);
  }, [currentOrder]);

  const getIndex = (id: number) => previousOrderRef.current.indexOf(id);

  const moveItem = (id: number, targetIndex: number, toListId?: string) => 
    draggableProviderHandle.current?.reOrder({itemId: id, toIndex: targetIndex, toListId});
  
  const MOVE_ACTIONS = [
    { label: "Move Up", getTargetIndex: (id: number) => getIndex(id) - 1, toListId: undefined },
    { label: "Move Down", getTargetIndex: (id: number) => getIndex(id) + 1, toListId: undefined },
    { label: "Move To Carbon Contributors 1", getTargetIndex: () => 0, toListId: "group1" },
    { label: "Move To Carbon Contributors 2", getTargetIndex: () => 0, toListId: "group2" },
    { label: "Move To Carbon Contributors 3", getTargetIndex: () => 0, toListId: "group3" },
    { label: "Move To Carbon Contributors 4", getTargetIndex: () => 0, toListId: "group4" },
  ];
  
  const actionPopover = (id: number) => (
    <ActionPopover m={0}>
      {MOVE_ACTIONS.map(({ label, getTargetIndex, toListId }) => (
        <ActionPopoverItem 
          key={`${id}-${label}`} 
          onClick={() => moveItem(id, getTargetIndex(id), toListId)}
        >
          {label}
        </ActionPopoverItem>
      ))}
    </ActionPopover>
  );
  
  // Modified card component with inline popover
  const createCardWithPopover = (content: React.ReactNode, id: number) => {
    // Extract the id and text content from the div
    const divId = content.props.id;
    const textContent = content.props.children;
    
    // Return a single div with text and popover side by side
    return (
      <div id={divId} className="draggable-card">
        {textContent}
        <span className="card-actions">{actionPopover(id)}</span>
      </div>
    );
  };
  
  const group1 = [
    createCardWithPopover("ed", 1),
    createCardWithPopover(<div id="2">Andrew</div>, 2),
    createCardWithPopover(<div id="3">Igor</div>, 3),
    createCardWithPopover(<div id="4">Kuba</div>, 4),
    createCardWithPopover(<div id="5">Alexander</div>, 5),
    createCardWithPopover(<div id="6">Maciek</div>, 6)
  ];
  
  const group2 = [
    createCardWithPopover(<div id="7">Sam</div>, 7),
    createCardWithPopover(<div id="8">Dan</div>, 8),
    createCardWithPopover(<div id="9">James</div>, 9),
    createCardWithPopover(<div id="10">Ian</div>, 10),
    createCardWithPopover(<div id="11">Robin</div>, 11)
  ];
  
  const group3 = [
    createCardWithPopover(<div id="12">Nuria</div>, 12),
    createCardWithPopover(<div id="13">Chris</div>, 13),
    createCardWithPopover(<div id="14">Iga</div>, 14),
    createCardWithPopover(<div id="15">Damian</div>, 15)
  ];
  
  const group4 = [
    createCardWithPopover(<div id="16">Katarzyna</div>, 16),
    createCardWithPopover(<div id="17">Tom</div>, 17),
    createCardWithPopover(<div id="18">Ian</div>, 18),
    createCardWithPopover(<div id="19">Michael</div>, 19),
    createCardWithPopover(<div id="20">Stephen</div>, 20),
    createCardWithPopover(<div id="21">John</div>, 21),
    createCardWithPopover(<div id="22">Harpal</div>, 22)
  ];

  const cssRules = `
  /* Board layout */
  #kanban-board {
    display: flex;
    gap: 16px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    min-height: 600px;
  }
  
  /* Make sure useDraggableContainer takes full size */
  #kanban-board [data-element="use-draggable-container"] {
    height: 550px;
    overflow-y: auto;
    width: 100%;
  }

  /* Column styling */
  #kanban-board .column {
    display: flex;
    flex-direction: column;
    width: 280px;
    min-height: 560px;
    background-color: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
  }
  
  /* Column header */
  #kanban-board .column-header {
    font-weight: 600;
    padding: 12px 16px;
    border-bottom: 1px solid #eaeaea;
    background-color: #f0f0f0;
    margin: 0;
  }
  
  /* Container styling */
  #kanban-board [data-parent-container-id] {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    flex: 1;
    overflow-y: auto;
    max-height: 520px;
    min-height: 40px;
  }

  /* Column color indicators */
  #kanban-board .column-contributors-1 {
    border-top: 3px solid #1890ff;
  }

  #kanban-board .column-contributors-2 {
    border-top: 3px solid #722ed1;
  }

  #kanban-board .column-contributors-3 {
    border-top: 3px solid #fa8c16;
  }

  #kanban-board .column-contributors-4 {
    border-top: 3px solid #52c41a;
  }

  /* Container states */
  #kanban-board [data-parent-container-id][data-drag-state="is-dragging"] {
    background-color: #edf5ff;
  }

  #kanban-board [data-parent-container-id][data-drag-state="is-dragging-over"] {
    background-color: #f2faf3;
  }

  /* Card styling - items within containers */
  #kanban-board [data-parent-container-id] > div.draggable-card {
    padding: 10px 12px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    cursor: grab;
    font-weight: 500;
    user-select: none;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Card actions */
  #kanban-board .card-actions {
    display: inline-flex;
    align-items: center;
    margin-left: 8px;
  }

  /* ActionPopover styling */
  #kanban-board .card-actions [data-component="action-popover"] {
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: transparent;
    transition: background-color 0.2s ease;
  }

  #kanban-board .card-actions [data-component="action-popover"]:hover {
    background-color: #f0f0f0;
  }

  #kanban-board .card-actions [data-component="action-popover"] svg {
    color: #666;
    width: 16px;
    height: 16px;
  }

  /* ActionPopoverItem styling */
  #kanban-board [data-component="action-popover-menu"] {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    border: 1px solid #eaeaea;
  }

  #kanban-board [data-component="action-popover-item"] {
    padding: 8px 12px;
    font-size: 13px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  #kanban-board [data-component="action-popover-item"]:hover {
    background-color: #f5f5f5;
  }

  /* Card states */
  #kanban-board [data-parent-container-id] > div[data-is-dragging="true"] {
    background-color: #f0f8ff;
    border-color: #1890ff;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
    transform: scale(1.02);
    z-index: 10;
  }

  /* Card hover effect */
  #kanban-board [data-parent-container-id] > div:hover:not([data-is-dragging="true"]) {
    background-color: #fafafa;
    border-color: #d9d9d9;
  }`;

  const { draggableElement: group1Container } = useDraggable({
    draggableItems: group1,
    containerId: "group1",
    draggableItemStylingOptOut: true,
  });

  const { draggableElement: group2Container } = useDraggable({
    draggableItems: group2,
    containerId: "group2",
    draggableItemStylingOptOut: true,
  });

  const { draggableElement: group3Container } = useDraggable({
    draggableItems: group3,
    containerId: "group3",
    draggableItemStylingOptOut: true,
  });

  const { draggableElement: group4Container } = useDraggable({
    draggableItems: group4,
    containerId: "group4",
    draggableItemStylingOptOut: true,
  });

  return (
    <DraggableProvider ref={draggableProviderHandle}>
      <style>{cssRules}</style>
      <div id="kanban-board" className="kanban-board">
        <div className="column column-contributors-1">
          <div className="column-header">Carbon Contributors 1</div>
          {group1Container}
        </div>
        <div className="column column-contributors-2">
          <div className="column-header">Carbon Contributors 2</div>
          {group2Container}
        </div>
        <div className="column column-contributors-3">
          <div className="column-header">Carbon Contributors 3</div>
          {group3Container}
        </div>
        <div className="column column-contributors-4">
          <div className="column-header">Carbon Contributors 4</div>
          {group4Container}
        </div>
      </div>
    </DraggableProvider>
  );
};

DraggableProviderManualReOrdering.storyName = "Draggable Provider Manual Re-Ordering";