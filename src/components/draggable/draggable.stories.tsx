import React from "react";
import { ComponentStory } from "@storybook/react";

import { DraggableContainer, DraggableItem } from ".";
import { Checkbox } from "../checkbox";

export const DefaultStory: ComponentStory<typeof DraggableContainer> = () => (
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

export const ComponentsAsChildrenStory: ComponentStory<
  typeof DraggableContainer
> = () => (
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

export const GetOrderCallbackStory: ComponentStory<
  typeof DraggableContainer
> = () => (
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
