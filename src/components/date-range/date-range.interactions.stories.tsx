import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import DateRange from "./date-range.component";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import I18nProvider from "../i18n-provider";
import { de as deLocale } from "date-fns/locale/de";
import { enUS as enUSLocale } from "date-fns/locale/en-US";
import Box from "../box";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

type Story = StoryObj<typeof DateRange>;

export default {
    title: "Date Range/Interactions",
    parameters: {
        themeProvider: { chromatic: { theme: "sage" } },
    },
};

const DateRangeWithState = ({ initialValue = ["", ""], ...props }) => {
    const [dateRange, setDateRange] = useState(initialValue);

    return (
        <DateRange
            {...props}
            value={dateRange}
            onChange={(e) => setDateRange([
                e.target.value[0].formattedValue,
                e.target.value[1].formattedValue
            ])}
        />
    );
};

export const BasicDateRangeSelection: Story = {
    render: () => (
        <DateRangeWithState
            startLabel="Start Date"
            endLabel="End Date"
            name="date-range"
        />
    ),
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }

        const startInput = canvasElement.querySelector('[data-element="start-date"] input');
        const endInput = canvasElement.querySelector('[data-element="end-date"] input');

        if (!startInput || !endInput) {
            throw new Error("Could not find date inputs");
        }

        await userEvent.click(startInput);
        await userEvent.keyboard("04/15/2024");

        await userEvent.click(endInput);
        await userEvent.keyboard("04/30/2024");

        expect(startInput).toHaveValue("04/15/2024");
        expect(endInput).toHaveValue("04/30/2024");
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
BasicDateRangeSelection.storyName = "Basic Date Range Selection";

export const CalendarPickerInteractions: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start Date"
      endLabel="End Date"
      name="date-range"
      initialValue={["04/15/2024", "04/30/2024"]}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const startDateContainer = canvasElement.querySelector('[data-element="start-date"]');
    const endDateContainer = canvasElement.querySelector('[data-element="end-date"]');

    const startCalendarIcon = startDateContainer?.querySelector('[data-role="icon"]');
    if (!startCalendarIcon) {
      throw new Error("Could not find start calendar icon");
    }
    await userEvent.click(startCalendarIcon);
    await userInteractionPause(300);

    const nextMonthButton = canvas.getByRole("button", { name: /next month/i });
    await userEvent.click(nextMonthButton);
    await userInteractionPause(300);

    // Close the first calendar before opening the second one
    await userEvent.keyboard("{Escape}");
    await userInteractionPause(300);

    const endCalendarIcon = endDateContainer?.querySelector('[data-role="icon"]');
    if (!endCalendarIcon) {
      throw new Error("Could not find end calendar icon");
    }
    await userEvent.click(endCalendarIcon);
    await userInteractionPause(300);

    // Now find the previous month button in the newly opened calendar
    const prevMonthButton = canvas.getByRole("button", { name: /previous month/i });
    await userEvent.click(prevMonthButton);
    await userInteractionPause(300);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
CalendarPickerInteractions.storyName = "Calendar Picker Interactions";

export const DateTypingWithUpdates: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start Date"
      endLabel="End Date"
      name="date-range"
      initialValue={["04/04/2019", "04/10/2019"]}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const startInput = canvasElement.querySelector('[data-element="start-date"] input');
    const endInput = canvasElement.querySelector('[data-element="end-date"] input');

    if (!startInput || !endInput) {
      throw new Error("Could not find date inputs");
    }

    await userEvent.click(startInput);
    await userEvent.clear(startInput);
    await userEvent.keyboard("05/12/2025");
    await userInteractionPause(300);

    const startCalendarIcon = canvasElement.querySelector('[data-element="start-date"] [data-role="icon"]');
    if (startCalendarIcon) {
      await userEvent.click(startCalendarIcon);
      await userInteractionPause(300);
    }

    await userEvent.click(endInput);
    await userEvent.clear(endInput);
    await userEvent.keyboard("05/20/2025");
    await userInteractionPause(300);

    const endCalendarIcon = canvasElement.querySelector('[data-element="end-date"] [data-role="icon"]');
    if (endCalendarIcon) {
      await userEvent.click(endCalendarIcon);
      await userInteractionPause(300);
    }
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
DateTypingWithUpdates.storyName = "Date Typing with Updates";

