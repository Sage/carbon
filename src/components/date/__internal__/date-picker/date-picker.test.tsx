import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Day } from "date-fns";
import { de as deLocale } from "date-fns/locale/de";
import { enCA as enCALocale } from "date-fns/locale/en-CA";
import { enGB as enGBLocale } from "date-fns/locale/en-GB";
import { enUS as enUSLocale } from "date-fns/locale/en-US";
import { enZA as enZALocale } from "date-fns/locale/en-ZA";
import { es as esLocale } from "date-fns/locale/es";
import { fr as frLocale } from "date-fns/locale/fr";
import { frCA as frCALocale } from "date-fns/locale/fr-CA";
import { zhCN as zhCNLocale } from "date-fns/locale/zh-CN";
import type { Locale } from "react-day-picker";

import Logger from "../../../../__internal__/utils/logger";
import I18nProvider from "../../../i18n-provider";
import DatePicker, { DatePickerProps } from "./date-picker.component";

interface MockProps extends Omit<DatePickerProps, "inputElement"> {
  open?: boolean;
}

const DatePickerWithInput = (props: MockProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const Input = () => (
    <div ref={ref}>
      <input title="foobar" name="foo" id="bar" />
    </div>
  );
  return (
    <>
      <Input />
      <DatePicker {...props} inputElement={ref} />
    </>
  );
};

const DatePickerWithReturnFocus = (props: MockProps) => {
  const inputRef = React.useRef<HTMLDivElement>(null);
  const returnRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <div ref={inputRef}>
        <input title="foobar" name="foo" id="bar" />
      </div>
      <button ref={returnRef} type="button">
        trigger
      </button>
      <DatePicker
        {...props}
        inputElement={inputRef}
        returnFocusElement={returnRef}
      />
    </>
  );
};

const getWeekdayTranslations = (
  index: number,
  locale: Locale,
  substringLimit = 3,
) => {
  const startDay = locale.options?.weekStartsOn || 0;

  return locale.localize
    ?.day(((index + startDay) % 7) as Day, { width: "abbreviated" })
    .substring(0, substringLimit);
};

test("logs a deprecation warning when disablePortal is used", async () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});

  render(
    <>
      <DatePickerWithInput setOpen={() => {}} open disablePortal />
      <DatePickerWithInput setOpen={() => {}} open disablePortal />
    </>,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "`disablePortal` is deprecated in DateInput and DateRange, and support will soon be removed.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
});

test("should not render the date picker when `open` is false", () => {
  render(<DatePickerWithInput setOpen={() => {}} />);
  const datePicker = screen.queryByRole("grid");

  expect(datePicker).not.toBeInTheDocument();
});

test("should render the day element that matches the `selectedDate` when prop is set", () => {
  render(
    <DatePickerWithInput
      selectedDays={new Date(2019, 3, 4)}
      setOpen={() => {}}
      open
    />,
  );

  const selectedDay = screen.getByLabelText("Thursday, April 4th, 2019", {
    exact: false,
  });

  expect(selectedDay).toHaveAttribute(
    "aria-label",
    "Thursday, April 4th, 2019, selected",
  );
});

test("should render the month from the controlled `focusedMonth` prop", () => {
  render(
    <DatePickerWithInput
      focusedMonth={new Date(2025, 11, 1)}
      setOpen={() => {}}
      open
    />,
  );

  const monthCaption = screen.getByRole("status");

  expect(monthCaption).toHaveTextContent("December 2025");
});

test("should call `onFocusedMonthChange` when the focused month changes", async () => {
  const user = userEvent.setup();
  const onFocusedMonthChange = jest.fn();

  render(
    <DatePickerWithInput
      focusedMonth={new Date(2025, 11, 1)}
      onFocusedMonthChange={onFocusedMonthChange}
      setOpen={() => {}}
      open
    />,
  );

  await user.selectOptions(screen.getByRole("combobox", { name: "Month" }), [
    "0",
  ]);

  expect(onFocusedMonthChange).toHaveBeenCalledWith(new Date(2025, 0, 1));

  // the calendar view must not advance because focusedMonth is controlled and
  // the parent has not updated the prop -- the displayed month stays frozen
  expect(screen.getByRole("status")).toHaveTextContent("December 2025");
});

