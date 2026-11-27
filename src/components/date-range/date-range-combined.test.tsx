import React, { useState } from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { de } from "date-fns/locale/de";

import DateRange, {
  CombinedDateRangeProps,
  DateRangeChangeEvent,
} from "./date-range.component";
import Fieldset from "../fieldset";
import I18nProvider from "../i18n-provider";
import LocaleContext from "../../__internal__/i18n-context";
import enGB from "../../locales/en-gb";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import { Tabs, Tab, TabList, TabPanel } from "../tabs/__next__";

type StatefulProps = Partial<Omit<CombinedDateRangeProps, "rangeType">> & {
  initialValue?: string[];
};

const CombinedWithState = ({
  initialValue = ["", ""],
  onChange,
  ...props
}: StatefulProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <DateRange
      rangeType="combined"
      label="Date range"
      value={value}
      onChange={(ev) => {
        setValue([
          ev.target.value[0].formattedValue,
          ev.target.value[1].formattedValue,
        ]);
        onChange?.(ev);
      }}
      {...props}
    />
  );
};

const empty = { formattedValue: "", rawValue: "" };
const july15 = { formattedValue: "15/07/2025", rawValue: "2025-07-15" };
const july28 = { formattedValue: "28/07/2025", rawValue: "2025-07-28" };
const rangeEvent = (
  start: DateRangeChangeEvent["target"]["value"][0],
  end: DateRangeChangeEvent["target"]["value"][1],
  extra: Partial<DateRangeChangeEvent["target"]> = {},
) => ({ target: { ...extra, value: [start, end] } });

const getTrigger = () => screen.getByRole("combobox", { name: /^Date range/ });
const getDay = (name: RegExp) => screen.getByRole("button", { name });
const getStatus = () => screen.getByRole("status");

beforeAll(() => {
  jest.useFakeTimers({ now: new Date(2025, 6, 10) });
});

afterEach(() => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
});

afterAll(() => {
  jest.useRealTimers();
});

const setup = () =>
  userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

testStyledSystemMargin(
  (props) => (
    <DateRange
      rangeType="combined"
      label="Date range"
      data-role="date-range"
      value={["", ""]}
      onChange={() => {}}
      {...props}
    />
  ),
  () => screen.getByTestId("date-range"),
);