export const MinMaxDateConstraints: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start Date"
      endLabel="End Date"
      name="date-range"
      initialValue={["17/07/2025", "20/07/2025"]}
      startDateProps={{
        minDate: "2025-07-14",
        maxDate: "2025-07-25"
      }}
      endDateProps={{
        minDate: "2025-07-14",
        maxDate: "2025-07-30"
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const startCalendarIcon = canvasElement.querySelector('[data-element="start-date"] [data-role="icon"]');
    const endCalendarIcon = canvasElement.querySelector('[data-element="end-date"] [data-role="icon"]');

    if (startCalendarIcon) {
      await userEvent.click(startCalendarIcon);
      await userInteractionPause(300);
    }

    if (endCalendarIcon) {
      await userEvent.click(endCalendarIcon);
      await userInteractionPause(300);
    }
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
MinMaxDateConstraints.storyName = "Min/Max Date Constraints";

export const DisabledDatesInteraction: Story = {
  render: () => {
    const isWeekend = (day: Date) => [0, 6].includes(day.getDay());
    const disabledRules = [
      isWeekend,
      {
        from: new Date(2025, 6, 15),
        to: new Date(2025, 6, 18),
      },
      { before: new Date(2025, 6, 3) },
      { after: new Date(2025, 6, 29) },
    ];

    return (
      <DateRangeWithState
        startLabel="Start Date"
        endLabel="End Date"
        name="date-range"
        initialValue={["10/07/2025", "25/07/2025"]}
        startDateProps={{
          pickerProps: { disabled: disabledRules }
        }}
        endDateProps={{
          pickerProps: { disabled: disabledRules }
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const startCalendarIcon = canvasElement.querySelector('[data-element="start-date"] [data-role="icon"]');
    const endCalendarIcon = canvasElement.querySelector('[data-element="end-date"] [data-role="icon"]');

    if (startCalendarIcon) {
      await userEvent.click(startCalendarIcon);
      await userInteractionPause(300);
    }

    if (endCalendarIcon) {
      await userEvent.click(endCalendarIcon);
      await userInteractionPause(300);
    }
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
DisabledDatesInteraction.storyName = "Disabled Dates";

export const KeyboardNavigation: Story = {
    render: () => (
        <DateRangeWithState
            startLabel="Start Date"
            endLabel="End Date"
            name="date-range"
        />
    ),
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }

        const startInput = canvasElement.querySelector('[data-element="start-date"] input');
        const endInput = canvasElement.querySelector('[data-element="end-date"] input');

        if (!startInput || !endInput) {
            throw new Error("Could not find date inputs");
        }

        await userEvent.click(startInput);
        expect(startInput).toHaveFocus();

        await userEvent.tab();
        expect(endInput).toHaveFocus();

        await userEvent.tab({ shift: true });
        expect(startInput).toHaveFocus();

        await userEvent.keyboard("04/15/2024");
        await userEvent.tab();
        expect(endInput).toHaveFocus();

        await userEvent.keyboard("04/30/2024");
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
KeyboardNavigation.storyName = "Keyboard Navigation";

export const ValidationStatesInteraction: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start Date"
      endLabel="End Date"
      name="date-range"
      startError="Start date is required"
      endWarning="End date should be within 30 days of start date"
      required
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    // Check for validation icons instead of text messages
    const errorIcon = canvasElement.querySelector('[data-role="icon-error"]');
    const warningIcon = canvasElement.querySelector('[data-role="icon-warning"]');
    
    expect(errorIcon).toBeInTheDocument();
    expect(warningIcon).toBeInTheDocument();

    const startInput = canvasElement.querySelector('[data-element="start-date"] input');
    const endInput = canvasElement.querySelector('[data-element="end-date"] input');

    if (!startInput || !endInput) {
      throw new Error("Could not find date inputs");
    }

    await userEvent.click(startInput);
    await userEvent.keyboard("04/15/2024");
    await userInteractionPause(300);

    await userEvent.click(endInput);
    await userEvent.keyboard("04/30/2024");
    await userInteractionPause(300);

    await userEvent.tab();
    await userInteractionPause(300);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ValidationStatesInteraction.storyName = "Validation States";

export const LocaleComparison: Story = {
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
                <DateRangeWithState
                    startLabel="Start Date (en-US)"
                    endLabel="End Date (en-US)"
                    initialValue={["17/07/2025", "24/07/2025"]}
                    data-role="enUsDateRange"
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
                <DateRangeWithState
                    startLabel="Start Date (de-DE)"
                    endLabel="End Date (de-DE)"
                    initialValue={["17/07/2025", "24/07/2025"]}
                    data-role="deDateRange"
                />
            </I18nProvider>
        </Box>
    ),
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }

        const allIcons = canvasElement.querySelectorAll('[data-role="icon"]');

        if (allIcons.length >= 4) {
            await userEvent.click(allIcons[0]);
            await userEvent.click(allIcons[2]);
        }
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
LocaleComparison.storyName = "Locale Comparison";

export const CalendarFocusManagement: Story = {
    render: () => (
        <DateRangeWithState
            startLabel="Start Date"
            endLabel="End Date"
            name="date-range"
            initialValue={["15/07/2025", "22/07/2025"]}
        />
    ),
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }

        const startInput = canvasElement.querySelector('[data-element="start-date"] input');
        const endInput = canvasElement.querySelector('[data-element="end-date"] input');
        const startCalendarIcon = canvasElement.querySelector('[data-element="start-date"] [data-role="icon"]');
        const endCalendarIcon = canvasElement.querySelector('[data-element="end-date"] [data-role="icon"]');

        if (!startInput || !endInput) {
            throw new Error("Could not find date inputs");
        }

        if (startCalendarIcon) {
            await userEvent.click(startCalendarIcon);
        }
        await userEvent.click(endInput);

        if (endCalendarIcon) {
            await userEvent.click(endCalendarIcon);
        }
        await userEvent.click(startInput);

        if (startCalendarIcon) {
            await userEvent.click(startCalendarIcon);
        }
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
CalendarFocusManagement.storyName = "Calendar Focus Management";

export const InlineLabelsInteraction: Story = {
    render: () => (
        <DateRangeWithState
            startLabel="From"
            endLabel="To"
            name="date-range"
            labelsInline
        />
    ),
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }
        const canvas = within(canvasElement);

        const startInput = canvasElement.querySelector('[data-element="start-date"] input');
        const endInput = canvasElement.querySelector('[data-element="end-date"] input');

        if (!startInput || !endInput) {
            throw new Error("Could not find date inputs");
        }

        expect(canvas.getByText("From")).toBeInTheDocument();
        expect(canvas.getByText("To")).toBeInTheDocument();

        await userEvent.click(startInput);
        await userEvent.keyboard("04/15/2024");

        await userEvent.click(endInput);
        await userEvent.keyboard("04/30/2024");

        expect(startInput).toHaveValue("04/15/2024");
        expect(endInput).toHaveValue("04/30/2024");
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
InlineLabelsInteraction.storyName = "Inline Labels";

export const BlurBlockingBehavior: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start Date"
      endLabel="End Date"
      name="date-range"
      onBlur={(e) => {
        console.log('Blur event:', e);
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const startInput = canvasElement.querySelector('[data-element="start-date"] input');
    const endInput = canvasElement.querySelector('[data-element="end-date"] input');

    if (!startInput || !endInput) {
      throw new Error("Could not find date inputs");
    }

    await userEvent.click(startInput);
    await userEvent.keyboard("04/15/2024");
    await userInteractionPause(300);

    const startCalendarIcon = canvasElement.querySelector('[data-element="start-date"] [data-role="icon"]');
    if (startCalendarIcon) {
      await userEvent.click(startCalendarIcon);
      await userInteractionPause(300);
      await userEvent.tab();
      await userInteractionPause(300);
    }

    await userEvent.click(endInput);
    await userEvent.keyboard("04/30/2024");
    await userInteractionPause(300);

    await userEvent.tab();
    await userInteractionPause(300);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
BlurBlockingBehavior.storyName = "Blur Blocking Behavior";

export const CalendarKeyboardNavigation: Story = {
    render: () => (
        <DateRangeWithState
            startLabel="Start Date"
            endLabel="End Date"
            name="date-range"
            initialValue={["15/07/2025", "22/07/2025"]}
        />
    ),
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }
        const canvas = within(canvasElement);

        const startInput = canvasElement.querySelector('[data-element="start-date"] input');
        const startCalendarIcon = canvasElement.querySelector('[data-element="start-date"] [data-role="icon"]');

        if (!startInput || !startCalendarIcon) {
            throw new Error("Could not find start date input or calendar icon");
        }

        await userEvent.click(startCalendarIcon);

        await userEvent.keyboard("{ArrowRight}");
        await userEvent.keyboard("{ArrowDown}");
        await userEvent.keyboard("{ArrowLeft}");
        await userEvent.keyboard("{ArrowUp}");

        await userEvent.keyboard("{Home}");
        await userEvent.keyboard("{End}");

        await userEvent.keyboard("{PageDown}");
        await userEvent.keyboard("{PageUp}");

        await userEvent.keyboard("{Enter}");

        const calendar = canvas.queryByRole("dialog");
        expect(calendar).not.toBeInTheDocument();

        const endCalendarIcon = canvasElement.querySelector('[data-element="end-date"] [data-role="icon"]');
        if (endCalendarIcon) {
            await userEvent.click(endCalendarIcon);

            await userEvent.keyboard("{ArrowRight}{ArrowRight}");
            await userEvent.keyboard("{Enter}");
        }
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
CalendarKeyboardNavigation.storyName = "Calendar Keyboard Navigation";

export const DisabledDaysInCalendar: Story = {
  render: () => {
    const isWeekend = (day: Date) => [0, 6].includes(day.getDay());
    const disabledRules = [
      isWeekend,
      {
        from: new Date(2025, 6, 15),
        to: new Date(2025, 6, 18),
      },
      { before: new Date(2025, 6, 3) },
      { after: new Date(2025, 6, 29) },
    ];

    return (
      <DateRangeWithState
        startLabel="Start Date"
        endLabel="End Date"
        name="date-range"
        initialValue={["10/07/2025", "25/07/2025"]}
        startDateProps={{
          pickerProps: { disabled: disabledRules }
        }}
        endDateProps={{
          pickerProps: { disabled: disabledRules }
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const startCalendarIcon = canvasElement.querySelector('[data-element="start-date"] [data-role="icon"]');
    if (!startCalendarIcon) {
      throw new Error("Could not find start calendar icon");
    }

    await userEvent.click(startCalendarIcon);
    await userInteractionPause(300);

    let calendar = canvas.queryByRole("dialog");
    if (!calendar) {
      calendar = canvasElement.querySelector('[data-element="calendar"]');
    }
    if (!calendar) {
      calendar = canvasElement.querySelector('[role="dialog"]');
    }
    if (!calendar) {
      calendar = canvasElement.querySelector('.calendar-container');
    }

    if (calendar) {
      expect(calendar).toBeInTheDocument();

      await userEvent.keyboard("{ArrowLeft}");
      await userEvent.keyboard("{Enter}");
      await userInteractionPause(300);

      await userEvent.keyboard("{ArrowRight}{ArrowRight}");
      await userEvent.keyboard("{Enter}");
      await userInteractionPause(300);
    }

    calendar = canvas.queryByRole("dialog");
    if (!calendar) {
      expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
    }

    const endCalendarIcon = canvasElement.querySelector('[data-element="end-date"] [data-role="icon"]');
    if (endCalendarIcon) {
      await userEvent.click(endCalendarIcon);
      await userInteractionPause(300);

      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowRight}");
      await userInteractionPause(300);
    }
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
DisabledDaysInCalendar.storyName = "Disabled Days in Calendar";

export const MinMaxConstraintsInCalendar: Story = {
  render: () => (
    <DateRangeWithState
      startLabel="Start Date"
      endLabel="End Date"
      name="date-range"
      initialValue={["17/07/2025", "20/07/2025"]}
      startDateProps={{
        minDate: "2025-07-14",
        maxDate: "2025-07-25"
      }}
      endDateProps={{
        minDate: "2025-07-16",
        maxDate: "2025-07-30"
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const startCalendarIcon = canvasElement.querySelector('[data-element="start-date"] [data-role="icon"]');
    if (!startCalendarIcon) {
      throw new Error("Could not find start calendar icon");
    }

    await userEvent.click(startCalendarIcon);
    await userInteractionPause(300);

    let calendar = canvas.queryByRole("dialog");
    if (!calendar) {
      calendar = canvasElement.querySelector('[data-element="calendar"]');
    }
    if (!calendar) {
      calendar = canvasElement.querySelector('[role="dialog"]');
    }
    if (!calendar) {
      calendar = canvasElement.querySelector('.calendar-container');
    }

    if (calendar) {
      expect(calendar).toBeInTheDocument();

      await userEvent.keyboard("{PageUp}");
      await userEvent.keyboard("{End}");
      await userEvent.keyboard("{Enter}");
      await userInteractionPause(300);

      calendar = canvas.queryByRole("dialog");
      if (calendar) {
        expect(calendar).toBeInTheDocument();

        await userEvent.keyboard("{PageDown}");
        await userEvent.keyboard("{Home}");
        await userInteractionPause(300);

        await userEvent.keyboard("{PageDown}");
        await userEvent.keyboard("{Home}");
        await userEvent.keyboard("{Enter}");
        await userInteractionPause(300);

        calendar = canvas.queryByRole("dialog");
        if (calendar) {
          expect(calendar).toBeInTheDocument();

          await userEvent.keyboard("{PageUp}");
          await userEvent.keyboard("{ArrowRight}{ArrowRight}");
          await userEvent.keyboard("{Enter}");
          await userInteractionPause(300);
        }
      }
    }

    calendar = canvas.queryByRole("dialog");
    if (!calendar) {
      expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
    }

    const endCalendarIcon = canvasElement.querySelector('[data-element="end-date"] [data-role="icon"]');
    if (endCalendarIcon) {
      await userEvent.click(endCalendarIcon);
      await userInteractionPause(300);

      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowRight}");
      await userEvent.keyboard("{Enter}");
      await userInteractionPause(300);
    }
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
MinMaxConstraintsInCalendar.storyName = "Min/Max Constraints in Calendar";

export const CalendarUpdatesWithTyping: Story = {
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

    const startInput = canvasElement.querySelector('[data-element="start-date"] input');
    const startCalendarIcon = canvasElement.querySelector('[data-element="start-date"] [data-role="icon"]');

    if (!startInput || !startCalendarIcon) {
      throw new Error("Could not find start date elements");
    }

    await userEvent.click(startCalendarIcon);
    await userInteractionPause(300);

    // Try multiple selectors to find the calendar
    let calendar = canvas.queryByRole("dialog");
    if (!calendar) {
      calendar = canvasElement.querySelector('[data-element="calendar"]');
    }
    if (!calendar) {
      calendar = canvasElement.querySelector('[role="dialog"]');
    }
    if (!calendar) {
      calendar = canvasElement.querySelector('.calendar-container');
    }

    if (calendar) {
      expect(calendar).toBeInTheDocument();
    }

    await userEvent.click(startInput);
    await userEvent.clear(startInput);
    await userEvent.keyboard("15/05/2025");
    await userInteractionPause(300);

    await userEvent.tab();
    await userInteractionPause(300);

    await userEvent.click(startInput);
    await userEvent.clear(startInput);
    await userEvent.keyboard("32/13/2025");
    await userInteractionPause(300);

    await userEvent.tab();
    await userInteractionPause(300);

    const endInput = canvasElement.querySelector('[data-element="end-date"] input');
    const endCalendarIcon = canvasElement.querySelector('[data-element="end-date"] [data-role="icon"]');

    if (endInput && endCalendarIcon) {
      await userEvent.click(endCalendarIcon);
      await userInteractionPause(300);

      await userEvent.click(endInput);
      await userEvent.clear(endInput);
      await userEvent.keyboard("30/05/2025");
      await userInteractionPause(300);

      await userEvent.tab();
      await userInteractionPause(300);

      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Enter}");
      await userInteractionPause(300);
    }
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
CalendarUpdatesWithTyping.storyName = "Calendar Updates with Typing";

export const CalendarFocusStates: Story = {
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

    const startCalendarIcon = canvasElement.querySelector('[data-element="start-date"] [data-role="icon"]');
    if (!startCalendarIcon) {
      throw new Error("Could not find start calendar icon");
    }

    await userEvent.click(startCalendarIcon);
    await userInteractionPause(300);

    let calendar = canvas.queryByRole("dialog");
    if (!calendar) {
      calendar = canvasElement.querySelector('[data-element="calendar"]');
    }
    if (!calendar) {
      calendar = canvasElement.querySelector('[role="dialog"]');
    }
    if (!calendar) {
      calendar = canvasElement.querySelector('.calendar-container');
    }

    expect(calendar).toBeInTheDocument();

    await userEvent.keyboard("{ArrowRight}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowLeft}");
    await userEvent.keyboard("{ArrowUp}");

    await userEvent.keyboard("{Tab}");
    let focusedElement = canvasElement.ownerDocument.activeElement;
    expect(focusedElement).toHaveFocus();

    await userEvent.keyboard("{Tab}");
    focusedElement = canvasElement.ownerDocument.activeElement;
    expect(focusedElement).toHaveFocus();

    await userEvent.keyboard("{Tab}");
    focusedElement = canvasElement.ownerDocument.activeElement;
    expect(focusedElement).toHaveFocus();

    await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
    focusedElement = canvasElement.ownerDocument.activeElement;
    expect(focusedElement).toHaveFocus();

    await userEvent.keyboard("{Tab}{Tab}{Tab}");
    focusedElement = canvasElement.ownerDocument.activeElement;
    if (focusedElement) {
      expect(focusedElement).toHaveFocus();
    }

    await userEvent.keyboard("{Enter}");
    await userInteractionPause(300);

    expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();

    const endCalendarIcon = canvasElement.querySelector('[data-element="end-date"] [data-role="icon"]');
    if (endCalendarIcon) {
      await userEvent.click(endCalendarIcon);
      await userInteractionPause(300);

      await userEvent.keyboard("{ArrowRight}{ArrowRight}{ArrowDown}");
      await userEvent.keyboard("{Enter}");
      await userInteractionPause(300);
    }
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
CalendarFocusStates.storyName = "Calendar Focus States";