test("should call `onFocusedMonthChange` when the focused year changes", async () => {
  const user = userEvent.setup();
  const onFocusedMonthChange = jest.fn();

  render(
    <DatePickerWithInput
      selectedDays={new Date(2025, 11, 1)}
      onFocusedMonthChange={onFocusedMonthChange}
      setOpen={() => {}}
      open
    />,
  );

  await user.selectOptions(screen.getByRole("combobox", { name: "Year" }), [
    "2026",
  ]);

  expect(onFocusedMonthChange).toHaveBeenCalledWith(new Date(2026, 11, 1));
});

test("should render default year options for 10 years before and after the current year", () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 5, 30));

  render(<DatePickerWithInput setOpen={() => {}} open />);

  const yearOptions = screen.getAllByRole("option").map(({ textContent }) => {
    return textContent;
  });

  expect(yearOptions).toEqual(expect.arrayContaining(["2016", "2026", "2036"]));

  jest.useRealTimers();
});

test("should render custom labels for the month and year selectors", () => {
  render(
    <DatePickerWithInput
      labels={{
        monthSelect: "Choose month",
        yearSelect: "Choose year",
      }}
      setOpen={() => {}}
      open
    />,
  );

  expect(screen.getByRole("combobox", { name: "Choose month" })).toBeVisible();
  expect(screen.getByRole("combobox", { name: "Choose year" })).toBeVisible();
});

test("should render the calendar container as a modal dialog", () => {
  render(
    <DatePickerWithInput
      ariaLabel="Choose date"
      pickerId="date-picker-dialog"
      setOpen={() => {}}
      open
    />,
  );

  const dialog = screen.getByRole("dialog", { name: "Choose date" });

  expect(dialog).toHaveAttribute("id", "date-picker-dialog");
  expect(dialog).toHaveAttribute("aria-modal", "true");
});

test("should not render the range select-dates button in single date mode", () => {
  render(<DatePickerWithInput setOpen={() => {}} open />);

  expect(
    screen.queryByRole("button", { name: "Select dates" }),
  ).not.toBeInTheDocument();
});

test("should render range status text and select-dates button in range mode", () => {
  render(
    <DatePickerWithInput
      pickerMode="range"
      rangeStatusText="Start date: Monday, 1 April 2019. End date: Friday, 5 April 2019"
      setOpen={() => {}}
      open
    />,
  );

  expect(screen.getByTestId("date-picker-range-status")).toHaveTextContent(
    "Start date: Monday, 1 April 2019. End date: Friday, 5 April 2019",
  );
  expect(screen.getByRole("button", { name: "Select dates" })).toBeVisible();
});

test("should call `onSelectDates` and close the picker when the range select-dates button is clicked", async () => {
  const user = userEvent.setup();
  const onSelectDates = jest.fn();
  const setOpen = jest.fn();

  render(
    <DatePickerWithInput
      pickerMode="range"
      onSelectDates={onSelectDates}
      setOpen={setOpen}
      open
    />,
  );

  await user.click(screen.getByRole("button", { name: "Select dates" }));

  expect(onSelectDates).toHaveBeenCalledTimes(1);
  expect(setOpen).toHaveBeenCalledWith(false);
});

test("should move focus from a day to the select-dates button when Tab is pressed in range mode", async () => {
  const user = userEvent.setup();

  render(
    <DatePickerWithInput
      pickerMode="range"
      selectedDays={new Date(2019, 3, 4)}
      setOpen={() => {}}
      open
    />,
  );

  await waitFor(() => {
    expect(
      screen.getByRole("button", {
        name: "Thursday, April 4th, 2019, selected",
      }),
    ).toHaveFocus();
  });

  await user.tab();

  expect(screen.getByRole("grid")).toBeVisible();
  expect(screen.getByRole("button", { name: "Select dates" })).toHaveFocus();
});

