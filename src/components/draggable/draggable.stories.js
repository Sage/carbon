import React from "react";
import { action } from "@storybook/addon-actions";
import DraggableContainer from "./draggable-container.component";
import DraggableItem from "./draggable-item.component";
import { Checkbox } from "../../__experimental__/components/checkbox";

export default {
  component: DraggableContainer,
  title: "Design System/Draggable/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
};

export const basic = () => {
  const handleUpdate = (items) => {
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
    </DraggableContainer>
  );
};

basic.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
