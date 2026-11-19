import React, { useState } from "react";
import { StoryObj, StoryFn } from "@storybook/react-vite";
import { userEvent, within, expect } from "storybook/test";

import DateRange from "./date-range.component";
import Box from "../box";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof DateRange>;

export default {
  title: "Date Range/Interactions",
  component: DateRange,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (StoryToRender: StoryFn) => (
      <DefaultDecorator>
        <Box mb="400px">
          <StoryToRender />
        </Box>
      </DefaultDecorator>
    ),
  ],
};

const initialRange = ["15/07/2025", "28/07/2025"];

const StandardDateRangeWithState = () => {
  const [dateRange, setDateRange] = useState(initialRange);

  return (
    <DateRange
      startLabel="Start date"
      endLabel="End date"
      value={dateRange}
      onChange={(e) =>
        setDateRange([
          e.target.value[0].formattedValue,
          e.target.value[1].formattedValue,
        ])
      }
    />
  );
};

const CombinedDateRangeWithState = () => {
  const [dateRange, setDateRange] = useState(initialRange);

  return (
    <Box>
      <DateRange
        rangeType="combined"
        label="Date range"
        value={dateRange}
        onChange={(e) =>
          setDateRange([
            e.target.value[0].formattedValue,
            e.target.value[1].formattedValue,
          ])
        }
      />
    </Box>
  );
};

export const StandardOneCalendarAtATime: Story = {
  render: () => <StandardDateRangeWithState />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const [startCalendarButton, endCalendarButton] = canvas.getAllByRole(
      "button",
      { name: "Open calendar" },
    );

    await userEvent.click(startCalendarButton);
    await expect(
      canvas.getByRole("button", { name: /Tuesday, 15 July 2025/ }),
    ).toBeVisible();

    await userEvent.click(endCalendarButton);
    await expect(canvas.getAllByRole("grid")).toHaveLength(1);
    await expect(
      canvas.getByRole("button", { name: /Monday, 28 July 2025/ }),
    ).toHaveFocus();
  },
};
StandardOneCalendarAtATime.storyName = "Standard - One Calendar at a Time";
StandardOneCalendarAtATime.parameters = {
  chromatic: { disableSnapshot: true },
};

export const CombinedApplyRange: Story = {
  render: () => <CombinedDateRangeWithState />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: /^Date range/ });

    await userEvent.click(trigger);
    await userEvent.click(canvas.getByRole("button", { name: /\b3 July\b/ }));
    await expect(trigger).toHaveTextContent(/^03\/07\/2025 to$/);
    await expect(canvas.getByRole("dialog")).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: /\b9 July\b/ }));
    await expect(trigger).toHaveTextContent("03/07/2025 to 09/07/2025");

    await userEvent.click(canvas.getByRole("button", { name: "Apply" }));
    await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
    await expect(trigger).toHaveTextContent("03/07/2025 to 09/07/2025");
  },
};
CombinedApplyRange.storyName = "Combined - Apply Range";
CombinedApplyRange.parameters = {
  chromatic: { disableSnapshot: true },
};

export const CombinedClearAndDiscard: Story = {
  render: () => <CombinedDateRangeWithState />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: /^Date range/ });

    await userEvent.click(trigger);
    await userEvent.click(canvas.getByRole("button", { name: "Clear" }));
    await expect(canvas.getByRole("dialog")).toBeVisible();
    await expect(trigger).not.toHaveTextContent("15/07/2025");

    await userEvent.keyboard("{Escape}");
    await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
    await expect(trigger).toHaveTextContent("15/07/2025 to 28/07/2025");
  },
};
CombinedClearAndDiscard.storyName = "Combined - Clear and Discard";
CombinedClearAndDiscard.parameters = {
  chromatic: { disableSnapshot: true },
};

export const CombinedRangeRules: Story = {
  render: () => <CombinedDateRangeWithState />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: /^Date range/ });
    const day = (name: RegExp) => canvas.getByRole("button", { name });

    await userEvent.click(trigger);

    // Clicking the start date again completes a one-day range.
    await userEvent.click(day(/20 July/));
    await userEvent.click(day(/20 July/));
    await expect(trigger).toHaveTextContent("20/07/2025 to 20/07/2025");

    // A click on a complete range starts a new range.
    await userEvent.click(day(/25 July/));
    await expect(trigger).toHaveTextContent(/^25\/07\/2025 to$/);

    // A second date before the start becomes the start, and the first date the end.
    await userEvent.click(day(/\b12 July\b/));
    await expect(trigger).toHaveTextContent("12/07/2025 to 25/07/2025");
    await expect(canvas.getByRole("dialog")).toBeVisible();
  },
};
CombinedRangeRules.storyName = "Combined - Range Rules";
CombinedRangeRules.parameters = {
  chromatic: { disableSnapshot: true },
};