test("should return focus to the input when the range select-dates button is clicked", async () => {
  const user = userEvent.setup();

  render(<DatePickerWithInput pickerMode="range" setOpen={jest.fn()} open />);

  await user.click(screen.getByRole("button", { name: "Select dates" }));

  expect(screen.getByTitle("foobar")).toHaveFocus();
});

test("should move focus back into the calendar grid when Shift+Tab is pressed from the select-dates button", async () => {
  const user = userEvent.setup();

  render(
    <DatePickerWithInput
      pickerMode="range"
      selectedDays={new Date(2019, 3, 4)}
      setOpen={() => {}}
      open
    />,
  );

  act(() => {
    screen.getByRole("button", { name: "Select dates" }).focus();
  });

  await user.keyboard("{Shift>}{Tab}{/Shift}");

  expect(screen.getByRole("grid")).toBeVisible();
  expect(
    screen.getByRole("button", {
      name: "Thursday, April 4th, 2019, selected",
    }),
  ).toHaveFocus();
});

test("should render the range status div with no content when rangeStatusText is not provided in range mode", () => {
  render(<DatePickerWithInput pickerMode="range" setOpen={() => {}} open />);

  const statusEl = screen.getByTestId("date-picker-range-status");
  expect(statusEl).toBeInTheDocument();
  expect(statusEl).toHaveTextContent("");
});

test("should focus the selected date when the picker opens", async () => {
  render(
    <DatePickerWithInput
      selectedDays={new Date(2019, 3, 4)}
      setOpen={() => {}}
      open
    />,
  );

  await waitFor(() => {
    expect(
      screen.getByRole("button", {
        name: "Thursday, April 4th, 2019, selected",
      }),
    ).toHaveFocus();
  });
});

test("should focus today's date when the picker opens without a selected date", async () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 5, 15));

  render(<DatePickerWithInput setOpen={() => {}} open />);

  await waitFor(() => {
    expect(
      screen.getByRole("button", {
        name: "Today, Monday, June 15th, 2026",
      }),
    ).toHaveFocus();
  });

  jest.useRealTimers();
});

test("should focus the first available date when the picker opens and today is disabled", async () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 5, 15));

  render(<DatePickerWithInput minDate="2026-06-20" setOpen={() => {}} open />);

  await waitFor(() => {
    expect(
      screen.getByRole("button", {
        name: "Saturday, June 20th, 2026",
      }),
    ).toHaveFocus();
  });

  jest.useRealTimers();
});

test("should use the current date as the initial focused month when neither `selectedDays` nor `selectedRange` is given", () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2025, 5, 15)); // June 2025

  render(<DatePickerWithInput setOpen={() => {}} open />);

  const monthCaption = screen.getByRole("status");
  expect(monthCaption).toHaveTextContent("June 2025");

  jest.useRealTimers();
});

test("should use the selected range start date as the initial focused month", () => {
  render(
    <DatePickerWithInput
      selectedRange={{ startDate: new Date(2024, 6, 1) }}
      setOpen={() => {}}
      open
    />,
  );

  const monthCaption = screen.getByRole("status");

  expect(monthCaption).toHaveTextContent("July 2024");
});

test("should render the expected weekday with `aria-disabled=true` attribute when `minDate` is '2019-04-02'", () => {
  render(
    <DatePickerWithInput
      selectedDays={new Date(2019, 3, 4)}
      minDate="2019-04-02"
      setOpen={() => {}}
      open
    />,
  );
  const disabledDay = screen.getByLabelText("Monday, April 1st, 2019");
  const activeDay = screen.getByLabelText("Tuesday, April 2nd, 2019");

  expect(disabledDay).toBeDisabled();
  expect(activeDay).toBeEnabled();
});

