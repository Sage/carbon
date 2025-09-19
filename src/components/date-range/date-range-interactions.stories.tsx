import React, { useState } from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import DateRange from "./date-range.component";
import Box from "../box";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";
import I18nProvider from "../i18n-provider";
import { de as deLocale } from "date-fns/locale/de";
import { enUS as enUSLocale } from "date-fns/locale/en-US";

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
        <Box mb="150px">
          <StoryToRender />
        </Box>
      </DefaultDecorator>
    ),
  ],
};

const DateRangeWithState = ({ initialValue = ["", ""], ...props }) => {
  const [dateRange, setDateRange] = useState(initialValue);

  return (
    <DateRange
      {...props}
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

export const DefaultDateRange: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start Date"
      endLabel="End Date"
      name="date-range"
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const startInput = canvas.getByRole("textbox", { name: /start date/i });
    const endInput = canvas.getByRole("textbox", { name: /end date/i });

    await userEvent.click(startInput);
    await userInteractionPause(80);
    await userEvent.keyboard("04/15/2024");
    await userInteractionPause(120);

    await userEvent.click(endInput);
    await userInteractionPause(80);
    await userEvent.keyboard("04/30/2024");
    await userInteractionPause(200);

    expect((startInput as HTMLInputElement).value).toBe("04/15/2024");
    expect((endInput as HTMLInputElement).value).toBe("04/30/2024");
  },
};

export const InlineLabelsDateRange: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="From"
      endLabel="To"
      name="date-range"
      labelsInline
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const startInput = canvas.getByRole("textbox", { name: /from/i });
    const endInput = canvas.getByRole("textbox", { name: /to/i });

    await userEvent.click(startInput);
    await userEvent.keyboard("05/01/2025");
    await userInteractionPause(150);

    await userEvent.click(endInput);
    await userEvent.keyboard("05/12/2025");
    await userInteractionPause(200);

    expect((startInput as HTMLInputElement).value).toBe("05/01/2025");
    expect((endInput as HTMLInputElement).value).toBe("05/12/2025");
  },
};

export const MinMaxDateRange: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start Date"
      endLabel="End Date"
      name="date-range"
      initialValue={["17/07/2025", "20/07/2025"]}
      startDateProps={{ minDate: "2025-07-14", maxDate: "2025-07-25" }}
      endDateProps={{ minDate: "2025-07-14", maxDate: "2025-07-30" }}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const [startIcon, endIcon] = canvas.getAllByTestId("icon");
    const startInput = canvas.getByRole("textbox", { name: /start date/i });
    const endInput = canvas.getByRole("textbox", { name: /end date/i });

    await userEvent.click(startIcon);
    await userInteractionPause(200);
    await userEvent.keyboard("{PageUp}{End}{Enter}");
    await userInteractionPause(250);
    expect((startInput as HTMLInputElement).value).toBe("17/07/2025");

    await userEvent.click(endIcon);
    await userInteractionPause(200);
    await userEvent.keyboard("{PageDown}{Home}{Enter}");
    await userInteractionPause(250);
    expect((endInput as HTMLInputElement).value).toBe("20/07/2025");
  },
};

export const DisabledDaysDateRange: Story = {
  render: () => {
    const isWeekend = (day: Date) => [0, 6].includes(day.getDay());
    const disabledRules = [
      isWeekend,
      { from: new Date(2025, 6, 15), to: new Date(2025, 6, 18) },
      { before: new Date(2025, 6, 3) },
      { after: new Date(2025, 6, 29) },
    ];
    return (
      <DateRangeWithState
        startLabel="Start Date"
        endLabel="End Date"
        name="date-range"
        initialValue={["10/07/2025", "25/07/2025"]}
        startDateProps={{ pickerProps: { disabled: disabledRules } }}
        endDateProps={{ pickerProps: { disabled: disabledRules } }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const [startIcon, endIcon] = canvas.getAllByTestId("icon");

    await userEvent.click(startIcon);
    await userInteractionPause(300);
    await userEvent.keyboard("{ArrowLeft}{Enter}");
    await userInteractionPause(250);

    await userEvent.click(endIcon);
    await userInteractionPause(300);
    await userEvent.keyboard("{ArrowRight}{ArrowDown}");
    await userInteractionPause(250);
  },
};

export const FocusStateDateRange: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start Date"
      endLabel="End Date"
      name="date-range"
      initialValue={["15/07/2025", "22/07/2025"]}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const [startIcon] = canvas.getAllByTestId("icon");
    await userEvent.click(startIcon);
    await userInteractionPause(250);

    const selectedDayBtn = canvas.getByRole("button", { name: /selected$/i });

    const doc = canvasElement.ownerDocument as Document;
    for (let i = 0; i < 6 && doc.activeElement !== selectedDayBtn; i += 1) {
      await userEvent.tab();
      await userInteractionPause(60);
    }

    if (doc.activeElement !== selectedDayBtn) {
      (selectedDayBtn as HTMLElement).focus();
      await userInteractionPause(60);
    }

    expect(selectedDayBtn).toHaveFocus();
  },
};

