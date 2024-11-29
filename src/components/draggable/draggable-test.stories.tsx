import React from "react";
import { action } from "@storybook/addon-actions";
import Button from "../button";

import DraggableContainer, {
  DraggableContainerProps,
} from "./draggable-container.component";
import DraggableItem from "./draggable-item/draggable-item.component";
import { Checkbox } from "../checkbox";
import Textbox from "../textbox";
import Box from "../box";
import useDraggable from "../../hooks/useDraggable/useDraggable";

export default {
  title: "Draggable/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = () => {
  const handleUpdate = (items?: (string | number | undefined)[]) => {
    action("onUpdate")(items);
  };
  return (
    <DraggableContainer getOrder={handleUpdate}>
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

Default.story = {
  name: "default",
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

export const DraggableHookPoc = ({
  ...props
}: DraggableContainerProps) => {

  const buttons = [
    <Button id="0">Button 1</Button>,
    <Button id="1">Button 2</Button>,
    <Button id="2">Button 3</Button>,
    <Button id="3">Button 4</Button>,
    <Button id="4">Button 5</Button>,
    <Button id="5">Button 6</Button>,
    <Button id="6">Button 7</Button>,
  ];

 const [DraggableContainer, dragState] = useDraggable(buttons);

  return (
    <div>
      {DraggableContainer}
    </div>
  );
};