test("should not render any of the current month's weekdays with `aria-disabled=true` attribute when `minDate` is invalid", () => {
  render(
    <DatePickerWithInput
      selectedDays={new Date(2019, 3, 4)}
      minDate="2019-04-"
      setOpen={() => {}}
      open
    />,
  );
  // need to filter out the weekdays that are not in the current month
  const currentMonthDays = screen.getAllByLabelText("April", { exact: false });

  currentMonthDays.forEach((day) => {
    expect(day).toBeEnabled();
  });
});

test("should not render any of the current month's weekdays with `aria-disabled=true` attribute when `minDate` is empty string", () => {
  render(
    <DatePickerWithInput
      selectedDays={new Date(2019, 3, 4)}
      minDate=""
      setOpen={() => {}}
      open
    />,
  );
  // need to filter out the weekdays that are not in the current month
  const currentMonthDays = screen.getAllByLabelText("April", { exact: false });

  currentMonthDays.forEach((day) => {
    expect(day).toBeEnabled();
  });
});

test("should render the expected weekday with `aria-disabled=true` attribute when `maxDate` is '2019-04-05'", () => {
  render(
    <DatePickerWithInput
      selectedDays={new Date(2019, 3, 4)}
      maxDate="2019-04-05"
      setOpen={() => {}}
      open
    />,
  );
  const disabledDay = screen.getByLabelText("Saturday, April 6th, 2019");
  const activeDay = screen.getByLabelText("Friday, April 5th, 2019");

  expect(disabledDay).toBeDisabled();
  expect(activeDay).toBeEnabled();
});

test("should not render any of the current month's weekdays with `aria-disabled=true` attribute when `maxDate` is invalid", () => {
  render(
    <DatePickerWithInput
      selectedDays={new Date(2019, 3, 4)}
      maxDate="2019-04-"
      setOpen={() => {}}
      open
    />,
  );
  // need to filter out the weekdays that are not in the current month
  const currentMonthDays = screen.getAllByLabelText("April", { exact: false });

  currentMonthDays.forEach((day) => {
    expect(day).toBeEnabled();
  });
});

test("should not render any of the current month's weekdays with `aria-disabled=true` attribute when `maxDate` is empty string", () => {
  render(
    <DatePickerWithInput
      selectedDays={new Date(2019, 3, 4)}
      maxDate=""
      setOpen={() => {}}
      open
    />,
  );
  // need to filter out the weekdays that are not in the current month
  const currentMonthDays = screen.getAllByLabelText("April", { exact: false });

  currentMonthDays.forEach((day) => {
    expect(day).toBeEnabled();
  });
});

test("should not call `onDayClick` callback when a user clicks a disabled day", async () => {
  const user = userEvent.setup();
  const onDayClick = jest.fn();
  render(
    <DatePickerWithInput
      selectedDays={new Date(2019, 3, 4)}
      minDate="2019-04-02"
      setOpen={() => {}}
      open
      onDayClick={onDayClick}
    />,
  );
  const disabledDay = screen.getByLabelText("Monday, April 1st, 2019");
  await user.click(disabledDay);

  expect(onDayClick).not.toHaveBeenCalled();
});

test("should call `onDayClick` callback when a user clicks a day that is not disabled", async () => {
  const user = userEvent.setup();
  const onDayClick = jest.fn();
  render(
    <DatePickerWithInput
      selectedDays={new Date(2019, 3, 4)}
      setOpen={() => {}}
      open
      onDayClick={onDayClick}
    />,
  );
  const activeDay = screen.getByLabelText("Tuesday, April 2nd, 2019");
  await user.click(activeDay);

  expect(onDayClick).toHaveBeenCalled();
});