export const LocaleEnUSDateRange: Story = {
  render: () => (
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
      <DateRangeWithState
        startLabel="Start Date (en-US)"
        endLabel="End Date (en-US)"
        initialValue={["07/17/2025", "07/24/2025"]}
        data-role="enUsDateRange"
      />
    </I18nProvider>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);

    const startInput = canvas.getByRole("textbox", {
      name: /start date \(en-us\)/i,
    });
    const endInput = canvas.getByRole("textbox", {
      name: /end date \(en-us\)/i,
    });

    await userEvent.clear(startInput);
    await userEvent.keyboard("08/05/2025");
    await userInteractionPause(150);

    await userEvent.clear(endInput);
    await userEvent.keyboard("08/12/2025");
    await userInteractionPause(150);

    expect((startInput as HTMLInputElement).value).toBe("08/05/2025");
    expect((endInput as HTMLInputElement).value).toBe("08/12/2025");
  },
};

export const LocaleDeDateRange: Story = {
  render: () => (
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
      <DateRangeWithState
        startLabel="Start Date (de-DE)"
        endLabel="End Date (de-DE)"
        initialValue={["17/07/2025", "24/07/2025"]}
        data-role="deDateRange"
      />
    </I18nProvider>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const [startIcon] = canvas.getAllByTestId("icon");
    await userEvent.click(startIcon);
    await userInteractionPause(300);

    const prevMonth = canvas.getByRole("button", { name: /de-DE-previous/i });
    await userEvent.click(prevMonth);
    await userInteractionPause(300);
  },
};

export const TypingSyncDateRange: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start Date"
      endLabel="End Date"
      name="date-range"
      initialValue={["15/07/2025", "22/07/2025"]}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);

    const [startIcon] = canvas.getAllByTestId("icon");
    await userEvent.click(startIcon);
    await userInteractionPause(250);

    const startInput = canvas.getByRole("textbox", { name: /start date/i });
    await userEvent.clear(startInput);
    await userEvent.type(startInput, "05/05/2022");
    await userInteractionPause(300);

    const caption = canvas.getByRole("status");
    expect(caption).toHaveTextContent(/May 2022/i);
  },
};

export const ValidationDateRange: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start"
      endLabel="End"
      name="date-range"
      startError="Required"
      endWarning="End Warning"
      startInfo="Legacy info"
      initialValue={["15/07/2025", "22/07/2025"]}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const portal = within(document.body);

    const errorIcon = canvas.getByTestId("icon-error");
    const warningIcon = canvas.getByTestId("icon-warning");

    await userEvent.hover(errorIcon);
    expect(await portal.findByText(/required/i)).toBeInTheDocument();

    await userEvent.unhover(errorIcon);
    await userEvent.hover(warningIcon);
    expect(await portal.findByText(/end warning/i)).toBeInTheDocument();

    const startInput = canvas.getByRole("textbox", { name: /start/i });
    expect(startInput).toHaveAttribute("aria-invalid", "true");
  },
};

export const MonthYearNavigationDateRange: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start"
      endLabel="End"
      initialValue={["15/07/2025", "22/07/2025"]}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const c = within(canvasElement);
    const [startIcon] = c.getAllByTestId("icon");
    await userEvent.click(startIcon);
    const next = c.getByRole("button", { name: /next month/i });
    await userEvent.click(next);
    await userInteractionPause(200);
  },
};

export const AllowEmptyDateRange: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start Date"
      endLabel="End Date"
      name="date-range"
      initialValue={["", ""]}
      startDateProps={{ allowEmptyValue: true }}
      endDateProps={{ allowEmptyValue: true }}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const c = within(canvasElement);
    const start = c.getByRole("textbox", { name: /start date/i });
    const end = c.getByRole("textbox", { name: /end date/i });
    await userEvent.click(start);
    await userEvent.clear(start);
    await userInteractionPause(150);
    await userEvent.click(end);
    await userEvent.clear(end);
    await userInteractionPause(150);
    expect((start as HTMLInputElement).value).toBe("");
    expect((end as HTMLInputElement).value).toBe("");
  },
};
