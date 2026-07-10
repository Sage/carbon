import { StoryObj } from "@storybook/react-vite";
import React from "react";

import DateInput from "../../date.component";

export default {
  title: "Date Input/Typical/Test",
  component: DateInput,
  tags: ["!dev"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DateStory: StoryObj<typeof DateInput> = {
  name: "Date Input",
  render: () => (
    <DateInput
      variant="typical"
      label="Date"
      name="date-input"
      value="01/05/2022"
      onChange={() => {}}
      inputHint="Hint text"
    />
  ),
};
