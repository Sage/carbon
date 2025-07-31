import React from "react";
import { action } from "@storybook/addon-actions";

import DraggableContainer, {
  DraggableContainerProps,
} from "./draggable-container.component";
import DraggableItem from "./draggable-item/draggable-item.component";
import { Checkbox } from "../checkbox";
import Textbox from "../textbox";
import Box from "../box";

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
        <Checkbox
          label="Draggable Label One"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="2" id={2}>
        <Checkbox
          label="Draggable Label Two"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="3" id={3}>
        <Checkbox
          label="Draggable Label Three"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="4" id={4}>
        <Checkbox
          label="Draggable Label Four"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="5" id={5}>
        <Textbox label="Draggable Textbox" value="" onChange={() => {}} />
      </DraggableItem>
    </DraggableContainer>
  );
};

Default.story = {
  name: "default",
};

export const DraggableFlexDirection = () => {
  const handleUpdate = (items?: (string | number | undefined)[]) => {
    action("onUpdate")(items);
  };
  return (
    <DraggableContainer getOrder={handleUpdate} flexDirection="row-reverse">
      <DraggableItem key="1" id={1}>
        <Checkbox
          label="Draggable Label One"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="2" id={2}>
        <Checkbox
          label="Draggable Label Two"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="3" id={3}>
        <Checkbox
          label="Draggable Label Three"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="4" id={4}>
        <Checkbox
          label="Draggable Label Four"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="5" id={5}>
        <Textbox label="Draggable Textbox" value="" onChange={() => {}} />
      </DraggableItem>
    </DraggableContainer>
  );
};

DraggableFlexDirection.story = {
  name: "Flex Direction",
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
        <Checkbox
          label="Draggable Label One"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="2" id={2}>
        <Checkbox
          label="Draggable Label Two"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="3" id={3}>
        <Checkbox
          label="Draggable Label Three"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="4" id={4}>
        <Checkbox
          label="Draggable Label Four"
          checked={false}
          onChange={() => {}}
        />
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
          <Checkbox
            label="Draggable Label Four"
            checked={false}
            onChange={() => {}}
          />
        </DraggableItem>
        <DraggableItem key="5" id={5}>
          <Checkbox
            label="Draggable Label Five"
            checked={false}
            onChange={() => {}}
          />
        </DraggableItem>
        <DraggableItem key="6" id={6}>
          <Checkbox
            label="Draggable Label Six"
            checked={false}
            onChange={() => {}}
          />
        </DraggableItem>
      </DraggableContainer>
      <DraggableContainer mt={9}>
        <DraggableItem key="7" id={7}>
          <Checkbox
            label="Draggable Label Seven"
            checked={false}
            onChange={() => {}}
          />
        </DraggableItem>
      </DraggableContainer>
    </Box>
  );
};
