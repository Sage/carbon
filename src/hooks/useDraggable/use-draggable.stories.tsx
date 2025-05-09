import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";
import { Meta, StoryObj } from "@storybook/react";
import useDraggable, {
  UseDraggableHandle,
  DraggableProvider,
  DraggableProviderHandle,
} from ".";
import Box from "../../components/box";
import {
  ActionPopover,
  ActionPopoverItem,
} from "../../components/action-popover";
import { ContainerOrderType } from "./draggable-provider";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof useDraggable> = {
  tags: ["hideInSidebar"],
  argTypes: {
    draggableItems: {
      type: { summary: "React.ReactNode[] | React.ReactNode" },
      description:
        "The items to be made draggable. Can be an array of ReactNodes or a single ReactNode.",
      required: true,
    },
    ref: {
      type: { summary: "Ref<UseDraggableHandle>" },
      description:
        "Reference to access the draggable handle for programmatic control.",
      required: false,
    },
    containerId: {
      type: { summary: "string | number" },
      description: "Optional ID for the container element.",
      required: false,
    },
    stylingOptOut: {
      type: { summary: "boolean" },
      description:
        "When true, disables the default styling for draggable items.",
      required: false,
    },
    containerNode: {
      type: {
        summary:
          "keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>",
      },
      description: "Node to use as the container element.",
      required: false,
    },
    itemsNode: {
      type: {
        summary:
          "keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>",
      },
      description: "Node to use for the draggable items.",
      required: false,
    },
    getOrder: {
      type: { summary: "function" },
      description:
        "Callback function triggered when item order changes. Receives the current order of draggable item IDs and the ID of the moved item.",
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

export const DefaultStylingOptOut: Story = () => {
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
    stylingOptOut: true,
  });

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
  
  [data-parent-container-id="bar"][data-drag-state="is-being-dragged-over"] {
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
    stylingOptOut: true,
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
    stylingOptOut: true,
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
    <div>Maciek</div>,
  ];

  const group2 = [
    <div>Sam</div>,
    <div>Dan</div>,
    <div>James</div>,
    <div>Ian</div>,
    <div>Robin</div>,
  ];

  const group3 = [
    <div>Nuria</div>,
    <div>Chris</div>,
    <div>Iga</div>,
    <div>Damian</div>,
  ];

  const group4 = [
    <div>Katarzyna</div>,
    <div>Tom</div>,
    <div>Ian</div>,
    <div>Michael</div>,
    <div>Stephen</div>,
    <div>John</div>,
    <div>Harpal</div>,
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

  #kanban-board [data-parent-container-id][data-drag-state="is-being-dragged-over"] {
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
    stylingOptOut: true,
  });

  const { draggableElement: group2Container } = useDraggable({
    draggableItems: group2,
    containerId: "group2",
    stylingOptOut: true,
  });

  const { draggableElement: group3Container } = useDraggable({
    draggableItems: group3,
    containerId: "group3",
    stylingOptOut: true,
  });

  const { draggableElement: group4Container } = useDraggable({
    draggableItems: group4,
    containerId: "group4",
    stylingOptOut: true,
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
    <div>Maciek</div>,
  ];

  const group2 = [
    <div>Sam</div>,
    <div>Dan</div>,
    <div>James</div>,
    <div>Ian</div>,
    <div>Robin</div>,
  ];

  const group3 = [
    <div>Nuria</div>,
    <div>Chris</div>,
    <div>Iga</div>,
    <div>Damian</div>,
  ];

  const group4 = [
    <div>Katarzyna</div>,
    <div>Tom</div>,
    <div>Ian</div>,
    <div>Michael</div>,
    <div>Stephen</div>,
    <div>John</div>,
    <div>Harpal</div>,
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

  #kanban-board [data-parent-container-id][data-drag-state="is-being-dragged-over"] {
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
    stylingOptOut: true,
  });

  const { draggableElement: group2Container } = useDraggable({
    draggableItems: group2,
    containerId: "group2",
    stylingOptOut: true,
  });

  const { draggableElement: group3Container } = useDraggable({
    draggableItems: group3,
    containerId: "group3",
    stylingOptOut: true,
  });

  const { draggableElement: group4Container } = useDraggable({
    draggableItems: group4,
    containerId: "group4",
    stylingOptOut: true,
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
    <div>Maciek</div>,
  ];

  const group2 = [
    <div>Sam</div>,
    <div>Dan</div>,
    <div>James</div>,
    <div>Ian</div>,
    <div>Robin</div>,
  ];

  const group3 = [
    <div>Nuria</div>,
    <div>Chris</div>,
    <div>Iga</div>,
    <div>Damian</div>,
  ];

  const group4 = [
    <div>Katarzyna</div>,
    <div>Tom</div>,
    <div>Ian</div>,
    <div>Michael</div>,
    <div>Stephen</div>,
    <div>John</div>,
    <div>Harpal</div>,
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

  #kanban-board [data-parent-container-id][data-drag-state="is-being-dragged-over"] {
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
    stylingOptOut: true,
  });

  const { draggableElement: group2Container } = useDraggable({
    draggableItems: group2,
    containerId: "group2",
    stylingOptOut: true,
  });

  const { draggableElement: group3Container } = useDraggable({
    draggableItems: group3,
    containerId: "group3",
    stylingOptOut: true,
  });

  const { draggableElement: group4Container } = useDraggable({
    draggableItems: group4,
    containerId: "group4",
    stylingOptOut: true,
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

DraggableProviderGetOrderCallback.storyName =
  "Draggable Provider getOrder callback";

export const DraggableProviderManualReOrdering: Story = () => {
  const draggableProviderHandle = useRef<DraggableProviderHandle | null>(null);

  const actionPopover = (id: string) => {
    return (
      <ActionPopover m={0} aria-label="Actions">
        <ActionPopoverItem
          onClick={() =>
            draggableProviderHandle.current?.reOrder({
              itemId: id,
              toIndex: 0,
              toListId: "group1",
            })
          }
        >
          Move to Group 1
        </ActionPopoverItem>
        <ActionPopoverItem
          onClick={() =>
            draggableProviderHandle.current?.reOrder({
              itemId: id,
              toIndex: 0,
              toListId: "group2",
            })
          }
        >
          Move to Group 2
        </ActionPopoverItem>
        <ActionPopoverItem
          onClick={() =>
            draggableProviderHandle.current?.reOrder({
              itemId: id,
              toIndex: 0,
              toListId: "group3",
            })
          }
        >
          Move to Group 3
        </ActionPopoverItem>
        <ActionPopoverItem
          onClick={() =>
            draggableProviderHandle.current?.reOrder({
              itemId: id,
              toIndex: 0,
              toListId: "group4",
            })
          }
        >
          Move to Group 4
        </ActionPopoverItem>
      </ActionPopover>
    );
  };

  const group1 = [
    <div id="g1-1" className="cards">
      <span>Ed</span>
      <span>{actionPopover("g1-1")}</span>
    </div>,
    <div id="g1-2" className="cards">
      <span>Andrew</span>
      <span>{actionPopover("g1-2")}</span>
    </div>,
    <div id="g1-3" className="cards">
      <span>Igor</span>
      <span>{actionPopover("g1-3")}</span>
    </div>,
    <div id="g1-4" className="cards">
      <span>Kuba</span>
      <span>{actionPopover("g1-4")}</span>
    </div>,
    <div id="g1-5" className="cards">
      <span>Alexander</span>
      <span>{actionPopover("g1-5")}</span>
    </div>,
    <div id="g1-6" className="cards">
      <span>Maciek</span>
      <span>{actionPopover("g1-6")}</span>
    </div>,
  ];

  const group2 = [
    <div id="g2-1" className="cards">
      <span>Sam</span>
      <span>{actionPopover("g2-1")}</span>
    </div>,
    <div id="g2-2" className="cards">
      <span>Dan</span>
      <span>{actionPopover("g2-2")}</span>
    </div>,
    <div id="g2-3" className="cards">
      <span>James</span>
      <span>{actionPopover("g2-3")}</span>
    </div>,
    <div id="g2-4" className="cards">
      <span>Ian</span>
      <span>{actionPopover("g2-4")}</span>
    </div>,
    <div id="g2-5" className="cards">
      <span>Robin</span>
      <span>{actionPopover("g2-5")}</span>
    </div>,
  ];

  const group3 = [
    <div id="g3-1" className="cards">
      <span>Nuria</span>
      <span>{actionPopover("g3-1")}</span>
    </div>,
    <div id="g3-2" className="cards">
      <span>Chris</span>
      <span>{actionPopover("g3-2")}</span>
    </div>,
    <div id="g3-3" className="cards">
      <span>Iga</span>
      <span>{actionPopover("g3-3")}</span>
    </div>,
    <div id="g3-4" className="cards">
      <span>Damian</span>
      <span>{actionPopover("g3-4")}</span>
    </div>,
  ];

  const group4 = [
    <div id="g4-1" className="cards">
      <span>Katarzyna</span>
      <span>{actionPopover("g4-1")}</span>
    </div>,
    <div id="g4-2" className="cards">
      <span>Tom</span>
      <span>{actionPopover("g4-2")}</span>
    </div>,
    <div id="g4-3" className="cards">
      <span>Ian</span>
      <span>{actionPopover("g4-3")}</span>
    </div>,
    <div id="g4-4" className="cards">
      <span>Michael</span>
      <span>{actionPopover("g4-4")}</span>
    </div>,
    <div id="g4-5" className="cards">
      <span>Stephen</span>
      <span>{actionPopover("g4-5")}</span>
    </div>,
    <div id="g4-6" className="cards">
      <span>John</span>
      <span>{actionPopover("g4-6")}</span>
    </div>,
    <div id="g4-7" className="cards">
      <span>Harpal</span>
      <span>{actionPopover("g4-7")}</span>
    </div>,
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

   .cards {
   display: flex;
   justify-content: space-between;
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
 
   #kanban-board [data-parent-container-id][data-drag-state="is-being-dragged-over"] {
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
    stylingOptOut: true,
  });

  const { draggableElement: group2Container } = useDraggable({
    draggableItems: group2,
    containerId: "group2",
    stylingOptOut: true,
  });

  const { draggableElement: group3Container } = useDraggable({
    draggableItems: group3,
    containerId: "group3",
    stylingOptOut: true,
  });

  const { draggableElement: group4Container } = useDraggable({
    draggableItems: group4,
    containerId: "group4",
    stylingOptOut: true,
  });

  return (
    <DraggableProvider dragType="onDrop" ref={draggableProviderHandle}>
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

DraggableProviderManualReOrdering.storyName =
  "Draggable Provider manual re-order";

export const DraggableProviderAdvancedManualReOrdering = () => {
  const draggableProviderHandle = useRef<DraggableProviderHandle | null>(null);
  // Use a ref to track the current state of the containers for immediate access in callbacks
  const containerStateRef = useRef<ContainerOrderType>({
    group1: ["g1-1", "g1-2", "g1-3", "g1-4", "g1-5", "g1-6"],
    group2: ["g2-1", "g2-2", "g2-3", "g2-4", "g2-5"],
    group3: ["g3-1", "g3-2", "g3-3", "g3-4"],
    group4: ["g4-1", "g4-2", "g4-3", "g4-4", "g4-5", "g4-6", "g4-7"],
  });

  // Function to move an item to the top of its container
  const moveToTop = (itemId: string) => {
    let sourceContainerId = null;

    // Find which container the item is in
    for (const [containerId, items] of Object.entries(
      containerStateRef.current,
    )) {
      if (items.includes(itemId)) {
        sourceContainerId = containerId;
        break;
      }
    }

    if (sourceContainerId) {
      draggableProviderHandle.current?.reOrder({
        itemId,
        toIndex: 0,
        toListId: sourceContainerId,
      });
    }
  };

  // Function to move an item to the bottom of its container
  const moveToBottom = (itemId: string) => {
    let sourceContainerId = null;
    let containerLength = 0;

    // Find which container the item is in
    for (const [containerId, items] of Object.entries(
      containerStateRef.current,
    )) {
      if (items.includes(itemId)) {
        sourceContainerId = containerId;
        containerLength = items.length;
        break;
      }
    }

    if (sourceContainerId) {
      draggableProviderHandle.current?.reOrder({
        itemId,
        toIndex: containerLength - 1,
        toListId: sourceContainerId,
      });
    }
  };

  // Function to move an item up one position
  const moveUp = (itemId: string) => {
    let sourceContainerId = null;
    let currentIndex = -1;

    // Find which container the item is in and its current index
    for (const [containerId, items] of Object.entries(
      containerStateRef.current,
    )) {
      currentIndex = items.indexOf(itemId);
      if (currentIndex !== -1) {
        sourceContainerId = containerId;
        break;
      }
    }

    // If the item is found and not already at the top
    if (sourceContainerId && currentIndex > 0) {
      draggableProviderHandle.current?.reOrder({
        itemId,
        toIndex: currentIndex - 1,
        toListId: sourceContainerId,
      });
    }
  };

  // Function to move an item down one position
  const moveDown = (itemId: string) => {
    let sourceContainerId = null;
    let currentIndex = -1;
    let containerLength = 0;

    // Find which container the item is in and its current index
    for (const [containerId, items] of Object.entries(
      containerStateRef.current,
    )) {
      currentIndex = items.indexOf(itemId);
      if (currentIndex !== -1) {
        sourceContainerId = containerId;
        containerLength = items.length;
        break;
      }
    }

    // If the item is found and not already at the bottom
    if (sourceContainerId && currentIndex < containerLength - 1) {
      draggableProviderHandle.current?.reOrder({
        itemId,
        toIndex: currentIndex + 1,
        toListId: sourceContainerId,
      });
    }
  };

  // Function to handle drag & drop order changes
  const handleOrderChange = (newContainerOrder?: ContainerOrderType) => {
    // Update the ref when items are reordered to ensure movement functions have the latest data
    containerStateRef.current = newContainerOrder as ContainerOrderType;
  };

  const actionPopover = (id: string) => {
    return (
      <ActionPopover m={0} aria-label="Actions">
        <ActionPopoverItem
          onClick={() =>
            draggableProviderHandle.current?.reOrder({
              itemId: id,
              toIndex: 0,
              toListId: "group1",
            })
          }
        >
          Move to Group 1
        </ActionPopoverItem>
        <ActionPopoverItem
          onClick={() =>
            draggableProviderHandle.current?.reOrder({
              itemId: id,
              toIndex: 0,
              toListId: "group2",
            })
          }
        >
          Move to Group 2
        </ActionPopoverItem>
        <ActionPopoverItem
          onClick={() =>
            draggableProviderHandle.current?.reOrder({
              itemId: id,
              toIndex: 0,
              toListId: "group3",
            })
          }
        >
          Move to Group 3
        </ActionPopoverItem>
        <ActionPopoverItem
          onClick={() =>
            draggableProviderHandle.current?.reOrder({
              itemId: id,
              toIndex: 0,
              toListId: "group4",
            })
          }
        >
          Move to Group 4
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => moveToTop(id)}>
          Move Top
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => moveToBottom(id)}>
          Move Bottom
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => moveUp(id)}>
          Move Up
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => moveDown(id)}>
          Move Down
        </ActionPopoverItem>
      </ActionPopover>
    );
  };

  const group1 = [
    <div id="g1-1" className="cards">
      <span>Ed</span>
      <span>{actionPopover("g1-1")}</span>
    </div>,
    <div id="g1-2" className="cards">
      <span>Andrew</span>
      <span>{actionPopover("g1-2")}</span>
    </div>,
    <div id="g1-3" className="cards">
      <span>Igor</span>
      <span>{actionPopover("g1-3")}</span>
    </div>,
    <div id="g1-4" className="cards">
      <span>Kuba</span>
      <span>{actionPopover("g1-4")}</span>
    </div>,
    <div id="g1-5" className="cards">
      <span>Alexander</span>
      <span>{actionPopover("g1-5")}</span>
    </div>,
    <div id="g1-6" className="cards">
      <span>Maciek</span>
      <span>{actionPopover("g1-6")}</span>
    </div>,
  ];

  const group2 = [
    <div id="g2-1" className="cards">
      <span>Sam</span>
      <span>{actionPopover("g2-1")}</span>
    </div>,
    <div id="g2-2" className="cards">
      <span>Dan</span>
      <span>{actionPopover("g2-2")}</span>
    </div>,
    <div id="g2-3" className="cards">
      <span>James</span>
      <span>{actionPopover("g2-3")}</span>
    </div>,
    <div id="g2-4" className="cards">
      <span>Ian</span>
      <span>{actionPopover("g2-4")}</span>
    </div>,
    <div id="g2-5" className="cards">
      <span>Robin</span>
      <span>{actionPopover("g2-5")}</span>
    </div>,
  ];

  const group3 = [
    <div id="g3-1" className="cards">
      <span>Nuria</span>
      <span>{actionPopover("g3-1")}</span>
    </div>,
    <div id="g3-2" className="cards">
      <span>Chris</span>
      <span>{actionPopover("g3-2")}</span>
    </div>,
    <div id="g3-3" className="cards">
      <span>Iga</span>
      <span>{actionPopover("g3-3")}</span>
    </div>,
    <div id="g3-4" className="cards">
      <span>Damian</span>
      <span>{actionPopover("g3-4")}</span>
    </div>,
  ];

  const group4 = [
    <div id="g4-1" className="cards">
      <span>Katarzyna</span>
      <span>{actionPopover("g4-1")}</span>
    </div>,
    <div id="g4-2" className="cards">
      <span>Tom</span>
      <span>{actionPopover("g4-2")}</span>
    </div>,
    <div id="g4-3" className="cards">
      <span>Ian</span>
      <span>{actionPopover("g4-3")}</span>
    </div>,
    <div id="g4-4" className="cards">
      <span>Michael</span>
      <span>{actionPopover("g4-4")}</span>
    </div>,
    <div id="g4-5" className="cards">
      <span>Stephen</span>
      <span>{actionPopover("g4-5")}</span>
    </div>,
    <div id="g4-6" className="cards">
      <span>John</span>
      <span>{actionPopover("g4-6")}</span>
    </div>,
    <div id="g4-7" className="cards">
      <span>Harpal</span>
      <span>{actionPopover("g4-7")}</span>
    </div>,
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

  .cards {
    display: flex;
    justify-content: space-between;
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

  #kanban-board [data-parent-container-id][data-drag-state="is-being-dragged-over"] {
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
    stylingOptOut: true,
  });

  const { draggableElement: group2Container } = useDraggable({
    draggableItems: group2,
    containerId: "group2",
    stylingOptOut: true,
  });

  const { draggableElement: group3Container } = useDraggable({
    draggableItems: group3,
    containerId: "group3",
    stylingOptOut: true,
  });

  const { draggableElement: group4Container } = useDraggable({
    draggableItems: group4,
    containerId: "group4",
    stylingOptOut: true,
  });

  return (
    <DraggableProvider
      dragType="onDrop"
      ref={draggableProviderHandle}
      getOrder={handleOrderChange}
    >
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

DraggableProviderAdvancedManualReOrdering.storyName =
  "Draggable Provider advanced manual re-order";
