import React, { useRef, useState, useMemo } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import { DraggableContainer, DraggableItem } from ".";
import { Checkbox } from "../checkbox";
import { UseDraggableHandle } from "../../hooks/useDraggable/useDraggable";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof DraggableContainer> = {
  title: "Draggable",
  component: DraggableContainer,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: {
      chromatic: {
        theme: "sage",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DraggableContainer>;

export const DefaultStory: Story = () => (
  <DraggableContainer>
    <DraggableItem key="1" id={1}>
      Some content goes here
    </DraggableItem>
    <DraggableItem key="2" id={2}>
      Some content goes here
    </DraggableItem>
    <DraggableItem key="3" id={3}>
      Some content goes here
    </DraggableItem>
    <DraggableItem key="4" id={4}>
      Some content goes here
    </DraggableItem>
  </DraggableContainer>
);
DefaultStory.storyName = "Default";

export const ManualReOrdering: Story = () => {
  const draggableHandle = useRef<UseDraggableHandle | null>(null);
  const [currentOrder, setCurrentOrder] = useState<string[]>(["0", "1", "2", "3"]);

  console.log("currentOrder", currentOrder);

  // This function should calculate the current index dynamically when called
  const actionPopover = (id: number) => {
    // Get the current index every time this function runs
    const index = currentOrder.indexOf(String(id));

    return (
      <ActionPopover m={0}>
        <ActionPopoverItem onClick={() => {
          draggableHandle.current?.reOrder(id, 0);
        }}>
          Move Top
        </ActionPopoverItem>
        <ActionPopoverItem 
          disabled={index <= 0}
          onClick={() => {
            if (index > 0) {
              draggableHandle.current?.reOrder(id, index - 1);
            }
          }}>
          Move Up {index}
        </ActionPopoverItem>
        <ActionPopoverItem 
          disabled={index >= currentOrder.length - 1}
          onClick={() => {
            if (index < currentOrder.length - 1) {
              draggableHandle.current?.reOrder(id, index + 1);
            }
          }}>
          Move Down {index}
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => {
          draggableHandle.current?.reOrder(id, currentOrder.length - 1);
        }}>
          Move Bottom
        </ActionPopoverItem>
      </ActionPopover>
    );
  };

  return (
    <DraggableContainer
      getOrder={(x, y) => setCurrentOrder(x)}
      flexDirection="row-reverse"
      ref={draggableHandle}
    >
      <DraggableItem id={0}>
        <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some first content goes here
          {actionPopover(0)}
        </Box>
      </DraggableItem>
      <DraggableItem id={1}>
        <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some second content goes here
          {actionPopover(1)}
        </Box>
      </DraggableItem>
      <DraggableItem id={2}>
        <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some third content goes here
          {actionPopover(2)}
        </Box>
      </DraggableItem>
      <DraggableItem id={3}>
        <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some fourth content goes here
          {actionPopover(3)}
        </Box>
      </DraggableItem>
    </DraggableContainer>
  );
};

ManualReOrdering.storyName = "Manual Re-Ordering";

export const FlexDirectionStory: Story = () => (
  <DraggableContainer flexDirection="row-reverse">
    <DraggableItem key="1" id={1}>
      Some first content goes here
    </DraggableItem>
    <DraggableItem key="2" id={2}>
      Some second content goes here
    </DraggableItem>
    <DraggableItem key="3" id={3}>
      Some third content goes here
    </DraggableItem>
    <DraggableItem key="4" id={4}>
      Some fourth content goes here
    </DraggableItem>
  </DraggableContainer>
);
FlexDirectionStory.storyName = "With Flex Direction";

export const ComponentsAsChildrenStory: Story = () => (
  <DraggableContainer>
    <DraggableItem key="1" id={1}>
      <Checkbox label="checkbox one" mb={0} />
    </DraggableItem>
    <DraggableItem key="2" id={2}>
      <Checkbox label="checkbox two" mb={0} />
    </DraggableItem>
    <DraggableItem key="3" id={3}>
      <Checkbox label="checkbox three" mb={0} />
    </DraggableItem>
    <DraggableItem key="4" id={4}>
      <Checkbox label="checkbox four" mb={0} />
    </DraggableItem>
  </DraggableContainer>
);
ComponentsAsChildrenStory.storyName = "Components As Children";

export const GetOrderCallbackStory: Story = () => (
  <DraggableContainer getOrder={() => {}}>
    <DraggableItem key="1" id={1}>
      <Checkbox label="Draggable Label One" />
    </DraggableItem>
    <DraggableItem key="2" id={2}>
      <Checkbox label="Draggable Label Two" />
    </DraggableItem>
    <DraggableItem key="3" id={3}>
      <Checkbox label="Draggable Label Three" />
    </DraggableItem>
    <DraggableItem key="4" id={4}>
      <Checkbox label="Draggable Label Four" />
    </DraggableItem>
  </DraggableContainer>
);
GetOrderCallbackStory.storyName = "Get Order Callback";
