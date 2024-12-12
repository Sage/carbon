import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import { DraggableContainer, DraggableItem } from ".";
import { Checkbox } from "../checkbox";
import { UseDraggableHandle } from "../../hooks/useDraggable/useDraggable";
import DraggableProvider, { DraggableProviderHandle} from "../../hooks/useDraggable/draggable-provider";

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
  <DraggableProvider>
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
  </DraggableProvider>
);
DefaultStory.storyName = "Default";

export const ManualReOrdering: Story = () => {
  const draggableHandle = useRef<UseDraggableHandle | null>(null);

  const actionPopover = (id: number) => (
    <ActionPopover m={0}>
      <ActionPopoverItem onClick={() => draggableHandle.current?.reOrder(id, 0)}>
        Move Top
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => draggableHandle.current?.reOrder(id, 3)}>
        Move Bottom
      </ActionPopoverItem>
    </ActionPopover>
  );

  return (
    <DraggableContainer flexDirection="row-reverse" id="draggable-container" ref={draggableHandle}>
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

export const FlexDirectionStory: Story = () => {

  const providerHandle = useRef<DraggableProviderHandle | null>(null);


  const actionPopover = (id: number) => (
    <ActionPopover m={0}>
      <ActionPopoverItem onClick={() => providerHandle.current?.reOrder({itemId: id, toIndex: 0})}>
        Move Top
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => providerHandle.current?.reOrder({itemId: id})}>
        Move Bottom
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => providerHandle.current?.reOrder({itemId: id, toIndex: 0, toListId: "container-1" })}>
        Move To Top Container
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => providerHandle.current?.reOrder({itemId: id, toIndex: 0, toListId: "container-2" })}>
        Move To Middle Container
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => providerHandle.current?.reOrder({itemId: id, toIndex: 0, toListId: "container-3" })}>
        Move To Bottom Container
      </ActionPopoverItem>
    </ActionPopover>
  );

  return (
  <DraggableProvider ref={providerHandle}>
  <DraggableContainer mb={50} id="container-1" flexDirection="row-reverse">
  <DraggableItem id={0}>
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some first content goes here 1
            {actionPopover(0)}
          </Box>
        </DraggableItem>
        <DraggableItem id={1}>
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some second content goes here 1
            {actionPopover(1)}
          </Box>
        </DraggableItem>
        <DraggableItem id={2}>
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some third content goes here 1
            {actionPopover(2)}
          </Box>
        </DraggableItem>
        <DraggableItem id={3}>
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some fourth content goes here 1
            {actionPopover(3)} 
          </Box>
        </DraggableItem>
  </DraggableContainer>
  <br />
  <br />
    <DraggableContainer id="container-2" flexDirection="row-reverse">
    <DraggableItem id={4}>
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some first content goes here 2
            {actionPopover(4)}
          </Box>
        </DraggableItem>
        <DraggableItem id={5}>
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some second content goes here 2
          {actionPopover(5)}
          </Box>
        </DraggableItem>
        <DraggableItem id={6}>
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some third content goes here 2
          {actionPopover(6)}
          </Box>
        </DraggableItem>
        <DraggableItem id={7}>
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some fourth content goes here 2
          {actionPopover(7)}
          </Box>
        </DraggableItem>
  </DraggableContainer>
  <br />
  <br />
  <DraggableContainer id="container-3" flexDirection="row-reverse">
  <DraggableItem id={8}>
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some first content goes here 3
          {actionPopover(8)}
          </Box>
        </DraggableItem>
        <DraggableItem id={9}>
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some second content goes here 3
          {actionPopover(9)}
          </Box>
        </DraggableItem>
        <DraggableItem id={10}>
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some third content goes here 3
          {actionPopover(10)}
          </Box>
        </DraggableItem>
        <DraggableItem id={11}>
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="baseline">
          Some fourth content goes here 3
          {actionPopover(11)}
          </Box>
        </DraggableItem>
  </DraggableContainer>
  </DraggableProvider>)
};
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