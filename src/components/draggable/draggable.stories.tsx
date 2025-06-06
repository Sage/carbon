import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import { DraggableContainer, DraggableItem } from ".";
import { Checkbox } from "../checkbox";

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
