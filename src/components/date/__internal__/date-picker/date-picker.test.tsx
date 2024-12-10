import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import enGBLocale from "date-fns/locale/en-GB";
import deLocale from "date-fns/locale/de";
import esLocale from "date-fns/locale/es";
import enCALocale from "date-fns/locale/en-CA";
import enZALocale from "date-fns/locale/en-ZA";
import frLocale from "date-fns/locale/fr";
import frCALocale from "date-fns/locale/fr-CA";
import enUSLocale from "date-fns/locale/en-US";
import zhCNLocale from "date-fns/locale/zh-CN";

import DatePicker, { DatePickerProps } from "./date-picker.component";
import I18nProvider from "../../../i18n-provider";

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

const getWeekdayTranslations = (
  index: number,
  locale: Locale,
  substringLimit = 3,
) => {
  const startDay = locale.options?.weekStartsOn || 0;

  return locale.localize
    ?.day((index + startDay) % 7, { width: "abbreviated" })
    .substring(0, substringLimit);
};

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
  expect(screen.getByRole("button", { name: "de-DE-previous" })).toBeVisible();
  expect(screen.getByRole("button", { name: "de-DE-next" })).toBeVisible();
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
  expect(screen.getByRole("button", { name: "es-previous" })).toBeVisible();
  expect(screen.getByRole("button", { name: "es-next" })).toBeVisible();
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
  expect(screen.getByRole("button", { name: "en-CA-previous" })).toBeVisible();
  expect(screen.getByRole("button", { name: "en-CA-next" })).toBeVisible();
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
  expect(screen.getByRole("button", { name: "en-US-previous" })).toBeVisible();
  expect(screen.getByRole("button", { name: "en-US-next" })).toBeVisible();
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
  expect(screen.getByRole("button", { name: "en-ZA-previous" })).toBeVisible();
  expect(screen.getByRole("button", { name: "en-ZA-next" })).toBeVisible();
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
  expect(screen.getByRole("button", { name: "fr-FR-previous" })).toBeVisible();
  expect(screen.getByRole("button", { name: "fr-FR-next" })).toBeVisible();
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
  expect(screen.getByRole("button", { name: "fr-CA-previous" })).toBeVisible();
  expect(screen.getByRole("button", { name: "fr-CA-next" })).toBeVisible();
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