describe("trigger", () => {
  it("renders a button combobox named by the label alone when empty", () => {
    render(<CombinedWithState />);

    const trigger = getTrigger();
    expect(trigger).toHaveAttribute("type", "button");
    expect(trigger).toHaveAccessibleName("Date range");
    expect(trigger).toHaveTextContent(/^$/);
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).not.toHaveAttribute("aria-controls");
    expect(trigger).toHaveAttribute("aria-invalid", "false");
    expect(trigger).not.toBeRequired();
    expect(trigger).toHaveAttribute("data-element", "trigger");
  });

  it("puts the id on the trigger and associates the label with it", () => {
    render(<CombinedWithState id="booking" />);

    expect(getTrigger()).toHaveAttribute("id", "booking");
    expect(screen.getByText("Date range")).toHaveAttribute("for", "booking");
  });

  it("sets data-component on the root and supports data tags", () => {
    render(<CombinedWithState data-element="foo" data-role="bar" />);

    const root = screen.getByTestId("bar");
    expect(root).toHaveAttribute("data-component", "date-range");
    expect(root).toHaveAttribute("data-element", "foo");
  });

  it.each([
    [["15/07/2025", "28/07/2025"], "15/07/2025 to 28/07/2025"],
    [["2025-07-15", "2025-07-28"], "15/07/2025 to 28/07/2025"],
    [["15/07/2025", ""], "15/07/2025 to"],
    [["", "28/07/2025"], "to 28/07/2025"],
    [["foo", "28/07/2025"], "foo to 28/07/2025"],
    [["28/07/2025", "15/07/2025"], "28/07/2025 to 15/07/2025"],
  ])("shows the value %j as %s", (initialValue, text) => {
    render(<CombinedWithState initialValue={initialValue} />);

    expect(getTrigger()).toHaveTextContent(text);
    expect(getTrigger()).toHaveAccessibleName(`Date range ${text}`);
  });

  it("treats missing value entries as empty", () => {
    render(
      <DateRange
        rangeType="combined"
        label="Date range"
        value={[]}
        onChange={() => {}}
      />,
    );

    expect(getTrigger()).toHaveAccessibleName("Date range");
  });

  it("follows dateFormatOverride and the locale's range text", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: {
            dateFnsLocale: () => de,
            rangeText: (start, end) => `Von ${start} bis ${end}`,
            ariaLabels: {
              previousMonthButton: () => "Vorheriger Monat",
              nextMonthButton: () => "Nächster Monat",
            },
          },
        }}
      >
        <CombinedWithState
          initialValue={["2025-07-15", "2025-07-28"]}
          dateFormatOverride="yyyy/MM/dd"
        />
      </I18nProvider>,
    );

    expect(getTrigger()).toHaveTextContent("Von 2025/07/15 bis 2025/07/28");
  });

  it("links the hint and validation message with aria-describedby", () => {
    render(
      <CombinedWithState inputHint="Pick two dates" error="Select a range" />,
    );

    expect(getTrigger()).toHaveAccessibleDescription(
      "Pick two dates Select a range",
    );
    expect(getTrigger()).toHaveAttribute("aria-invalid", "true");
  });

  it("shows a warning message without marking the trigger invalid", () => {
    render(<CombinedWithState warning="Check the dates" />);

    expect(screen.getByText("Check the dates")).toBeVisible();
    expect(getTrigger()).toHaveAttribute("aria-invalid", "false");
    expect(getTrigger()).toHaveAccessibleDescription("Check the dates");
  });

  it("marks the trigger invalid without a message when error is true", () => {
    render(<CombinedWithState error />);

    expect(getTrigger()).toHaveAttribute("aria-invalid", "true");
    expect(getTrigger()).not.toHaveAttribute("aria-describedby");
  });

  it("renders the field in the order label, hint, message, then trigger", () => {
    render(<CombinedWithState inputHint="Hint" error="Error" />);

    const hint = screen.getByText("Hint");
    const message = screen.getByText("Error");
    const follows = (a: Node, b: Node) =>
      !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);

    expect(follows(screen.getByText("Date range"), hint)).toBe(true);
    expect(follows(hint, message)).toBe(true);
    expect(follows(message, getTrigger())).toBe(true);
  });

  it("marks the label and trigger as required", () => {
    render(<CombinedWithState required />);

    expect(getTrigger()).toHaveAttribute("aria-required", "true");
    expect(screen.getByText("Date range")).toHaveAttribute(
      "data-element",
      "label",
    );
  });

  it("does not open when disabled", async () => {
    const user = setup();
    render(<CombinedWithState disabled />);

    expect(getTrigger()).toBeDisabled();
    await user.click(getTrigger());

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports triggerRef", () => {
    const ref = { current: null };
    render(<CombinedWithState triggerRef={ref} />);

    expect(ref.current).toBe(getTrigger());
  });
});

describe("calendar", () => {
  it("opens one range calendar named by the label, with Clear and Apply and no Close", async () => {
    const user = setup();
    render(<CombinedWithState />);

    await user.click(getTrigger());

    const dialog = screen.getByRole("dialog", { name: "Date range" });
    expect(dialog).not.toHaveAttribute("aria-label");
    expect(dialog).not.toHaveAttribute("aria-modal");
    expect(dialog).toHaveAccessibleDescription(
      "Use the arrow keys to move between dates and press Enter or Space to select a start date and an end date.",
    );
    expect(getTrigger()).toHaveAttribute("aria-expanded", "true");
    expect(getTrigger()).toHaveAttribute("aria-controls", dialog.id);
    expect(screen.getByRole("button", { name: "Clear" })).toHaveAttribute(
      "type",
      "button",
    );
    expect(screen.getByRole("button", { name: "Apply" })).toHaveAttribute(
      "data-element",
      "apply",
    );
    expect(screen.getByRole("button", { name: "Clear" })).toHaveAttribute(
      "data-element",
      "clear",
    );
    expect(
      screen.queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
    expect(getStatus()).toHaveAttribute("aria-live", "polite");
  });

  it("shows the start date's month on opening", async () => {
    const user = setup();
    render(<CombinedWithState initialValue={["15/03/2024", "28/03/2024"]} />);

    await user.click(getTrigger());

    expect(screen.getByRole("grid")).toHaveAccessibleName("March 2024");
  });

  it("shows the valid date's month when the start is not a valid date", async () => {
    const user = setup();
    render(<CombinedWithState initialValue={["foo", "28/03/2024"]} />);

    await user.click(getTrigger());

    expect(screen.getByRole("grid")).toHaveAccessibleName("March 2024");
    expect(getDay(/28 March 2024/)).toHaveAccessibleName(/selected$/);
  });

  it("shows today's month on opening with no value, after navigating elsewhere earlier", async () => {
    const user = setup();
    render(<CombinedWithState />);

    await user.click(getTrigger());
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Choose the month" }),
      "0",
    );
    expect(screen.getByRole("grid")).toHaveAccessibleName("January 2025");
    await user.click(getTrigger());
    await user.click(getTrigger());

    expect(screen.getByRole("grid")).toHaveAccessibleName("July 2025");
  });

  it("closes when the trigger is clicked again", async () => {
    const user = setup();
    render(<CombinedWithState />);

    await user.click(getTrigger());
    await user.click(getTrigger());

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(getTrigger()).toHaveAttribute("aria-expanded", "false");
  });

  // A plain click event, unlike userEvent, doesn't focus the button, as in Safari.
  it("returns focus to the trigger when it is clicked again without focusing it", async () => {
    const user = setup();
    render(<CombinedWithState initialValue={["15/07/2025", ""]} />);

    await user.click(getTrigger());
    expect(getDay(/15 July 2025/)).toHaveFocus();
    fireEvent.click(getTrigger());

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(getTrigger()).toHaveFocus();
  });
});

