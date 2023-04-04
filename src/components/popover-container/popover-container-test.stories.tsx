/* eslint-disable react/prop-types */
import React from "react";
import PopoverContainer from "./popover-container.component";
import { Select, Option } from "../select";

export default {
  title: "Popover Container/Test",
  includeStories: ["Default", "WithSelect"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = ({ title, open }: { title?: string; open: boolean }) => (
  <PopoverContainer title={title} open={open} />
);

export const WithSelect = () => {
  return (
    <div style={{ height: 100 }}>
      <PopoverContainer
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        title="select example"
      >
        <Select label="my select">
          <Option value="red" text="red" />
          <Option value="green" text="green" />
          <Option value="blue" text="blue" />
        </Select>
      </PopoverContainer>
    </div>
  );
};

WithSelect.story = {
  name: "with select",
};

Default.story = {
  name: "default",
  args: {
    title: "Title",
    open: true,
  },
};

export const PopoverContainerComponent = ({ ...props }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const onOpen = () => setIsOpen(isOpen);
  const onClose = () => setIsOpen(!isOpen);

  return (
    <div
      style={{
        height: 150,
        margin: "100px",
      }}
    >
      <PopoverContainer
        title="Cypress is awesome"
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        {...props}
      >
        Contents
      </PopoverContainer>
    </div>
  );
};

export const PopoverContainerWithSelect = () => {
  return (
    <div style={{ height: 100 }}>
      <PopoverContainer
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        title="select example"
      >
        <Select label="my select">
          <Option value="red" text="red" />
          <Option value="green" text="green" />
          <Option value="blue" text="blue" />
        </Select>
      </PopoverContainer>
    </div>
  );
};
