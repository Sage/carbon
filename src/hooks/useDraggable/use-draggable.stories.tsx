import React, { useRef, useEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import useDraggable, { UseDraggableHandle, DraggableProvider} from ".";
import Box from "../../components/box"
import { ActionPopover, ActionPopoverItem} from "../../components/action-popover"

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

    const items = ["item1", "item2", "item3"];

    const { draggableElement } = useDraggable({draggableItems: items});

  return draggableElement;
};
BasicImplementation.storyName = "BasicImplementation";

export const WithIds: Story = () => {

    const items = [<div id="1">item1</div>, <div id="2">item2</div>, <div id="3">item3</div>];

    const { draggableElement } = useDraggable({draggableItems: items, containerId: "foo" })

  return draggableElement;
};

WithIds.storyName = "With Ids";


export const GetOrderCallback: Story = () => {

    const items = [<div id="1">item1</div>, <div id="2">item2</div>, <div id="3">item3</div>];

    const { draggableElement } = useDraggable({draggableItems: items, getOrder: (itemIds, movedId) => console.log(itemIds, movedId)});

  return draggableElement;
};
GetOrderCallback.storyName = "getOrder callback";


export const ManualReOrdering: Story = () => {
    const draggableHandle = useRef<UseDraggableHandle | null>(null);
    const [currentOrder, setCurrentOrder] = useState<number[]>([1, 2, 3]);
    const previousOrderRef = useRef(currentOrder);
    
    useEffect(() => { previousOrderRef.current = currentOrder }, [currentOrder]);
    
    const getIndex = (id: number) => previousOrderRef.current.indexOf(id);
    const moveItem = (id: number, targetIndex: number) => draggableHandle.current?.reOrder(id, targetIndex);
    
    const MOVE_ACTIONS = [
      { label: 'Move Top', getTargetIndex: () => 0 },
      { label: 'Move Up', getTargetIndex: (id: number) => getIndex(id) - 1 },
      { label: 'Move Down', getTargetIndex: (id: number) => getIndex(id) + 1 },
      { label: 'Move Bottom', getTargetIndex: () => previousOrderRef.current.length - 1 }
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
    
    const items = [1, 2, 3].map(id => (
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
      ref: draggableHandle
    });
    
    return draggableElement;
  };
  
  ManualReOrdering.storyName = "Manual Re-Ordering";

export const ContainerAndItemsNode: Story = () => {

    const items = [<div id="1">item1</div>, <div id="2">item2</div>, <div id="3">item3</div>];

    const { draggableElement } = useDraggable({draggableItems: items, itemsNode: "li", containerNode: "ul"});

  return draggableElement;
};
ContainerAndItemsNode.storyName = "Container and Items Node";

export const DefaultStylingOptOut: Story = () => {

    const items = [<div id="1">item1</div>, <div id="2">item2</div>, <div id="3">item3</div>];

    const { draggableElement } = useDraggable({draggableItems: items, draggableItemStylingOptOut: true});

  return draggableElement;
};
DefaultStylingOptOut.storyName = "Default Styling Opt Out";

export const DragState: Story = () => {
    const items = [<div id="1">item1</div>, <div id="2">item2</div>, <div id="3">item3</div>];

      const cssRules = `
    [data-parent-container-id="bar"][data-drag-state="idle"] {
      background-color: white;
    }
    
    [data-parent-container-id="bar"][data-drag-state="is-dragging"] {
      background-color: #e6f7ff;
      border-color: #1890ff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    
    [data-parent-container-id="bar"][data-drag-state="is-dragging-over"] {
      background-color: #f6ffed;
      border-color: #52c41a;
    }
  `;
  
    const { draggableElement } = useDraggable({
      draggableItems: items, 
      containerId: "bar",
      draggableItemStylingOptOut: true
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
  
  DragState.storyName = "DragState";