import React, { useState } from "react";

import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import DateInput from "./date.component";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

import I18nProvider from "../i18n-provider";
import { de as deLocale } from "date-fns/locale/de";
import { enUS as enUSLocale } from "date-fns/locale/en-US";

import Box from "../box";

type Story = StoryObj<typeof DateInput>;

export default {
  title: "Date Input/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const MonthYearNavigation: Story = {
  render: () => (
    <DateInput
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
MonthYearNavigation.storyName = "Month/Year Navigation";

const DateInputWithTyping = () => {
  const [date, setDate] = useState("04/04/2019");

  return (
    <DateInput
      label="Date"
      name="date-input"
      value={date}
      onChange={(e) => setDate(e.target.value.formattedValue)}
    />
  );
};

export const DateTyping: Story = {
  render: () => <DateInputWithTyping />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.keyboard("05/12/2025");
    const calendarIcon = canvas.getByTestId("icon");
    await userEvent.click(calendarIcon);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
DateTyping.storyName = "Date Typing";

export const MinMaxDate: Story = {
  render: () => (
    <DateInput
      label="Date"
      name="date-input"
      value="17/07/2025"
      onChange={() => {}}
      minDate="2025-07-14"
      maxDate="2025-07-20"
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const calendarIcon = canvas.getByTestId("icon");
    await userEvent.click(calendarIcon);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
MinMaxDate.storyName = "Min/Max Date";

export const DisabledDate: Story = {
  render: () => {
    const isWeekend = (day: Date) => [0, 6].includes(day.getDay());
    return (
      <DateInput
        label="Date"
        name="date-input"
        value="10/07/2025"
        onChange={() => {}}
        pickerProps={{
          disabled: [
            isWeekend,
            {
              from: new Date(2025, 6, 15),
              to: new Date(2025, 6, 18),
            },
            { before: new Date(2025, 6, 3) },
            { after: new Date(2025, 6, 29) },
          ],
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const calendarIcon = canvas.getByTestId("icon");
    await userEvent.click(calendarIcon);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
DisabledDate.storyName = "Disabled Dates";

export const WeekStartDay: Story = {
  render: () => (
    <Box display="flex" justifyContent="space-around">
      <I18nProvider
        locale={{
          locale: () => "en-US",
          date: {
            dateFnsLocale: () => enUSLocale,
            ariaLabels: {
              previousMonthButton: () => "en-US-previous",
              nextMonthButton: () => "en-US-next",
            },
          },
        }}
      >
        <DateInput
          label="`en-US` locale - First week day: Sunday"
          value="17/07/2025"
          onChange={() => {}}
          data-role="enUsDate"
        />
      </I18nProvider>
      <I18nProvider
        locale={{
          locale: () => "de",
          date: {
            dateFnsLocale: () => deLocale,
            ariaLabels: {
              previousMonthButton: () => "de-DE-previous",
              nextMonthButton: () => "de-DE-next",
            },
          },
        }}
      >
        <DateInput
          label="`de-DE` locale - first week day: Monday"
          value="17/07/2025"
          onChange={() => {}}
          data-role="deDate"
        />
      </I18nProvider>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const [firstIcon, secondIcon] =
      canvasElement.querySelectorAll('[data-role="icon"]');
    await userEvent.click(firstIcon);
    await userEvent.click(secondIcon);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
WeekStartDay.storyName = "Week Start Day";
