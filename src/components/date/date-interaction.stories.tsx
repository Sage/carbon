import React, { useState } from "react";

import { StoryObj } from "@storybook/react-vite";
import { format, startOfDay, subDays } from "date-fns";
import { expect, userEvent, within } from "storybook/test";

import DateInput from "./date.component";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof DateInput>;

const initialDate = subDays(startOfDay(new Date()), 1);
const initialDateValue = format(initialDate, "dd/MM/yyyy");
const initialDateLabel = format(initialDate, "EEEE, MMMM do, yyyy");
const initialDateName = new RegExp(`^${initialDateLabel}`);

interface NavigationExampleProps {
  variant: "legacy" | "typical";
  label: string;
  name: string;
}

const NavigationExample = ({
  variant,
  label,
  name,
}: NavigationExampleProps) => {
  const [date, setDate] = useState(initialDateValue);

  return (
    <DateInput
      variant={variant}
      label={label}
      name={name}
      value={date}
      onChange={(event) => setDate(event.target.value.formattedValue)}
    />
  );
};

export default {
  title: "Date Input/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (StoryToRender: React.ComponentType) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const LegacyMonthYearNavigation: Story = {
  render: () => (
    <NavigationExample
      variant="legacy"
      label="Legacy date"
      name="date-input-legacy"
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("icon"));
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "Choose the year" }),
      format(initialDate, "yyyy"),
    );
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "Choose the month" }),
      String(initialDate.getMonth()),
    );
    await userEvent.click(
      canvas.getByRole("button", { name: initialDateName }),
    );
    await expect(canvas.getByLabelText("Legacy date")).toHaveValue(
      initialDateValue,
    );
  },
};
LegacyMonthYearNavigation.storyName = "Legacy Month/Year Navigation";

export const TypicalMonthYearNavigation: Story = {
  render: () => (
    <NavigationExample
      variant="typical"
      label="Typical date"
      name="date-input-typical"
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "calendar" }));
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "Choose the year" }),
      format(initialDate, "yyyy"),
    );
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "Choose the month" }),
      String(initialDate.getMonth()),
    );
    await userEvent.click(
      canvas.getByRole("button", { name: initialDateName }),
    );
    await expect(canvas.getByLabelText("Typical date")).toHaveValue(
      initialDateValue,
    );
  },
};
TypicalMonthYearNavigation.storyName = "Typical Month/Year Navigation";
