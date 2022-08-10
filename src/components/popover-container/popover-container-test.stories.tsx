/* eslint-disable react/prop-types */
import React from "react";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
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
  argTypes: {
    titleSpecialCharacters: specialCharacters,
  },
};

export const Default = ({
  title,
  titleSpecialCharacters,
  open,
}: {
  title?: string;
  titleSpecialCharacters?: string;
  open: boolean;
}) => <PopoverContainer title={title || titleSpecialCharacters} open={open} />;

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
    titleSpecialCharacters: undefined,
    open: true,
  },
};
