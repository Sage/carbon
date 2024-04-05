import React from "react";
import { DraggableContainer, DraggableContainerProps, DraggableItem } from ".";
import { Checkbox } from "../checkbox";
import Textbox from "../textbox";
import Box from "../box";

export const DraggableDefault = () => {
  return (
    <DraggableContainer>
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
      <DraggableItem key="5" id={5}>
        <Textbox label="Draggable Textbox" />
      </DraggableItem>
    </DraggableContainer>
  );
};

export const DraggableCustom = ({
  getOrder,
  ...props
}: DraggableContainerProps) => {
  const handleUpdate = () => {
    if (getOrder) {
      getOrder();
    }
  };
  return (
    <DraggableContainer {...props} getOrder={handleUpdate}>
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
};

export const DraggableDifferentContainers = ({
  getOrder,
  ...props
}: DraggableContainerProps) => {
  const handleUpdate = () => {
    if (getOrder) {
      getOrder();
    }
  };
  return (
    <Box>
      <DraggableContainer mb={9} getOrder={handleUpdate} {...props}>
        <DraggableItem key="4" id={4}>
          <Checkbox label="Draggable Label Four" />
        </DraggableItem>
        <DraggableItem key="5" id={5}>
          <Checkbox label="Draggable Label Five" />
        </DraggableItem>
        <DraggableItem key="6" id={6}>
          <Checkbox label="Draggable Label Six" />
        </DraggableItem>
      </DraggableContainer>
      <DraggableContainer mt={9}>
        <DraggableItem key="7" id={7}>
          <Checkbox label="Draggable Label Seven" />
        </DraggableItem>
      </DraggableContainer>
    </Box>
  );
};
