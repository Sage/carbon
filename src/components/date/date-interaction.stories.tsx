import React, { useState } from "react";

import { action } from "storybook/actions";
import { StoryObj } from "@storybook/react-vite";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { expect, userEvent, within } from "storybook/test";

import DateInput from "./date.component";
import Box from "../box";
import Typography from "../typography";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof DateInput>;

const initialDate = new Date(2026, 9, 7);
const initialDateValue = "07/10/2026";
const initialDateName = new RegExp(
  `^${format(initialDate, "EEEE, MMMM do, yyyy")}`,
);

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
    await userEvent.click(
      canvas.getByRole("button", { name: "Open calendar" }),
    );
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

export const OnDayClickOverrideRegression: Story = {
  render: () => {
    const [value, setValue] = useState("15/07/2026");

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap="var(--global-space-layout-xs)"
      >
        <Typography variant="p">
          Regression check: custom pickerProps.onDayClick updates the input, and
          the picker remains open instead of auto-closing.
        </Typography>
        <DateInput
          variant="typical"
          label="Date"
          name="custom-on-day-click-override"
          value={value}
          onChange={(event) => setValue(event.target.value.formattedValue)}
          pickerProps={{
            locale: enUS,
            onDayClick: (day, modifiers, event) => {
              action("pickerProps.onDayClick")(day, modifiers, event);
              if (day) setValue(format(day, "MM/dd/yyyy", { locale: enUS }));
            },
          }}
        />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Open calendar" }),
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Thursday, July 16th, 2026" }),
    );

    await expect(canvas.getByRole("textbox", { name: "Date" })).toHaveValue(
      "07/16/2026",
    );
    await expect(canvas.getByRole("grid")).toBeVisible();
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "Verifies the custom `pickerProps.onDayClick` override path: selecting a day updates the input via the custom handler, and the calendar remains open (default close-on-select behavior is intentionally bypassed). This guards against regressions where the built-in handler is called instead of the override.",
      },
    },
  },
};
OnDayClickOverrideRegression.storyName = "Regression - Custom onDayClick";