describe("date names", () => {
  it("uses the date names given in pickerProps", async () => {
    const user = setup();
    render(
      <CombinedWithState
        pickerProps={{ labels: { labelDayButton: () => "Custom name" } }}
      />,
    );

    await user.click(getTrigger());

    expect(
      screen.getAllByRole("button", { name: "Custom name" }).length,
    ).toBeGreaterThan(0);
  });
});

describe("selection", () => {
  it("composes pickerProps.onDayClick with range selection", async () => {
    const user = setup();
    const onDayClick = jest.fn();
    const onChange = jest.fn();
    render(
      <CombinedWithState onChange={onChange} pickerProps={{ onDayClick }} />,
    );

    await user.click(getTrigger());
    await user.click(getDay(/15 July 2025/));

    expect(onDayClick).toHaveBeenCalledTimes(1);
    expect(getTrigger()).toHaveTextContent("15/07/2025 to");
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onChange).toHaveBeenCalledWith(rangeEvent(july15, empty));
  });

  it("combines custom disabled dates with minDate and maxDate", async () => {
    const user = setup();
    render(
      <CombinedWithState
        minDate="2025-07-05"
        maxDate="2025-07-25"
        pickerProps={{ disabled: new Date(2025, 6, 20) }}
      />,
    );

    await user.click(getTrigger());

    expect(getDay(/Friday, 4 July 2025/)).toBeDisabled();
    expect(getDay(/Sunday, 20 July 2025/)).toBeDisabled();
    expect(getDay(/Saturday, 26 July 2025/)).toBeDisabled();
    expect(getDay(/Tuesday, 15 July 2025/)).toBeEnabled();
  });

  it("walks through the flow: start, end, then Apply fires onChange", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(<CombinedWithState name="booking" id="dates" onChange={onChange} />);

    await user.click(getTrigger());
    await user.click(getDay(/15 July 2025/));

    expect(getTrigger()).toHaveTextContent("15/07/2025 to");
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(getStatus()).toHaveTextContent(
      "Start date Tuesday, 15 July 2025. Choose an end date.",
    );

    await user.click(getDay(/28 July 2025/));

    expect(getTrigger()).toHaveTextContent("15/07/2025 to 28/07/2025");
    expect(getStatus()).toHaveTextContent(
      "Selected Tuesday, 15 July 2025 to Monday, 28 July 2025, 14 days.",
    );
    expect(onChange).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      rangeEvent(july15, july28, { name: "booking", id: "dates" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(getTrigger()).toHaveTextContent("15/07/2025 to 28/07/2025");
    expect(getTrigger()).toHaveFocus();
  });

  it("completes a one-day range when the start date is clicked again", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(
      <CombinedWithState
        initialValue={["15/07/2025", ""]}
        onChange={onChange}
      />,
    );

    await user.click(getTrigger());
    await user.click(getDay(/15 July 2025/));

    expect(getStatus()).toHaveTextContent(
      "Selected Tuesday, 15 July 2025 to Tuesday, 15 July 2025, 1 day.",
    );
    await user.click(screen.getByRole("button", { name: "Apply" }));
    expect(onChange).toHaveBeenCalledWith(rangeEvent(july15, july15));
  });

  it("makes the earlier date the start when the second click is before the start", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(
      <CombinedWithState
        initialValue={["28/07/2025", ""]}
        onChange={onChange}
      />,
    );

    await user.click(getTrigger());
    await user.click(getDay(/15 July 2025/));
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onChange).toHaveBeenCalledWith(rangeEvent(july15, july28));
  });

  it("starts a new range when a date is clicked after a complete range", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(
      <CombinedWithState
        initialValue={["01/07/2025", "28/07/2025"]}
        onChange={onChange}
      />,
    );

    await user.click(getTrigger());
    await user.click(getDay(/15 July 2025/));

    expect(getTrigger()).toHaveTextContent(/^15\/07\/2025 to$/);
    await user.click(screen.getByRole("button", { name: "Apply" }));
    expect(onChange).toHaveBeenCalledWith(rangeEvent(july15, empty));
  });

  it("starts a new range when the start is not a valid date", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(
      <CombinedWithState
        initialValue={["", "28/07/2025"]}
        onChange={onChange}
      />,
    );

    await user.click(getTrigger());
    await user.click(getDay(/15 July 2025/));
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onChange).toHaveBeenCalledWith(rangeEvent(july15, empty));
  });

  it("allows a range over disabled dates, but not a disabled start or end", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(
      <CombinedWithState
        initialValue={["15/07/2025", ""]}
        onChange={onChange}
        pickerProps={{
          disabled: { from: new Date(2025, 6, 20), to: new Date(2025, 6, 22) },
        }}
      />,
    );

    await user.click(getTrigger());
    expect(getDay(/Monday, 21 July 2025/)).toBeDisabled();
    await user.click(getDay(/28 July 2025/));
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onChange).toHaveBeenCalledWith(rangeEvent(july15, july28));
  });

  it("disables dates outside minDate and maxDate", async () => {
    const user = setup();
    render(<CombinedWithState minDate="2025-07-05" maxDate="2025-07-25" />);

    await user.click(getTrigger());

    expect(getDay(/Friday, 4 July 2025/)).toBeDisabled();
    expect(getDay(/Saturday, 26 July 2025/)).toBeDisabled();
    expect(getDay(/Tuesday, 15 July 2025/)).toBeEnabled();
  });

  it("shows an invalid value as given and reports it with rawValue null", async () => {
    const user = setup();
    const onBlur = jest.fn();
    render(
      <>
        <CombinedWithState
          initialValue={["foo", "28/07/2025"]}
          onBlur={onBlur}
        />
        <button type="button">Next</button>
      </>,
    );

    expect(getTrigger()).toHaveTextContent("foo to 28/07/2025");
    await user.tab();
    await user.tab();

    expect(onBlur).toHaveBeenCalledWith(
      rangeEvent({ formattedValue: "foo", rawValue: null }, july28),
    );
  });

  it("shows an end before the start as given, without changing it", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(
      <CombinedWithState
        initialValue={["28/07/2025", "15/07/2025"]}
        onChange={onChange}
      />,
    );

    expect(getTrigger()).toHaveTextContent("28/07/2025 to 15/07/2025");
    await user.click(getTrigger());
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onChange).not.toHaveBeenCalled();
    expect(getTrigger()).toHaveTextContent("28/07/2025 to 15/07/2025");
  });

  it("shows only an end date as 'to' and the date", () => {
    render(<CombinedWithState initialValue={["", "28/07/2025"]} />);

    expect(getTrigger()).toHaveTextContent(/^to 28\/07\/2025$/);
  });
});