test("should render with 'en-GB' translations by default when no `locale` passed via I18nProvider", () => {
  render(
    <I18nProvider>
      <DatePickerWithInput setOpen={() => {}} open />
    </I18nProvider>,
  );
  const weekdays = screen.getAllByRole("columnheader");

  weekdays.forEach((weekday, i) => {
    expect(weekday).toHaveTextContent(getWeekdayTranslations(i, enGBLocale));
  });
});

test("should render with 'de-DE' translations when the `locale` is passed via I18nProvider", () => {
  render(
    <I18nProvider
      locale={{
        locale: () => "de-DE",
        date: {
          dateFnsLocale: () => deLocale,
          ariaLabels: {
            previousMonthButton: () => "de-DE-previous",
            nextMonthButton: () => "de-DE-next",
          },
        },
      }}
    >
      <DatePickerWithInput setOpen={() => {}} open />
    </I18nProvider>,
  );
  const weekdays = screen.getAllByRole("columnheader");

  weekdays.forEach((weekday, i) => {
    expect(weekday).toHaveTextContent(getWeekdayTranslations(i, deLocale, 2));
  });
  expect(screen.getByRole("combobox", { name: "Month" })).toHaveTextContent(
    "Januar",
  );
  expect(screen.getByRole("combobox", { name: "Year" })).toBeVisible();
});

test("should render with 'es' translations when the `locale` is passed via I18nProvider", () => {
  render(
    <I18nProvider
      locale={{
        locale: () => "es",
        date: {
          dateFnsLocale: () => esLocale,
          ariaLabels: {
            previousMonthButton: () => "es-previous",
            nextMonthButton: () => "es-next",
          },
        },
      }}
    >
      <DatePickerWithInput setOpen={() => {}} open />
    </I18nProvider>,
  );
  const weekdays = screen.getAllByRole("columnheader");

  weekdays.forEach((weekday, i) => {
    expect(weekday).toHaveTextContent(getWeekdayTranslations(i, esLocale));
  });
  expect(screen.getByRole("combobox", { name: "Month" })).toHaveTextContent(
    "enero",
  );
  expect(screen.getByRole("combobox", { name: "Year" })).toBeVisible();
});

test("should render with 'en-CA' translations when the `locale` is passed via I18nProvider", () => {
  render(
    <I18nProvider
      locale={{
        locale: () => "en-CA",
        date: {
          dateFnsLocale: () => enCALocale,
          ariaLabels: {
            previousMonthButton: () => "en-CA-previous",
            nextMonthButton: () => "en-CA-next",
          },
        },
      }}
    >
      <DatePickerWithInput setOpen={() => {}} open />
    </I18nProvider>,
  );
  const weekdays = screen.getAllByRole("columnheader");

  weekdays.forEach((weekday, i) => {
    expect(weekday).toHaveTextContent(getWeekdayTranslations(i, enCALocale));
  });
  expect(screen.getByRole("combobox", { name: "Month" })).toHaveTextContent(
    "January",
  );
  expect(screen.getByRole("combobox", { name: "Year" })).toBeVisible();
});

test("should render with 'en-US' translations when the `locale` is passed via I18nProvider", () => {
  render(
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
      <DatePickerWithInput setOpen={() => {}} open />
    </I18nProvider>,
  );
  const weekdays = screen.getAllByRole("columnheader");

  weekdays.forEach((weekday, i) => {
    expect(weekday).toHaveTextContent(getWeekdayTranslations(i, enUSLocale));
  });
  expect(screen.getByRole("combobox", { name: "Month" })).toHaveTextContent(
    "January",
  );
  expect(screen.getByRole("combobox", { name: "Year" })).toBeVisible();
});

