/* eslint-disable react/prop-types */
import React from "react";
import PopoverContainer from "./popover-container.component";
import { Select, Option } from "../select";

export default {
  title: "Popover Container/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
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