describe("Clear and Apply", () => {
  it("Clear empties the draft and keeps the calendar open without firing onChange", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(
      <CombinedWithState
        initialValue={["15/07/2025", "28/07/2025"]}
        onChange={onChange}
      />,
    );

    await user.click(getTrigger());
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(getTrigger()).toHaveAccessibleName("Date range");
    expect(getStatus()).toHaveTextContent(/^$/);

    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onChange).toHaveBeenCalledWith(rangeEvent(empty, empty));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not fire onChange on Apply when the value did not change", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(
      <CombinedWithState
        initialValue={["2025-07-15", "2025-07-28"]}
        onChange={onChange}
      />,
    );

    await user.click(getTrigger());
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(getTrigger()).toHaveFocus();
  });

  it("closes and fires onChange with a partial range on Apply with only a start date", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(<CombinedWithState onChange={onChange} />);

    await user.click(getTrigger());
    await user.click(getDay(/15 July 2025/));
    const apply = screen.getByRole("button", { name: "Apply" });
    expect(apply).not.toHaveAttribute("aria-disabled");
    await user.click(apply);

    expect(onChange).toHaveBeenCalledWith(rangeEvent(july15, empty));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(getTrigger()).toHaveTextContent(/^15\/07\/2025 to$/);
    expect(getTrigger()).not.toHaveAttribute("aria-invalid", "true");
  });
});