test("should render with 'en-ZA' translations when the `locale` is passed via I18nProvider", () => {
  render(
    <I18nProvider
      locale={{
        locale: () => "en-ZA",
        date: {
          dateFnsLocale: () => enZALocale,
          ariaLabels: {
            previousMonthButton: () => "en-ZA-previous",
            nextMonthButton: () => "en-ZA-next",
          },
        },
      }}
    >
      <DatePickerWithInput setOpen={() => {}} open />
    </I18nProvider>,
  );
  const weekdays = screen.getAllByRole("columnheader");

  weekdays.forEach((weekday, i) => {
    expect(weekday).toHaveTextContent(getWeekdayTranslations(i, enZALocale));
  });
  expect(screen.getByRole("combobox", { name: "Month" })).toHaveTextContent(
    "January",
  );
  expect(screen.getByRole("combobox", { name: "Year" })).toBeVisible();
});

test("should render with 'fr-FR' translations when the `locale` is passed via I18nProvider", () => {
  render(
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
        date: {
          dateFnsLocale: () => frLocale,
          ariaLabels: {
            previousMonthButton: () => "fr-FR-previous",
            nextMonthButton: () => "fr-FR-next",
          },
        },
      }}
    >
      <DatePickerWithInput setOpen={() => {}} open />
    </I18nProvider>,
  );
  const weekdays = screen.getAllByRole("columnheader");

  weekdays.forEach((weekday, i) => {
    expect(weekday).toHaveTextContent(getWeekdayTranslations(i, frLocale));
  });
  expect(screen.getByRole("combobox", { name: "Month" })).toHaveTextContent(
    "janvier",
  );
  expect(screen.getByRole("combobox", { name: "Year" })).toBeVisible();
});

test("should render with 'fr-CA' translations when the `locale` is passed via I18nProvider", () => {
  render(
    <I18nProvider
      locale={{
        locale: () => "fr-CA",
        date: {
          dateFnsLocale: () => frCALocale,
          ariaLabels: {
            previousMonthButton: () => "fr-CA-previous",
            nextMonthButton: () => "fr-CA-next",
          },
        },
      }}
    >
      <DatePickerWithInput setOpen={() => {}} open />
    </I18nProvider>,
  );
  const weekdays = screen.getAllByRole("columnheader");

  weekdays.forEach((weekday, i) => {
    expect(weekday).toHaveTextContent(getWeekdayTranslations(i, frCALocale));
  });
  expect(screen.getByRole("combobox", { name: "Month" })).toHaveTextContent(
    "janvier",
  );
  expect(screen.getByRole("combobox", { name: "Year" })).toBeVisible();
});

test("should correctly translate the month caption for the given locale (fr-FR)", () => {
  render(
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
        date: {
          dateFnsLocale: () => frLocale,
          ariaLabels: {
            previousMonthButton: () => "fr-FR-previous",
            nextMonthButton: () => "fr-FR-next",
          },
        },
      }}
    >
      <DatePickerWithInput
        setOpen={() => {}}
        open
        selectedDays={new Date(2019, 2, 4)}
      />
    </I18nProvider>,
  );

  const monthCaption = screen.getByRole("status");
  expect(monthCaption).toBeVisible();
  expect(monthCaption).toHaveTextContent("mars 2019");
});

test("should correctly translate the month caption for the given locale (zh-CN)", () => {
  render(
    <I18nProvider
      locale={{
        locale: () => "zh-CN",
        date: {
          dateFnsLocale: () => zhCNLocale,
          ariaLabels: {
            previousMonthButton: () => "zh-CN-previous",
            nextMonthButton: () => "zh-CN-next",
          },
        },
      }}
    >
      <DatePickerWithInput
        setOpen={() => {}}
        open
        selectedDays={new Date(2019, 2, 4)}
      />
    </I18nProvider>,
  );

  const monthCaption = screen.getByRole("status");
  expect(monthCaption).toBeVisible();
  expect(monthCaption).toHaveTextContent("三月 2019");
});

