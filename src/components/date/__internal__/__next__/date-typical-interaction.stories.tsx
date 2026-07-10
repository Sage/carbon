import React from "react";
import { StoryObj } from "@storybook/react-vite";
import { userEvent, within } from "storybook/test";

import DateInput from "../../date.component";
import { allowInteractions } from "../../../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof DateInput>;

export default {
  title: "Date Input/Typical/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const MonthYearNavigation: Story = {
  name: "Month/Year Navigation",
  render: () => (
    <DateInput
      variant="typical"
      label="Date"
      name="date-input"
      value="04/04/2019"
      onChange={() => {}}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const calendarIcon = canvas.getByTestId("icon");
    await userEvent.click(calendarIcon);
    const navigationIcon = canvas.getByRole("button", { name: "Next month" });
    await userEvent.click(navigationIcon);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