describe("closing without Apply", () => {
  it.each([
    [
      "Escape",
      async (user: ReturnType<typeof setup>) => user.keyboard("{Escape}"),
    ],
    [
      "clicking the trigger",
      async (user: ReturnType<typeof setup>) => user.click(getTrigger()),
    ],
  ])("discards the draft without firing onChange on %s", async (_, close) => {
    const user = setup();
    const onChange = jest.fn();
    render(
      <CombinedWithState
        initialValue={["01/07/2025", "05/07/2025"]}
        onChange={onChange}
      />,
    );

    await user.click(getTrigger());
    await user.click(getDay(/15 July 2025/));
    expect(getTrigger()).toHaveTextContent(/^15\/07\/2025 to$/);
    await close(user);

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(getTrigger()).toHaveTextContent("01/07/2025 to 05/07/2025");
    expect(getTrigger()).toHaveFocus();
  });

  it("discards the draft when clicking outside and fires onBlur with the value", async () => {
    const user = setup();
    const onChange = jest.fn();
    const onBlur = jest.fn();
    render(
      <>
        <CombinedWithState
          initialValue={["01/07/2025", "05/07/2025"]}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button type="button">Outside</button>
      </>,
    );

    await user.click(getTrigger());
    await user.click(getDay(/15 July 2025/));
    await user.click(screen.getByRole("button", { name: "Outside" }));

    expect(onChange).not.toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith(
      rangeEvent(
        { formattedValue: "01/07/2025", rawValue: "2025-07-01" },
        { formattedValue: "05/07/2025", rawValue: "2025-07-05" },
      ),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(getTrigger()).toHaveTextContent("01/07/2025 to 05/07/2025");
    expect(screen.getByRole("button", { name: "Outside" })).toHaveFocus();
  });

  it("opens again with the value, not the discarded draft", async () => {
    const user = setup();
    render(<CombinedWithState initialValue={["01/07/2025", "05/07/2025"]} />);

    await user.click(getTrigger());
    await user.click(screen.getByRole("button", { name: "Clear" }));
    await user.keyboard("{Escape}");
    await user.click(getTrigger());

    expect(getTrigger()).toHaveTextContent("01/07/2025 to 05/07/2025");
  });

  it("resets the draft when the value changes while the calendar is open", async () => {
    const user = setup();
    const onChange = jest.fn();
    const { rerender } = render(
      <DateRange
        rangeType="combined"
        label="Date range"
        value={["01/07/2025", "05/07/2025"]}
        onChange={onChange}
      />,
    );

    await user.click(getTrigger());
    await user.click(getDay(/15 July 2025/));
    rerender(
      <DateRange
        rangeType="combined"
        label="Date range"
        value={["15/07/2025", "28/07/2025"]}
        onChange={onChange}
      />,
    );

    expect(screen.getByRole("dialog")).toBeVisible();
    expect(getTrigger()).toHaveTextContent("15/07/2025 to 28/07/2025");
    await user.click(screen.getByRole("button", { name: "Apply" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not fire onChange when the value did not change", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(<CombinedWithState onChange={onChange} />);

    await user.click(getTrigger());
    await user.keyboard("{Escape}");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("does nothing on an outside click while closed", async () => {
    const user = setup();
    const onBlur = jest.fn();
    render(
      <>
        <CombinedWithState onBlur={onBlur} />
        <button type="button">Outside</button>
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Outside" }));

    expect(onBlur).not.toHaveBeenCalled();
  });

  it("treats a label click as a click inside the field", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(<CombinedWithState onChange={onChange} />);

    await user.click(getTrigger());
    await user.click(screen.getByText("Date range"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("onBlur", () => {
  it("fires with the current value when focus leaves the closed trigger", async () => {
    const user = setup();
    const onBlur = jest.fn();
    render(
      <>
        <CombinedWithState
          initialValue={["15/07/2025", "28/07/2025"]}
          onBlur={onBlur}
        />
        <button type="button">Next</button>
      </>,
    );

    await user.tab();
    await user.tab();

    expect(onBlur).toHaveBeenCalledWith(rangeEvent(july15, july28));
  });

  it("does not fire when focus moves into the calendar or back to the trigger", async () => {
    const user = setup();
    const onBlur = jest.fn();
    render(<CombinedWithState onBlur={onBlur} />);

    await user.click(getTrigger());
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(getDay(/10 July 2025/)).toHaveFocus();
    await user.keyboard("{Escape}");

    expect(getTrigger()).toHaveFocus();
    expect(onBlur).not.toHaveBeenCalled();
  });

  it("does not throw without an onBlur callback", async () => {
    const user = setup();
    render(
      <>
        <CombinedWithState />
        <button type="button">Outside</button>
      </>,
    );

    await user.tab();
    await user.tab();
    await user.click(getTrigger());
    await user.click(screen.getByRole("button", { name: "Outside" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("forms", () => {
  it("renders hidden inputs with ISO values when name is set", () => {
    const { container } = render(
      <CombinedWithState name="booking" initialValue={["15/07/2025", "foo"]} />,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const inputs = container.querySelectorAll('[data-role="hidden-input"]');
    expect(inputs).toHaveLength(2);
    expect(inputs[0]).toHaveAttribute("name", "booking-start");
    expect(inputs[0]).toHaveValue("2025-07-15");
    expect(inputs[1]).toHaveAttribute("name", "booking-end");
    expect(inputs[1]).toHaveValue("");
    expect(inputs[0]).toBeEnabled();
  });

  it("disables the hidden inputs when disabled", () => {
    const { container } = render(<CombinedWithState name="booking" disabled />);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const inputs = container.querySelectorAll('[data-role="hidden-input"]');
    expect(inputs).toHaveLength(2);
    inputs.forEach((input) => expect(input).toBeDisabled());
  });

  it("renders no hidden inputs without name", () => {
    const { container } = render(<CombinedWithState />);

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelectorAll('[data-role="hidden-input"]'),
    ).toHaveLength(0);
  });

  it("applies the Fieldset's required and error state to the trigger", () => {
    render(
      <Fieldset legend="Booking" required error="Fieldset error" size="large">
        <CombinedWithState />
      </Fieldset>,
    );

    expect(getTrigger()).toHaveAttribute("aria-required", "true");
    expect(getTrigger()).toHaveAttribute("aria-invalid", "true");
  });

  it("registers validation with Tabs", () => {
    render(
      <Tabs>
        <TabList ariaLabel="Tabs">
          <Tab id="tab-1" controls="panel-1" label="Tab 1" />
        </TabList>
        <TabPanel id="panel-1" tabId="tab-1">
          <CombinedWithState error="Select a range" />
        </TabPanel>
      </Tabs>,
    );

    expect(
      within(screen.getByRole("tab")).getByTestId("icon-error"),
    ).toBeInTheDocument();
  });
});

describe("locale overrides without the optional keys", () => {
  it("still renders and selects dates", async () => {
    const user = setup();
    const onChange = jest.fn();
    render(
      <LocaleContext.Provider
        value={{
          ...enGB,
          date: {
            ...enGB.date,
            rangeText: undefined,
            ariaLabels: {
              previousMonthButton: enGB.date.ariaLabels.previousMonthButton,
              nextMonthButton: enGB.date.ariaLabels.nextMonthButton,
            },
          },
        }}
      >
        <CombinedWithState onChange={onChange} />
      </LocaleContext.Provider>,
    );

    await user.click(getTrigger());
    await user.click(getDay(/15 July 2025/));
    expect(getStatus()).toHaveTextContent(/^$/);
    expect(getTrigger()).toHaveTextContent(/^15\/07\/2025$/);
    await user.click(getDay(/28 July 2025/));
    expect(getStatus()).toHaveTextContent(/^$/);
    await user.click(screen.getAllByRole("button").at(-1) as HTMLElement);
    expect(onChange).toHaveBeenCalledWith(rangeEvent(july15, july28));
  });
});