test("Tab from the input focuses the month select, then Tab focuses the year select", async () => {
  const user = userEvent.setup();
  render(
    <DatePickerWithInput
      setOpen={() => {}}
      open
      selectedDays={new Date(2019, 3, 4)}
    />,
  );

  await user.click(screen.getByRole("textbox"));
  await user.tab();
  expect(screen.getByRole("combobox", { name: "Month" })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("combobox", { name: "Year" })).toHaveFocus();
});

test("after changing the month select, focus moves to the first available day in the new month", async () => {
  const user = userEvent.setup();
  render(
    <DatePickerWithInput
      setOpen={() => {}}
      open
      selectedDays={new Date(2019, 3, 4)}
    />,
  );

  await user.selectOptions(screen.getByRole("combobox", { name: "Month" }), [
    "2",
  ]);

  expect(screen.getByRole("status")).toHaveTextContent("March 2019");
  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: "Friday, March 1st, 2019" }),
    ).toHaveFocus();
  });
});

test("after changing the year select, focus moves to the first available day in the new month", async () => {
  const user = userEvent.setup();
  render(
    <DatePickerWithInput
      setOpen={() => {}}
      open
      selectedDays={new Date(2019, 3, 4)}
    />,
  );

  await user.selectOptions(screen.getByRole("combobox", { name: "Year" }), [
    "2020",
  ]);

  expect(screen.getByRole("status")).toHaveTextContent("April 2020");
  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: "Wednesday, April 1st, 2020" }),
    ).toHaveFocus();
  });
});

test("Shift+Tab on the month select closes the picker and returns focus to the input", async () => {
  const user = userEvent.setup();
  const setOpen = jest.fn();
  render(
    <DatePickerWithInput
      selectedDays={new Date(2019, 3, 4)}
      setOpen={setOpen}
      open
    />,
  );

  act(() => {
    screen.getByRole("combobox", { name: "Month" }).focus();
  });
  await user.keyboard("{Shift>}{Tab}{/Shift}");

  expect(setOpen).toHaveBeenCalledWith(false);
  expect(screen.getByTitle("foobar")).toHaveFocus();
});

test("Shift+Tab on the month select returns focus to `returnFocusElement` when provided", async () => {
  const user = userEvent.setup();
  const setOpen = jest.fn();
  render(
    <DatePickerWithReturnFocus
      selectedDays={new Date(2019, 3, 4)}
      setOpen={setOpen}
      open
    />,
  );

  act(() => {
    screen.getByRole("combobox", { name: "Month" }).focus();
  });
  await user.keyboard("{Shift>}{Tab}{/Shift}");

  expect(setOpen).toHaveBeenCalledWith(false);
  expect(screen.getByRole("button", { name: "trigger" })).toHaveFocus();
});

test("focusing the tab guard redirects focus to the first select in the picker", async () => {
  render(
    <DatePickerWithInput
      setOpen={() => {}}
      open
      selectedDays={new Date(2019, 3, 4)}
    />,
  );

  act(() => {
    screen.getByTestId("date-picker-tab-guard").focus();
  });

  await waitFor(() => {
    expect(screen.getByRole("combobox", { name: "Month" })).toHaveFocus();
  });
});

test("close-sync effect re-syncs focused month when year differs from the selected date", () => {
  const onFocusedMonthChange = jest.fn();
  const { rerender } = render(
    <DatePickerWithInput
      selectedDays={new Date(2019, 6, 15)}
      focusedMonth={new Date(2026, 6, 1)}
      onFocusedMonthChange={onFocusedMonthChange}
      setOpen={() => {}}
      open
    />,
  );

  // Close the picker; same month (July) but different year (2026 vs 2019).
  rerender(
    <DatePickerWithInput
      selectedDays={new Date(2019, 6, 15)}
      focusedMonth={new Date(2026, 6, 1)}
      onFocusedMonthChange={onFocusedMonthChange}
      setOpen={() => {}}
    />,
  );

  expect(onFocusedMonthChange).toHaveBeenCalledWith(new Date(2019, 6, 15));
});
